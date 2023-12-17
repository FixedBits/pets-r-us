/*
============================================
; Title:  index.js
; Author: Victor Soto
; Date: 11/19/2023
; Source: https://github.com/buwebdev/web-340/tree/master
;===========================================
*/

// Import required modules
const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const Customer = require("./models/customer");
const Appointment = require("./models/appointment");

// Define the MongoDB Atlas connection string
const CONN = 'mongodb+srv://web340_admin:nopassword1@bellevueuniversity.heixdsl.mongodb.net/web340DB?retryWrites=true&w=majority'; 

// Connect to MongoDB database
mongoose
  .connect(CONN)
  .then(() => {
    console.log(
      "Connection to MongoDB was successful"
    );
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Express app
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/grooming", (req, res) => {
  res.render("grooming");
});

app.get("/boarding", (req, res) => {
  res.render("boarding", { activePage: 'boarding' });
});

app.get("/training", (req, res) => {
  res.render("training", { activePage: 'training' });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const newCustomer = new Customer({
    customerId: req.body.customerId,
    email: req.body.email,
  });

  console.log(newCustomer);

  Customer.create(newCustomer)
    .then((customer) => {
      res.render("index");
    })
    .catch((err) => {
      console.log("Error : " + err);
    });
});

const services = require('./public/data/services.json'); 

app.get("/appointment", (req, res) => {
  res.render("appointment", { services: services });
});

app.post("/appointment", (req, res) => {
  const newAppointment = new Appointment({
    customerId: req.body.customerId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    service: req.body.service
  });

  newAppointment.save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while saving the appointment.");
    });
});

app.get("/customer-list", (req, res, next) => {
  Customer.find({})
    .then((customers) => {
      res.render("customer-list", {
        title: "Customer List",
        pageTitle: "Pets-R-Us",
        customersList: customers,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});


//Route to my appointments page
app.get("/my-appointments", (req, res) => {
  res.render("my-appointments");
});

app.get("/api/appointments/:email", (req, res, next) => {
  Appointment.find({ email: req.params.email }, function (err, appointments) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.json(appointments);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log("Application started and listening on PORT " + PORT);
});
