
/*
  Title: appointment.js 
  Author: Professor Krasso
  Date: 10/10/2023
  Source: https://github.com/buwebdev/web-340/blob/master/week-6/mongoose-model/models/fruit.js
 */
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let appointmentSchema = new Schema({
    customerId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true}
});

// Export
module.exports = mongoose.model('Appointment', appointmentSchema);  