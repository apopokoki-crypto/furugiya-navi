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

app.post('/api/ceo', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'メッセージが必要です' });
  }

  const systemPrompt = `あなたは「古着ナビ」の伝説的なCEO、通称「ボス」です。
東京の古着シーンを20年以上歩んできた、業界屈指の目利き。
クールで率直、時にユーモラス。古着への愛が深い。
短く、キレのある言葉で答える。余計な説明はしない。

あなたが把握している東京の古着店リスト：
- RAGTIME（渋谷/アメカジ）- 70〜90年代ヴィンテージアメカジ専門
- BerBerJin（原宿/ヴィンテージ）- 希少デニムが人気のセレクトショップ
- 2nd STREET 渋谷店（渋谷/古着全般）- ブランド品から普段着まで幅広い大手チェーン
- 下北沢エリアの各店（下北沢/古着全般・アメカジ・ヴィンテージ）- 激戦区
- 高円寺エリアの各店（高円寺/ヴィンテージ・セレクト）- 個性的な店が集まる聖地
- 吉祥寺・中野など多数の店舗

ユーザーの質問に答えるとき：
- 店舗のおすすめは具体的に（エリア・ジャンルを踏まえて）
- 古着の選び方・見方のアドバイスも得意
- 質問が曖昧なら「何が探したい？」と聞き返す
- 常に「ボス」目線で、上から目線ではなく頼れる兄貴分として話す`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 512,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    });

    const text = response.content.find(b => b.type === 'text')?.text || '';
    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '通話が繋がりませんでした。もう一度お試しください。' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});
