# Arteria Webサイト 実装用プロジェクト

このフォルダは、一般的なレンタルサーバーへアップロードしやすいようにHTML・CSS・JavaScript・画像・PHPを整理したものです。

## 最初に見るもの
1. README_FIRST.htmlをダブルクリックして開いてください。
2. サイトの見た目だけ確認する場合はindex.htmlを開きます。
3. サーバーへ公開するときは、このフォルダの中身をすべてアップロードします。

## 用途
- index.html: トップページ
- その他の.html: 企業理念、会社概要、サービスなどのページ
- assets/css/: 色、文字、余白、スマホ表示などの見た目
- assets/js/: メニュー、ロゴ演出、スクロールする動脈線などの動き
- assets/images/: ロゴ、人物写真、harunoa画像、QRコード
- php/contact.php: お問い合わせ内容をGoogleスプレッドシートへ送信
- php/config.php: スプレッドシート連携と通知メールの設定
- google-apps-script/: 管理用スプレッドシートへ書き込む連携コードと設定手順

## 公開前の確認
- PHP 8.0以上が使えるサーバーか確認
- google-apps-script/SETUP.mdに沿って連携を有効化
- php/config.phpへ連携URLとAPIキーを設定
- 必要に応じてサーバーのメール送信機能を確認
- privacy.htmlに残っているTODOを専門家と確認
- PC・スマホの表示とお問い合わせ送信をテスト

ローカルでPHPまで試す場合は、このフォルダで「php -S localhost:8080」を実行し、http://localhost:8080/ を開きます。HTMLを直接ダブルクリックした表示ではフォーム送信できません。
