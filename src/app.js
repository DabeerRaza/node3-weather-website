const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "index",
    name: "Dabeer Raza"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Dabeer Raza",
    title: "About me"
  });
});

const para =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi minima totam quam cumque repellat nesciunt ratione tempore labore earum doloribus nostrum eligendi nemo, recusandae velit natus dignissimos, et voluptates eius!";
const name = "Dabeer";

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    para,
    name
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You hav not provided the address, please fill in."
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return console.log(error);
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return console.log(error);
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

// -------------------------------------------------------- //

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide the search term!"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Dabeer Raza",
    title: "404 page",
    message: "Help article not found!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Dabeer Raza",
    title: "404 page",
    message: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("i am on port 3000");
});
