if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const customExpress = require("./config/customExpress");
const nodemailer = require("nodemailer");
const app = customExpress();

const port = 3000;

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Header',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).send({});
  }
  next();
});

app.get("/", (req, res) => {
  res.send('Welcome to API sendMail'); 
})

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

