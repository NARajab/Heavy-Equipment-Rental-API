require("dotenv").config();
const express = require("express");

const ApiError = require("./utils/apiError");
const errorHandler = require("./controller/errorController");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError("Routes does not exist", 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}....`);
});
