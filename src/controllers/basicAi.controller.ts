import { Request, Response } from "express";

const basicAi = (req: Request, res: Response) => {
  res.send("basic ai");
}

const askBasicAi = (req: Request, res: Response) => {
  const question = req.body.question;

  return res.send(question)
}

export { 
  basicAi,
  askBasicAi
};