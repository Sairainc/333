"use server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const sql = neon(process.env.DATABASE_URL!);

// バリデーションスキーマ
const ContactSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  service: z.string().min(1, "サービスを選択してください"),
  message: z.string().min(1, "メッセージは必須です"),
});

export async function submitContact(formData: FormData) {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    service: formData.get("service"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return { error: "入力内容に誤りがあります。" };
  }

  const { name, email, service, message } = validatedFields.data;

  try {
    await sql`
      INSERT INTO contacts (name, email, service, message)
      VALUES (${name}, ${email}, ${service}, ${message})
    `;
    return { success: "お問い合わせを受け付けました。" };
  } catch (error) {
    console.error("Error saving contact:", error);
    return { error: "サーバーエラーが発生しました。" };
  }
}

export async function getContacts() {
  try {
    const contacts = await sql`SELECT * FROM contacts ORDER BY created_at DESC`;
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}