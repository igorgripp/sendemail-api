if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const customExpress = require("./config/customExpress");
const nodemailer = require("nodemailer");
const app = customExpress();

const port = 3000;

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;


// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://sendemail-igfullstack.herokuapp.com/');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
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

