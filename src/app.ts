import express from "express";
import router_v1 from "./routes/v1"

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hi am Alive!");
})

app.get('/v1', (req, res) => {
  res.send("Hi am Alive!");
})

app.use('/v1', router_v1);

export default app;