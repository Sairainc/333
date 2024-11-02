"use server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import { IncomingWebhook } from '@slack/webhook';

// バリデーションエラーの型を定義
interface ValidationErrors {
  [key: string]: string;
}

// Slack Webhookのインスタンスを作成
const slack = new IncomingWebhook('https://hooks.slack.com/services/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');

async function getDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }
  return neon(process.env.DATABASE_URL);
}

const ContactSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string()
    .regex(
      /^(0[0-9]{1,4}-[0-9]{1,4}-[0-9]{3,4}|0[0-9]{9,10})$/,
      "電話番号は「090-1234-5678」または「0312345678」の形式で入力してください"
    ),
  company: z.string().min(1, "会社名は必須です"),
  service: z.string().min(1, "サービスを選択してください"),
});

export async function submitContact(formData: FormData) {
  try {
    const sql = await getDatabaseConnection();
    
    const formDataObj = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      service: formData.get("service"),
    };
    console.log("Received form data:", formDataObj);

    const validatedFields = ContactSchema.safeParse(formDataObj);
    if (!validatedFields.success) {
      const validationErrors: ValidationErrors = {};
      validatedFields.error.issues.forEach((issue) => {
        if (typeof issue.path[0] === 'string') {
          validationErrors[issue.path[0]] = issue.message;
        }
      });
      return { 
        error: "入力内容に誤りがあります。",
        validationErrors 
      };
    }

    const { name, email, phone, company, service } = validatedFields.data;

    try {
      console.log("Checking if table exists...");
      await sql`
        CREATE TABLE IF NOT EXISTS newcontacts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(255) NOT NULL,
          company VARCHAR(255) NOT NULL,
          service VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      console.log("Attempting to insert data...");
      const result = await sql`
        INSERT INTO newcontacts (name, email, phone, company, service)
        VALUES (${name}, ${email}, ${phone}, ${company}, ${service})
        RETURNING *;
      `;
      
      console.log("Insert result:", result);
      
      if (!result || result.length === 0) {
        throw new Error("データが正しく保存されませんでした。");
      }

      // Slack通知を送信
      await slack.send({
        text: '新しい問い合わせがありました',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🎉 新規お問い合わせ',
              emoji: true
            }
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*お名前:*\n${name}`
              },
              {
                type: 'mrkdwn',
                text: `*会社名:*\n${company}`
              },
              {
                type: 'mrkdwn',
                text: `*メール:*\n${email}`
              },
              {
                type: 'mrkdwn',
                text: `*電話番号:*\n${phone}`
              },
              {
                type: 'mrkdwn',
                text: `*興味のあるサービス:*\n${service}`
              }
            ]
          }
        ]
      });

      return { success: "お申し込みありがとうございます。\n担当者より連絡させていただきます。" };
    } catch (dbError: any) {
      console.error("Database operation failed:", {
        message: dbError.message,
        code: dbError.code,
        detail: dbError.detail,
        stack: dbError.stack
      });
      return { error: "データベース操作中にエラーが発生しました。" };
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "予期せぬエラーが発生しました。" };
  }
}

export async function getContacts() {
  try {
    const sql = await getDatabaseConnection();
    console.log("Fetching contacts...");
    const contacts = await sql`SELECT * FROM newcontacts ORDER BY created_at DESC`;
    console.log("Fetched contacts:", contacts);
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}