const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var port = process.env.PORT;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    
    fs.appendFile("server.log", log + "\n");
    next();
});


app.use((req, res, next) => {
   res.render("maintenance.hbs"); 
});


app.use(express.static(__dirname + "/public"));


hbs.registerHelper("getYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});


app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "welcome to our website",
        currentYear: new Date().getFullYear()
    });
});

app.get("/about", (req, res)=>{
    res.render("about.hbs", {
        pageTitle: "About",
        currentYear: new Date().getFullYear()
    });
});

app.get("/bad", (req, res)=>{
    res.send({
        errorMessage: "Unable to show PAGE"
    });
});



app.listen(port, process.env.IP, () => {
    console.log("Server working");
});