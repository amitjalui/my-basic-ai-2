import express from "express";
import { basicAi, askBasicAi } from "../../controllers/basicAi.controller";

const basicAiRouter = express.Router();

basicAiRouter.get('/', basicAi);
basicAiRouter.post('/', askBasicAi);

export default basicAiRouter;