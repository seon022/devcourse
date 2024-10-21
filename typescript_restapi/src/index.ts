import express, {
    Application,
    NextFunction,
    Request,
    Response,
    Router,
} from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import CustomerModel from "./models/customer.js";
import { Customer } from "./types.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./database.js";
import jwt from "jsonwebtoken";

// ES 모듈에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const sec: string = process.env.TOKEN_SECRET as string;
const generateAccessToken = (username: any) => {
    return jwt.sign({ username }, sec, { expiresIn: "600s" });
};

const app: Application = express();

const port: number = 3001;
const router = Router();

app.use(express.static(path.join(__dirname, "public")));

// auth
router.post("/api/v1/auth", (req, res) => {
    const token = generateAccessToken(req.body.username);
    res.json({ token });
});

interface AuthRequest extends Request {
    user?: any;
}
const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, sec, (err: jwt.VerifyErrors | null, user: any) => {
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

router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
router.get(
    "/api/v1/customers",
    authenticateToken,
    async (req, res: Response) => {
        try {
            const customers = await CustomerModel.find();
            res.json(customers);
        } catch (error) {
            console.log("고객 조회 실패", error);
            res.status(500).json({ error: "조회 중 오류가 발생했습니다." });
        }
    }
);

router.get("/api/v1/customers/:id", authenticateToken, async (req, res) => {
    try {
        const customer = await CustomerModel.findOne({ id: req.params.id });
        if (!customer) {
            return res.status(404).json({ error: "고객을 찾을 수 없습니다." });
        }
        res.json(customer);
    } catch (error) {
        console.log("고객 조회 실패", error);
        res.status(500).json({ error: "조회 중 오류가 발생했습니다." });
    }
});

router.post("/api/v1/customers", async (req: Request, res: Response) => {
    const customer: Omit<Customer, "id"> = req.body;

    const newCustomer = new CustomerModel({
        id: uuidv4(),
        name: customer.name,
        address: customer.address,
        email: customer.email,
    });
    try {
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        console.error("고객 저장 실패", error);
        res.status(500).json({
            error: "데이터베이스에 고객 정보 저장 실패",
        });
    }
});

router.put("/api/v1/customers/:id", async (req: Request, res: Response) => {
    try {
        const customer = await CustomerModel.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!customer) {
            return res.status(404).json({ error: "고객을 찾을 수 없습니다." });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error("고객 정보 수정 오류", error);
        res.status(500).json({
            error: "데이터베이스 고객 정보 수정 중 오류 발생",
        });
    }
});

router.delete("/api/v1/customers/:id", async (req: Request, res: Response) => {
    try {
        const result = await CustomerModel.findOneAndDelete({
            id: req.params.id,
        });
        if (!result) {
            return res.status(404).json({ error: "고객을 찾을 수 없습니다." });
        }
        res.status(200).json({ msg: "고객 정보 삭제 완료" });
    } catch (error) {
        console.error("고객 정보 삭제 실패", error);
        res.status(500).json({
            error: "데이터베이스 고객 정보 삭제 중 오류 발생",
        });
    }
});

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
