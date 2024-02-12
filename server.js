const express = require("express");
const app = express();

const PORT = process.env.PORT || 3333;
const connection = require("./config/connection");

const { user_routes } = require("./routes/api");

// middleware
app.use(express.json());

// load routes
app.use("/api", [user_routes]);
connection.on("open", () => {
  app.listen(PORT, () => {
    console.log("server started on port", PORT);
  });
});
