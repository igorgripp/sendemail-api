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
  res.send('Welcome to API sendMail'); 
})

app.post("/send", (req, res) => {

  res.header("Access-Control-Allow-Origin", "*");

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
    replyTo: email.youremail,
    subject: email.subject,
    text: 'Cliente: ' + email.yourname + 
          '\nTelefone: ' + email.yourphone +
          '\nMensagem: ' + email.yourmessage
  }).then(info => {
    res.send(info);
  }).catch(err => {
    res.send(err);
  });

});

app.listen(process.env.PORT || port, () => console.log(`Running on port ${port}!`));

