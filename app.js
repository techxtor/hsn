const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://admin_krmanish472:clusterpass120@krmanishdb.zrw4w.mongodb.net/hsnDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const membersSchema = {
  fName: String,
  lName: String,
  gender: String,
  age: Number,
  email: String,
  telephone: String,
  payToken: String
};
const Member = mongoose.model("Member", membersSchema);

function AddMemberToMembers(fName, lName, gender, age, email, telephone, payToken) {
  const newMember = new Member({
    fName: fName,
    lName: lName,
    gender: gender,
    age: age,
    email: email,
    telephone: telephone,
    payToken: payToken
  });
  newMember.save(function(err) {
    if (err)
      console.log(err);
    else
      console.log("New member added");
  });
}

var fName
var lName
var gender
var age
var email
var telephone
var payToken

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/become-a-member", function(req, res) {
  res.sendFile(__dirname + "/become-a-member.html");
});

app.get("/donate-now", function(req, res) {
  res.sendFile(__dirname + "/donate-now.html");
});

app.get("/become-a-volunteer", function(req, res) {
  res.sendFile(__dirname + "/become-a-volunteer.html");
});

app.get("/all-members", function(req, res) {
  res.sendFile(__dirname + "/all-members.html");
});

app.get("/news-and-updates", function(req, res) {
  res.sendFile(__dirname + "/news-and-updates.html");
});

// app.get("/our-members", function(req, res) {
//   Member.find(function(err, foundMembers) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("our-member", {
//         memberList: foundMembers
//       });
//     }
//   });
// });

app.post("/become-a-member", function(req, res) {
  fName = req.body.fName;
  lName = req.body.lName;
  gender = req.body.gender;
  age = Number(req.body.age);
  email = req.body.email;
  telephone = req.body.telephone;
  payToken = req.body.payToken;
  AddMemberToMembers(fName, lName, gender, age, email, telephone, payToken);
  res.redirect("/");
});

app.post("/become-a-volunteer", function(req, res) {
  fName = req.body.fName;
  lName = req.body.lName;
  gender = req.body.gender;
  age = Number(req.body.age);
  email = req.body.email;
  telephone = req.body.telephone;
  AddMemberToMembers(fName, lName, gender, age, email, telephone, "payToken");
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000");
});
