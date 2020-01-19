const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var nodemailer = require('nodemailer');
const path = require('path');
let port = process.env.PORT || 3001;
let config = require("./config.json") //add your values to config.json file



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var transporter = nodemailer.createTransport({
    service: config.MAIL_HOST,
    auth: {
        user: config.EMAIL_ID,
        pass: config.EMAIL_PASS
    }
});

app.post('/contact', (req, res) => {
    var mailOptions = {
        from: req.body.email,
        to: config.EMAIL_ID,
        subject: 'Email From FilmSite',
        html: `<h3>From ${req.body.email}</h3><p>${req.body.message}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.json(error)
        } else {
            return res.json(info)
        }
    });
})

app.post('/sendEmail', (req, res) => {
    console.log(req.body);
    console.log(config);
    var mailOptions = {
        from: config.EMAIL_ID,
        to: req.body.email,
        subject: 'Email From FilmSite',
        html: `<h3>Hi ${req.body.name}</h3><p>${req.body.message}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            return res.json(error)
        } else {
            console.log(info,' info')
            return res.json(info)
        }
    });
})

app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})
app.listen(port, () => {
    console.log(`server is up at ${port}`);
})