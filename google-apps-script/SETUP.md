# Googleスプレッドシート連携の初期設定

管理用スプレッドシート：
https://docs.google.com/spreadsheets/d/1suujeoF7bmIHdJF7s8pLMuYTt9liGk6IfILKDdkM9t0/edit

1. 管理用スプレッドシートを開き、「拡張機能」→「Apps Script」を開きます。
2. `Code.gs` の内容を貼り付けて保存します。
3. Apps Scriptの「プロジェクトの設定」→「スクリプト プロパティ」に `ARTERIA_CONTACT_API_KEY` を追加し、十分に長いランダムな文字列を設定します。
4. 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」を選びます。
5. 実行ユーザーは自分、アクセスできるユーザーは「全員」にしてデプロイします。
6. 発行されたウェブアプリURLと手順3の共通キーを、Next.jsでは `.env`、PHP版では `php/config.php` に設定します。

サイト本体を公開するまでは手順4以降を行わなくても構いません。公開前にテスト送信し、スプレッドシートへ1行追加されることを確認してください。
