/*
============================================
; Title:  index.js
; Author: Victor Soto
; Date: 11/19/2023
; Source: https://github.com/buwebdev/web-340/tree/master
;===========================================
*/
const express = require('express');
const app = express();

const mongoose = require("mongoose");

const Customer = require("./models/customer");


const path = require("path");

const CONN = 'mongodb+srv://web340_admin:thisismypassword@bellevueuniversity.wfnfbmb.mongodb.net/web340DB'; 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Connect to MongoDB database
mongoose
  .connect(CONN)
  .then(() => {
    console.log(
      "Connection to MongoDB successful\n  You have successfully connected to your MongoDB Atlas cluster"
    );
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

//Route to index page
app.get("/", (req, res) => {
  res.render("index");
});

//Route to grooming page
app.get("/grooming", (req, res) => {
  res.render("grooming");
});

//Route to boarding page
app.get("/boarding", (req, res) => {
  res.render("boarding", { activePage: 'boarding' });
});

//Route to training page
app.get("/training", (req, res) => {
  res.render("Training", { activePage: 'training' });
});

//Route to registration page
app.get("/register", (req, res) => {
  res.render("register");
});

//Register
app.post("/register", (req, res, next) => {
  console.log("register");

  const newCustomer = new Customer({
    customerId: req.body.customerId,
    email: req.body.email,
  });

  console.log(newCustomer);

  Customer.create(newCustomer)
    .then((result) => {
      console.log(result);
      res.render("index");
    })
    .catch((err) => {
      console.log("Error : " + err);
    });
});

//Route to customer-list page
app.get('/customer-list', async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.render('customer-list', { customers: customers });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while retrieving customers.");
  }
});

app.listen(PORT, () => {
  console.log("Application started and listening on PORT " + PORT);
});
