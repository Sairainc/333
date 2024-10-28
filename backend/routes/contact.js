const express = require('express');
const router = express.Router();
const { z } = require('zod');

// バリデーションスキーマ
const ContactSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().min(10, "有効な電話番号を入力してください"),
  company: z.string().min(1, "会社名は必須です"),
  service: z.string().min(1, "サービスを選択してください"),
});

router.post('/', async (req, res) => {
  try {
    // リクエストボディのバリデーション
    const validatedData = ContactSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        error: "入力内容に誤りがあります。",
        details: validatedData.error.errors
      });
    }

    const { name, email, phone, company, service } = validatedData.data;

    // データベースに保存
    console.log('お問い合わせを受信:', {
      name,
      email,
      phone,
      company,
      service,
      receivedAt: new Date().toISOString()
    });

    // 成功レスポンス
    res.status(200).json({
      success: true,
      message: '担当者より連絡させていただきます。'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      error: 'サーバーエラーが発生しました。',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;