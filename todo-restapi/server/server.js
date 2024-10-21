require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// 미들웨어
// body-parser
// http 요청 보낼때, client가 서버로 보내는 데이터 분석하고, 변환할 수 있는거.
app.use(express.json());
// 요청하는대로 서버에서 모두 주겠다는 설정(CORS 정책때문에)
app.use(cors());

// 데이터베이스 연결
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conneted to MongoDB"))
    .catch((err) => console.error("MongoDB connection error : ", err));

// 라우트
app.use("/", todoRoutes);

// 에러 핸들링
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send("Something broke!!");
});

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => console.log(`Server is running on 127.0.0.1:${PORT}`));
