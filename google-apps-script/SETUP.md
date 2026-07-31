# Googleスプレッドシート連携の初期設定

管理用スプレッドシート：
https://docs.google.com/spreadsheets/d/1iAaSAr49rceMHeS7lPtxGs8SeFtjmyg7W6vrGD2GY9s/edit?gid=0#gid=0

現在のウェブアプリURL：
https://script.google.com/macros/s/AKfycbwItNO4FRFpDb7cYgY_P_r0K-NZNcrYNEC83LeprBW7300QNy4DgIOTPrDzr81iScvbBg/exec

1. 管理用スプレッドシートを開き、「拡張機能」→「Apps Script」を開きます。
2. `Code.gs` の内容を貼り付けて保存します。
3. Apps Scriptの「プロジェクトの設定」→「スクリプト プロパティ」に `ARTERIA_CONTACT_API_KEY` を追加し、十分に長いランダムな文字列を設定します。
4. 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」を選びます。
5. 実行ユーザーは自分、アクセスできるユーザーは「全員」にしてデプロイします。
6. 発行されたウェブアプリURLと手順3の共通キーを、Next.jsでは `.env`、PHP版では `php/config.php` に設定します。

スプレッドシート側は、シート名を `お問い合わせ管理` とし、次の14列をこの順番で使用します。

`受付日時 / 問い合わせID / 対応状況 / お問い合わせ種別 / お名前 / メールアドレス / 電話番号 / 会社名・所属 / お問い合わせ内容 / プライバシー同意 / 対応メモ / 担当者 / 対応日 / 送信元ページ`

サイト本体を公開するまでは手順4以降を行わなくても構いません。公開前にテスト送信し、スプレッドシートへ1行追加されることを確認してください。再デプロイする場合は、「デプロイを管理」から既存のウェブアプリに新しいバージョンを反映します。
