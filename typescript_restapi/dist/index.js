var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express, { Router, } from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import CustomerModel from "./models/customer.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import connectDB from "./database.js";
import jwt from "jsonwebtoken";
// ES 모듈에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
connectDB();
const sec = process.env.TOKEN_SECRET;
const generateAccessToken = (username) => {
    return jwt.sign({ username }, sec, { expiresIn: "600s" });
};
const app = express();
const port = 3001;
const router = Router();
app.use(express.static(path.join(__dirname, "public")));
// auth
router.post("/api/v1/auth", (req, res) => {
    const token = generateAccessToken(req.body.username);
    res.json({ token });
});
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, sec, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ msg: "Forbidden", error: err.message });
        }
        req.user = user;
        next();
    });
};
app.use(bodyParser.json());
app.use(cors());
const corsOptions = {
    origin: "*",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(router);
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
router.get("/api/v1/customers", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield CustomerModel.find();
        res.json(customers);
    }
    catch (error) {
        console.log("고객 조회 실패", error);
        res.status(500).json({ error: "조회 중 오류가 발생했습니다." });
    }
}));
router.get("/api/v1/customers/:id", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield CustomerModel.findOne({ id: req.params.id });
        if (!customer) {
            return res.status(404).json({ error: "고객을 찾을 수 없습니다." });
        }
        res.json(customer);
    }
    catch (error) {
        console.log("고객 조회 실패", error);
        res.status(500).json({ error: "조회 중 오류가 발생했습니다." });
    }
}));
router.post("/api/v1/customers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.body;
    const newCustomer = new CustomerModel({
        id: uuidv4(),
        name: customer.name,
        address: customer.address,
        email: customer.email,
    });
    try {
        const savedCustomer = yield newCustomer.save();
        res.status(201).json(savedCustomer);
    }
    catch (error) {
        console.error("고객 저장 실패", error);
        res.status(500).json({
            error: "데이터베이스에 고객 정보 저장 실패",
        });
    }
}));
router.put("/api/v1/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield CustomerModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!customer) {
            return res.status(404).json({ error: "고객을 찾을 수 없습니다." });
        }
        res.status(200).json(customer);
    }
    catch (error) {
        console.error("고객 정보 수정 오류", error);
        res.status(500).json({
            error: "데이터베이스 고객 정보 수정 중 오류 발생",
        });
    }
}));
router.delete("/api/v1/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield CustomerModel.findOneAndDelete({
            id: req.params.id,
        });
        if (!result) {
            return res.status(404).json({ error: "고객을 찾을 수 없습니다." });
        }
        res.status(200).json({ msg: "고객 정보 삭제 완료" });
    }
    catch (error) {
        console.error("고객 정보 삭제 실패", error);
        res.status(500).json({
            error: "데이터베이스 고객 정보 삭제 중 오류 발생",
        });
    }
}));
app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
