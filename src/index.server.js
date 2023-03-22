import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom/server"; // react-router-dom/server
import App from "./App";

const app = express();
// 서버 사이드 렌더링을 처리할 핸들러 함수이다.
//  이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해준다.
const serverRender = (req, res, next) => {
    const context = {};
    const jsx = (
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    );

    const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
    res.send(root); // 클라이언트에게 결과물을 응답한다.
};

// 위 함수를 서버에 적용
app.use(serverRender);

app.listen(5000, () => {
    console.log("Running on http://localhost:5000");
});