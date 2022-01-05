import * as dotenv from "dotenv";
if (process.env.NODE_ENV == "development") {
  dotenv.config();
}
import { sequelize } from "./models";
//sequelize.sync({ alter: true });

import * as express from "express";
import {
  deleteRecordById,
  getAllRecordsByUserId,
  getRecordById,
  getBalance,
  newRecord,
  updateRecordById,
} from "./controllers/records-controller";
import { signup, signin } from "./controllers/auth-controller";
import * as bearerToken from "bearer-token";
import * as jwt from "jsonwebtoken";
import * as path from "path";

const app = express();
const port = process.env.PORT;

app.use(express.json());

// Sign up. Get email and password from body.
app.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const response = await signup(email, password);
  if (response) {
    res.json({
      auth: response.newAuth,
      mensaje: "New auth and user created",
    });
  } else {
    res.status(409).json({
      mensaje: "User already exists",
    });
  }
});

// Sign in. Gets email and password from body.
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const response = await signin(email, password);
  if (response) {
    res.json(response);
  } else {
    res.status(401).json("Password or user are incorrect");
  }
});

// Auth middleware.
function authMiddleware(req, res, next) {
  bearerToken(req, async (err, token) => {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req._userId = decoded.userId;
      next();
    } catch (err) {
      res.status(401).json(err);
    }
  });
}

// Create a new record.
app.post("/me/records", authMiddleware, async (req, res) => {
  const { concept, amount, date, type, category } = req.body;
  const UserId = (req as any)._userId;

  const recordData = {
    concept,
    amount,
    date,
    type,
    category,
    UserId,
  };

  const newRecordRes = await newRecord(recordData);
  res.json(newRecordRes);
});

// Get all records from user.
app.get("/me/records", authMiddleware, async (req, res) => {
  const UserId = (req as any)._userId;
  const limit = Number.parseInt(req.query.limit as string);
  const category = req.query.category as string;

  const recordsFound = await getAllRecordsByUserId(
    UserId,
    limit || undefined,
    category || undefined
  );

  res.json(recordsFound);
});

// Get one record by record ID.
app.get("/me/records/:id", authMiddleware, async (req, res) => {
  const UserId = (req as any)._userId;
  const recordId = req.params.id;
  const recordFound = await getRecordById(UserId, recordId);
  res.json(recordFound);
});

// Update a record by ID.
app.patch("/me/records/:recordId", authMiddleware, async (req, res) => {
  const UserId = (req as any)._userId;
  const id = req.params.recordId;
  const { concept, amount, date, category } = req.body;
  const recordData = {
    concept,
    amount,
    date,
    category,
  };
  const updatedRecord = await updateRecordById(recordData, id, UserId);
  res.json(updatedRecord);
});

// Get account balance.
app.get("/me/balance", authMiddleware, async (req, res) => {
  const UserId = (req as any)._userId;
  const balance = await getBalance(UserId);
  res.json({ balance });
});

// Delete record by id.
app.delete("/me/records/:recordId", authMiddleware, async (req, res) => {
  const id = req.params.recordId;
  const deleted = await deleteRecordById(Number.parseFloat(id));
  res.json(deleted);
});

// Serve static file.
app.get("*", express.static("client"));

// Set path for static file.
app.get("*", (req, res) => {
  const ruta = path.resolve(__dirname, "../client", "index.html");
  res.sendFile(ruta);
});

// Listen to requests.
app.listen(port, () => {
  console.log("Listening at port " + port);
});
