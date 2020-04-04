const functions = require("firebase-functions");
const express = require("express");
const path = require("path");

var data_array = [];
var count = 0;

const app = express();
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "jade");

app.get("", (req, res) => {
  const csv = require("csv-parser");
  const fs = require("fs");
  const filepath = path.join(__dirname, "data.csv");

  fs.createReadStream(filepath)
    .pipe(csv())
    .on("data", (row) => {
      data_array.push(row);
      count += 1;
    })
    .on("end", () => {
      var random_entry =
        data_array[Math.floor(Math.random() * data_array.length)];
      res.render("index", {
        workplace: random_entry.Workplace,
        name: random_entry.Name,
        venmo: random_entry.Venmo,
        cashapp: random_entry.CashApp,
        paypal: random_entry.PayPal,
        instagram: random_entry.Instagram,
        work_instagram: random_entry.Work_Instagram,
      });
    });
});

exports.app = functions.https.onRequest(app);
