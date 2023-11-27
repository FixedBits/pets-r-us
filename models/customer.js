
/*
  Title: customer.js 
  Author: Professor Krasso
  Date: 11/26/2023
  Source: https://github.com/buwebdev/web-340/blob/master/week-6/mongoose-model/models/fruit.js
 */

"use strict";

// Import
const mongoose = require('mongoose');

// schema
const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true }
});

// Model
const Customer = mongoose.model('Customer', CustomerSchema);

// Export
module.exports = Customer;
