cd %cd%
start cmd.exe /c "json-server --watch server/index.js --port 3001 --routes server/routes.json --middlewares server/handle-delay.js server/handle-ads.js"
npm start


