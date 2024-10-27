const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  // ここでデータを処理または保存します
  console.log('お問い合わせを受信:', { name, email, message });
  res.status(200).json({ message: 'お問い合わせを受け付けました' });
});

module.exports = router;