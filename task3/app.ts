import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

const accountRoutes = require("./routes/accountRoutes");


/* This is the root route. It is used to check if the server is running. */
app.get("/", (req, res) => {
  res.status(200).json({ alive: "True" });
});

/* Telling the server to use the routes in the ProductRoutes file. */
app.use("/", accountRoutes);


export default app;




/* A middleware that parses the body of the request and makes it available in the req.body object. */
// app.use(express.json());



// module.exports = app;