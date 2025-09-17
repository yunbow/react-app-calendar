# カレンダーアプリ (TypeScript + React + Storybook)

React 18とTypeScriptで構築されたカレンダーアプリケーションです。機能別のモジュラーアーキテクチャを採用しています。

## デモプレイ
https://yunbow.github.io/react-app-calendar/demo/

## 主要機能

### カレンダー表示
- 月次カレンダー表示
- 前月・次月ナビゲーション
- 今日の日付ハイライト表示
- 今日ボタンで現在月にジャンプ

### イベント管理
- 日付クリックでイベント追加
- イベントのタイトル・時間・詳細入力
- イベントの編集・削除
- ローカルストレージでの永続化

### 予定表示
- カレンダー上にイベント表示（最大3件まで）
- イベントインジケーター（青い点）
- 今後の予定リスト表示
- 予定がない場合の適切な表示

### 操作方法
- **日付クリック**: 新しいイベントを追加
- **編集ボタン**: 既存イベントの編集
- **削除ボタン**: イベントの削除（確認ダイアログ付き）
- **前月/次月ボタン**: カレンダーナビゲーション
- **今日ボタン**: 現在の月にジャンプ

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール

## プロジェクト構造

```
src/
├── features/                   # 機能別モジュール
│   └── calendar/               # カレンダー機能
│       ├── components/         # 機能専用コンポーネント
│       │   ├── CalendarHeader/ # カレンダーヘッダー
│       │   ├── CalendarDay/    # 日付セル
│       │   ├── EventModal/     # イベント追加/編集モーダル
│       │   └── EventsList/     # 予定リスト
│       ├── CalendarApp/        # 機能ルートコンポーネント
│       ├── useCalendar.ts      # カレンダー管理フック
│       └── types.ts            # 機能固有の型定義
├── components/                 # 共通UIコンポーネント
│   ├── Button/                 # 操作ボタン
│   ├── Input/                  # テキスト入力
│   └── Text/                   # テキスト表示
├── stories/                    # Storybook用ストーリー
├── utils/                      # ユーティリティ関数
│   ├── dateUtils.ts            # 日付操作関数
│   └── storageUtils.ts         # ローカルストレージ操作
├── types/                      # グローバル型定義
│   └── css-modules.d.ts        # CSS Modules型定義
├── App.tsx                     # メインアプリ
└── main.tsx                    # エントリーポイント
```

## スクリプト

```bash
# セットアップ
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

## ライセンス

MIT License