import express from "express";

const app = express();

app.get("/health", (_, res) => {
	res.json({ message: "hello" }).status(200);
});

export { app };
export default app;
