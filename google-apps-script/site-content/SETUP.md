# サイト更新管理の仕組み

管理用スプレッドシート：
https://docs.google.com/spreadsheets/d/1uGvNvlWpLJ5ZBkOYqX0ujOZ1AW0D7h6onuwY1P1CDLM/edit?gid=0#gid=0

## 更新方法

1. 「お知らせ」「採用」「SNS」の対象タブで内容を編集します。
2. サイトへ掲載する行の「掲載」にチェックを入れます。
3. 「公開管理」タブを開き、反映したい対象の「公開反映」にチェックを入れます。
4. チェックを入れた時点の内容だけが公開用データへコピーされ、サイトへ反映されます。

編集しただけでは公開内容は変わりません。「公開反映」のチェックは処理後に自動で外れます。

## Apps Scriptの初期設定

1. スプレッドシートの「拡張機能」→「Apps Script」を開きます。
2. `Code.gs` を貼り付けて保存します。
3. `setupContentManagement` を1回実行し、Googleの権限を承認します。
4. 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」を選びます。
5. 実行ユーザーを自分、アクセスできるユーザーを「全員」にしてデプロイします。
6. 発行URLを `assets/js/site-content-config.js` に設定します。

現在の公開URL：
https://script.google.com/macros/s/AKfycbxogrI0rz_iF5yL3j4l6af7p_-q-7L9d_tVkanZpl1bko433mM4p_FrYzC_dVXHoTlS2Q/exec

## 各タブの必須項目

- お知らせ：タイトル
- 採用：職種名
- SNS：SNS名、URL

必須項目が足りない行は公開対象から除外され、「公開管理」の状態欄に件数が表示されます。

## Apps Scriptを変更した場合

Apps Scriptのコードを変更したときは、「デプロイを管理」から既存のウェブアプリを編集し、
バージョンを「新バージョン」にして更新します。公開URLは通常そのまま利用できます。
