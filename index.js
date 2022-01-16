if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const customExpress = require("./config/customExpress");
const nodemailer = require("nodemailer");
const app = customExpress();

const port = 3000;

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;


app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/send", (req, res) => {

  console.log(process.env);

  const email = req.body;

  const tansporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user, pass
    }
  });

  tansporter.sendMail({
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

app.listen(port, () => console.log(`Running on port ${port}!`));
