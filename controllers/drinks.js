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


// Seed data route
router.get('/seed/newdrinks', (req, res)=>{
  const newDrinks = [
    {
      name: 'Molokai Mike',
      description: 'Somewhere around 1934 our old pal Trader Vic Bergeron concocted a frozen drink that not only tasted great, it looked fantastic.',
      ingridients: ['1 oz. light rum', '1 oz. orange juice', '1 oz. lemon juice', '1/2 oz. brandy', '1/2 oz. orgeat syrup', '1/2 cup crushed ice'],
      garnishes: ['umbrella', 'lemon slice'],
      recipe: 'Blend ingredients in a blender on pulse for 1-2 seconds. Any more will make the mix too watery. Pour it into the glass',
      comments: ['Wow, what a fruity drink!', 'My dad used to make these, delish!'],
      likes: 4,
      tags: ['lemon', 'fruity', 'tropical']
      image: 'http://tikiloungetalk.com/wp-content/uploads/2011/01/molakai-mike.jpg',
    },
    {
      name: 'The Blue Devil',
      description: 'It’s sort of like a blue version of a Singapore Sling, sort of, at least you’ll agree with me after your third.',
      ingridients: ['35ml Gin', '10ml Blue Curaso', '25ml fresh lime juice', '10ml Creme de Cacao', '10ml Cherry Brandy'],
      garnishes: ['Mericino Cherry'],
      recipe: 'Pour everything into a shaker with ice, the Shake it up baby, twist and shout, strain into a cocktail glass.',
      comments: ['Looks interesting, I might try this one.', 'Blue ice cream with the gumball at the bottom…you’ve got me on that one.'],
      likes: 13,
      tags: ['cocktails', 'drinks', 'tiki culture']
      image: 'http://tikiloungetalk.com/wp-content/uploads/2010/09/bluedevil.jpg',
    },
    {
      name: 'The Sweet Caroline',
      description: 'It’s got a nice sweet taste, with citrus kick. Kind of like this girl named Caroline I used to know.',
      ingridients: ['1 oz Midori', '1 oz Amaretto', '1 oz Sour Mix', 'Fill with Orange Juice'],
      garnishes: ['orange slice', 'cherry'],
      recipe: 'Pour over ice in a large glass and stir. Garnish with an orange slice and a cherry. Pretty simple, very tasty! The sugars seem to make the booze hit your head faster than you’d think, so be careful with this one, kids.',
      comments: ['Too Sweet. I want my money back', 'Do not drink more than 5 of these at one time. Big mistake.'],
      likes: 2,
      tags: ['florida', 'midori', 'tiki']
      image: 'http://tikiloungetalk.com/wp-content/uploads/2010/08/midoridrink.jpeg',
    },
    {
      name: 'Mai Tai',
      description: 'The drink Hawai\'i made famous',
      ingridients: ['1 oz. lime juice', '1 oz. VSOP Martinique rum', '1 oz. dark Jamaican rum', '1 oz. orange Curacoa', '1/2 oz. Orgeat', '1/4 oz. sugar'],
      garnishes: ['tropical flower', 'umbrella'],
      recipe: 'Add at least 2 cups of crushed ice, then shake well for around 10 seconds. Pour unstrained into a double old-fashioned glass. Sink your spent lime shell in the drink.',
      comments: ['Tastes like I am on the beach!', 'I had this one a plane once'],
      likes: 765,
      tags: ['hawaii', 'rum', 'flowers']
      image: 'http://beachbumberry.com/img/MaiTai_NEW.jpg',
    }
  ]

  // Seed data route
  router.create(newDrinks, (error, drink)=>{
    if (error) {console.log(error)}
    console.log('SEEDED NEW DRINKS');
    res.json(drink)
  })

  
})
module.exports = router;
