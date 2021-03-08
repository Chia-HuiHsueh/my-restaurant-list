# 台北美食地圖
此專案提供使用者登入建立屬於自己的台北美食口袋名單。
## Features - 功能描述
* 使用者可以註冊帳號。
* 使用者可以登入。
* 使用者可以透過 FACEBOOK 登入。
* 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息
* 登入後，使用者可以建立並管理專屬的一個餐廳清單。
* 使用者可以新增一家餐廳
* 使用者可以瀏覽一家餐廳的詳細資訊
* 使用者可以瀏覽全部所有餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳
* 使用者可於首頁搜尋列輸入關鍵字搜尋符合關鍵字描述的餐廳。
* 使用者可以選擇餐廳排序的方式。

## Features - 專案畫面

## Installing - 專案安裝流程
1.開啟終端機(Terminal)，Clone 此專案至本機電腦。
```
git clone https://github.com/wintersprouter/my-restaurant-list
```
2.CD 進入存放此專案的資料夾
```
cd restaurant-list
```
3.安裝 npm 套件
```
輸入 npm install 指令
```
4.新增種子資料
```
輸入npm run seed 指令
```
5.啟動伺服器，執行 app.js 檔案
```
輸入npm run dev指令
於任一瀏覽器輸入 http://localhost:3000 
```

## Environment SetUp - 環境建置
* Visual Studio Code 
* Node.js 
* bcryptjs: ^2.4.3
* body-parser: ^1.19.0
* connect-flash: ^0.1.1
* dotenv": ^8.2.0
* express": ^4.17.1
* express-handlebars: ^5.2.0
* express-session: ^1.17.1
* method-override: ^3.0.0
* mongoose: ^5.11.13
* passport: ^0.4.1
* passport-facebook: ^3.0.0
* passport-local: ^1.0.0