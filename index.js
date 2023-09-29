// import the pets array from data.js
const pets = require("./data");

// init express app
const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.static("public"));

// GET - / - returns homepage
app.get("/", (req, res) => {
  // serve up the public folder as static index.html file
  res.sendFile(__dirname + "/public/index.html");
});

// hello world route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get all pets from the database
app.get("/api/v1/pets", (req, res) => {
  // send the pets array as a response
  res.json(pets);
});

// get pet by owner with query string
app.get("/api/v1/pets/owner", (req, res) => {
  // get the owner from the request
  const owner = req.query.owner;

  if (!owner) {
    return res.status(400).json({ error: "missing owner's name" });
  }

  // find the pet in the pets array
  const ownerPets = pets.filter(
    (pet) => pet.owner.toLowerCase() === owner.toLowerCase()
  );

  // send the pet as a response
  if (ownerPets.length > 0) {
    res.json(ownerPets);
  } else {
    res.status(404).json({ error: "Pets not found for the provided owner" });
  }
});

// get pet by name
app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request
  const name = req.params.name;

  // find the pet in the pets array
  const pet = pets.find(
    (pet) => pet.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  );

  // send the pet as a response
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ error: "Pet not found!" });
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;
