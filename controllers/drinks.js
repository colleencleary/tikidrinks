const express = require("express");
const router = express.Router();
const Drink = require("../models/drinksModel.js");

// Index Route
router.get("/", (req, res) => {
  Drink.find({}, (error, Drinks) => {
    res.json(Drinks);
  });
});

// Create Route
router.post("/", (req, res) => {
  Drink.create(req.body, (error, createdDrink) => {
    res.json(createdDrink);
  });
});

// Delete Route
router.delete("/:id", (req, res) => {
  Drink.findByIdAndRemove(req.params.id, (error, deletedDrink) => {
    res.json(deletedDrink);
  });
});

// Update Route
router.put("/:id", (req, res) => {
  Drink.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedDrink) => {
      res.json(updatedDrink);
    }
  );
});

module.exports = router;
