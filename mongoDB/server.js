import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/userRoutes.js";

const app = express();

dotenv.config();
// .env 파일의 환경 변수

app.use(bodyParser.json());
// 요청 본문을 JSON 형식으로 파싱하기 위해 body-parser 미들웨어를 사용합니다.

const PORT = process.env.PORT || 8000;
// 환경 변수에서 포트 번호를 가져오거나, 기본값으로 8000을 사용합니다.

const MONGOURL = process.env.MONGO_URL;
// 환경 변수에서 MongoDB 연결 URL을 가져옵니다.

// MongoDB에 연결을 시도합니다.
mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("연결 잘 됐어!");
        app.listen(PORT, () => {
            console.log(`연결 잘 됐어용. http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use("/user", route);
// '/user' 경로에 대한 라우트를 설정합니다.

// ----------------------------------------------------------

// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// const userModel = mongoose.model("users", userSchema);

// app.get("/user", async (req, res) => {
//   res.json(user);
// });
