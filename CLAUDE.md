# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## アプリ概要

東京の古着屋をマップ表示・ジャンル絞り込みできるナビWebアプリ。バックエンドなし、静的ファイルのみで動作。

## 開発・起動方法

ビルドツール・パッケージマネージャー不使用。`index.html` をブラウザで直接開くか、ローカルサーバーで配信するだけで動く。

```bash
# Python でローカルサーバーを起動する場合
python -m http.server 8080
```

## アーキテクチャ

ファイル3本のシンプルな構成：

| ファイル | 役割 |
|---|---|
| `index.html` | レイアウト・フィルターボタン定義 |
| `stores.js` | 店舗データ配列 `stores[]` をグローバルに定義 |
| `app.js` | Leaflet マップ初期化、フィルタリング、カード描画ロジック |
| `style.css` | ダークテーマ（`#1a1a1a` ベース）、アクセントカラー `#c8a86b` |

**データフロー**: `stores.js` が先に読み込まれ、`app.js` がグローバル変数 `stores[]` を参照してマップとリストを描画する。`index.html` の script タグの順序（`stores.js` → `app.js`）は変えてはいけない。

**マップ**: Leaflet 1.9.4（CDN）＋ OpenStreetMap タイル。初期表示は東京（35.67, 139.69）ズーム12。

## 店舗データの追加・編集

`stores.js` の配列に以下の形式でオブジェクトを追加する：

```js
{
  id: <連番>,
  name: "店舗名",
  address: "住所",
  genre: "古着全般" | "アメカジ" | "ヴィンテージ" | "セレクト",
  lat: <緯度>,
  lng: <経度>,
  description: "説明文"
}
```

ジャンルを追加する場合は `stores.js` のデータと `index.html` のフィルターボタン両方に追記する。
