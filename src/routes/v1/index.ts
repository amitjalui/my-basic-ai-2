import express from "express";
import basicAi from "./basicAi.router";

const router = express.Router();

router.use('/basic-ai', basicAi);

export default router;