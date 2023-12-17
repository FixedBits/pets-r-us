/*
  Title: customer.js 
  Author: Professor Krasso
  Date: 11/26/2023
  Source: https://github.com/buwebdev/web-340/blob/master/week-6/mongoose-model/models/fruit.js
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema with two fields: customerId and email
let customerSchema = new Schema({
  customerId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

// Export
module.exports = mongoose.model("Customer", customerSchema);
