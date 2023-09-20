const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  transporter
    .sendMail({
      from: email,
      to: "myemail@email.com",
      subject: `hello ${name}`,
      text: message,
    })
    .then(() => {
      return res.send({
        message: "Email sent successfully",
      });
    })
    .catch((error) => {
      console.error("error", error);
      return res.send({
        message: "Error sending email",
      });
    });
});

app.listen(PORT, () => console.log("server started on port 3000"));
