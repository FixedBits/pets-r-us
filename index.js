/*
============================================
; Title:  index.js
; Author: Victor Soto
; Date: 11/19/2023
; Source: https://github.com/buwebdev/web-340/tree/master/week-4
;===========================================
*/
const express = require('express');
const app = express();

// renders css file
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/grooming', function(req, res) {
    res.render('grooming');
});

app.listen(3000, function() {
    console.log('App is listening on port 3000');
});

app.get('/boarding', function(req, res) {
    res.render('boarding', { activePage: 'boarding' });
});

app.get('/training', function(req, res) {
    res.render('Training', { activePage: 'training' });
});

app.get('/register', function(req, res) {
    res.render('register', { activePage: 'register' });
});
