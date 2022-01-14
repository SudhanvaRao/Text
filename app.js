//jshint esversion: 6
var ans = "";
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index", {});
});

app.get('/result', function(req, res) {
    res.render("result", {
        ans: ans,
    });
});

app.post('/', function(req, res) {
    var text = req.body.text;
    // console.log(text);
    ans = chipher(text)
        // console.log(ans);
    if (ans.length == 0) {
        ans = "Enter a valid String";
    }
    res.redirect("/result");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});

function chipher(text) {
    var ciphertext = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i] == ' ') {
            ciphertext += " ";
        } else if (text[i].charCodeAt(0) >= 48 && text[i].charCodeAt(0) <= 57) {
            ciphertext += text[i];
        } else if (text[i].charCodeAt(0) >= 65 && text[i].charCodeAt(0) <= 90 && text[i] == text[i].toUpperCase()) {
            ciphertext += String.fromCharCode(25 - (text[i].charCodeAt(0) - 65) + 65);
        } else if (text[i].charCodeAt(0) >= 97 && text[i].charCodeAt(0) <= 122 && text[i] == text[i].toLowerCase()) {
            ciphertext += String.fromCharCode(25 - (text[i].charCodeAt(0) - 97) + 97);
        } else {
            ciphertext += text[i];
        }
    }
    return ciphertext;
}