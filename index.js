if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const customExpress = require("./config/customExpress");
const nodemailer = require("nodemailer");
const app = customExpress();

const port = 3000;

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;


app.post("/send", (req, res) => {

  const email = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user, pass
    }
  });

  transporter.sendMail({
    from: user,
    to: user,
    replyTo: email.from,
    subject: email.subject,
    text: email.message
  }).then(info => {
    res.send(info);
  }).catch(err => {
    res.send(err);
  });

});

app.listen(process.env.PORT || port, () => console.log(`Running on port ${port}!`));

