import express from "express";

import authorRouter from "./routes/author.router";
import bookRouter from "./routes/book.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
