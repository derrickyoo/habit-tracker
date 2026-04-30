import express from "express";
import { kMaxLength } from "node:buffer";

const app = express();

app.get("/health", (_, res) => {
	res.json({ message: "hello" }).status(200);
});

app.post("/cake", (_, res) => {
	res.send("ok");
});

app.get("/cake/:name/:id", (req, res) => {
	console.log(req.params.name, req.params.id);
	res.send({ name: req.params.name, id: req.params.id });
});

export { app };
export default app;
