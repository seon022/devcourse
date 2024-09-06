require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// 미들웨어
// body-parser
// http 요청 보낼때, client가 서버로 보내는 데이터 분석하고, 변환할 수 있는거.
app.use(express.json());

app.use(cors());
// 요청하는대로 서버에서 모두 주겠다는 설정

const index = require("./router/index");
app.use("/", index);

app.listen(5000, () => console.log("Server is running on 127.0.0.1:5000"));
