import express, { Application, Request, Response } from "express";
import { sortedResult } from ".";
import { lesoesMachucados, lesoesValor } from "./jsons/mainJson";
import highlight from "cli-highlight";

const app: Application = express();
const PORT = process.env.PORT || 3721;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "API is running" });
});

app.get("/sorted", (req: Request, res: Response) => {
  res.json(sortedResult(lesoesValor));
});


app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});