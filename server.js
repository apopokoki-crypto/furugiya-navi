require('dotenv').config();
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/analyze', async (req, res) => {
  const { imageData, mediaType } = req.body;

  if (!imageData || !mediaType) {
    return res.status(400).json({ error: '画像データが必要です' });
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: imageData },
            },
            {
              type: 'text',
              text: `あなたは古着の品質鑑定の専門家です。この古着の写真を分析してください。

以下のJSON形式のみで返答してください（他のテキストは一切不要）：
{
  "score": 状態スコア（1〜10の整数）,
  "condition": "現在の状態の説明（2〜3文）",
  "appeal": "古着としての魅力・ヴィンテージ感の説明（2〜3文）",
  "recommendation": "おすすめ" または "要確認" または "見送り"
}

評価基準：
- スコア8〜10：状態が良く購入おすすめ
- スコア5〜7：普通の状態、確認すべき点あり
- スコア1〜4：状態が悪く見送り推奨`,
            },
          ],
        },
      ],
      output_config: {
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              score: { type: 'integer' },
              condition: { type: 'string' },
              appeal: { type: 'string' },
              recommendation: { type: 'string', enum: ['おすすめ', '要確認', '見送り'] },
            },
            required: ['score', 'condition', 'appeal', 'recommendation'],
            additionalProperties: false,
          },
        },
      },
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    if (!textBlock) throw new Error('No text response');

    const result = JSON.parse(textBlock.text);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '分析に失敗しました。もう一度お試しください。' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});
