import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

const accountRoutes = require("./routes/accountRoutes");


app.get("/", (req, res) => {
  res.status(200).json({ alive: "True" });
});

app.use("/", accountRoutes);


export default app;
