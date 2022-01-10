const express = require("express")
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

let ticketSubmissionChoices = [
    {title: "Harassment" },
    {title: "Work conditions" },
    {title: "Pay and benefits" },
    {title: "Other"}
]

app.get("/", function(req, res){
    res.render("index", {foo: "FOO"})
});

app.get("/ticket-submission", function(req, res){
    res.render("ticketSubmission", {ticketSubmissionChoices: ticketSubmissionChoices})
});

app.get("/about-us", function(req, res){
    res.render("aboutUs")
});

app.get("/submission-success", function(req, res){
    res.render("submissionSuccess")
});

app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`);
})