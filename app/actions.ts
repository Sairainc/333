"use server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import { IncomingWebhook } from '@slack/webhook';

async function getDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }
  return neon(process.env.DATABASE_URL);
}

const ContactSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.string().email("メールアドレスの形式が正しくありません"),
  phone: z
    .string()
    .min(10, "電話番号は10桁以上で入力してください")
    .regex(/^\d{2,4}-\d{2,4}-\d{4}$/, "電話番号の形式が正しくありません"),
  company: z.string().min(1, "会社名を入力してください"),
  service: z.string().min(1, "サービスを選択してください"),
});

export async function submitContact(formData: FormData) {
  try {
    const sql = await getDatabaseConnection();
    
    // 電話番号のフォーマット処理
    const rawPhone = formData.get("phone")?.toString() || "";
    const phoneDigits = rawPhone.replace(/[^\d]/g, "");
    let formattedPhone = phoneDigits;
    
    // 電話番号の桁数に応じてフォーマットを変更
    if (phoneDigits.length === 10) {
      formattedPhone = phoneDigits.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (phoneDigits.length === 11) {
      formattedPhone = phoneDigits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }

    const formDataObj = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formattedPhone,
      company: formData.get("company"),
      service: formData.get("service"),
    };
    console.log("Received form data:", formDataObj);

    const validatedFields = ContactSchema.safeParse(formDataObj);
    if (!validatedFields.success) {
      // エラーメッセージを整形して返す
      const errors: { [key: string]: string } = {};
      validatedFields.error.errors.forEach((error) => {
        if (error.path[0]) {
          errors[error.path[0].toString()] = error.message;
        }
      });
      return { 
        error: "入力内容に誤りがあります",
        fieldErrors: errors 
      };
    }

    const { name, email, phone, company, service } = validatedFields.data;

    // Slack通知の送信
    try {
      if (!process.env.SLACK_WEBHOOK_URL) {
        throw new Error("SLACK_WEBHOOK_URL is not defined");
      }
      
      console.log("Attempting to send Slack notification...");
      console.log("Using webhook URL:", process.env.SLACK_WEBHOOK_URL);
      
      const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
      
      const message = {
        text: "新規お問い合わせ", // フォールバックテキスト
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "🎉 新規お問い合わせがありました",
              emoji: true
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*お名前:*\n${name}`
              },
              {
                type: "mrkdwn",
                text: `*メール:*\n${email}`
              },
              {
                type: "mrkdwn",
                text: `*電話番号:*\n${phone}`
              },
              {
                type: "mrkdwn",
                text: `*会社名:*\n${company}`
              },
              {
                type: "mrkdwn",
                text: `*サービス:*\n${service}`
              }
            ]
          }
        ]
      };

      console.log("Sending message:", JSON.stringify(message, null, 2));
      
      const response = await webhook.send(message);
      console.log("Slack notification sent successfully:", response);
    } catch (error: any) {  // 修正: unknown から any に変更
      console.error("Slack notification failed:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack
      });
      // Slack通知の失敗はユーザーには通知しない
    }

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