const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
  to: "regam25622@edulena.com",
  from: "1406dariaal@gmail.com",
  subject: "Test",
  html: "<p>Test email</p>",
};

sgMail.send(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
