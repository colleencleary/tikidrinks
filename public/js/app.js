const app = angular.module("TikiApp", []);

app.controller("MainController", [
  "$http",
  function($http) {
    this.showDetails=false;
    this.showComments=false;
    this.createForm = {};
    this.drink = "";
    this.currentUser = '';
    this.test = "works";
    this.includePath = "partials/drinks.html";


    //Toggle Login
    this.toggleLogin = () => {
      this.showLogin = !this.showLogin;
    };

    this.toggleLogout = () => {
      this.loggedIn = !this.loggedIn;
    };

    this.toggleDetails = (drink) => {
      this.showDetails = true;
      this.drink = drink
    }

    this.toggleComments = () => {
      this.showComments = !this.showComments;
    };

    this.changeInclude = path => {
      this.includePath = "partials/" + path + ".html";
    };
    this.drinks = [
      {
        name: "Molokai Mike",
        author: "seanbrier",
        description:
          "Somewhere around 1934 our old pal Trader Vic Bergeron concocted a frozen drink that not only tasted great, it looked fantastic.",
        ingredients: [
          "1 oz. light rum",
          "1 oz. orange juice",
          "1 oz. lemon juice",
          "1/2 oz. brandy",
          "1/2 oz. orgeat syrup",
          "1/2 cup crushed ice"
        ],
        garnishes: ["umbrella", "lemon slice"],
        recipe:
          ["Blend ingredients in a blender on pulse for 1-2 seconds. Any more will make the mix too watery.", "Pour drink into the glass and garnish with umbrella and lemon slice.", "Enjoy!"],
        comments: [
          {body: "Wow, what a fruity drink!", author: 'kendra'},
          {body: "My dad used to make these, delish!", author: 'seanbrier'}
        ],
        likes: 4,
        tags: ["lemon", "fruity", "tropical"],
        image:
          "http://tikiloungetalk.com/wp-content/uploads/2011/01/molakai-mike.jpg"
      },
      {
        name: "The Blue Devil",
        author: "seanbrier",
        description:
          "It’s sort of like a blue version of a Singapore Sling, sort of, at least you’ll agree with me after your third.",
        ingredients: [
          "35ml Gin",
          "10ml Blue Curaso",
          "25ml fresh lime juice",
          "10ml Creme de Cacao",
          "10ml Cherry Brandy"
        ],
        garnishes: ["Mericino Cherry"],
        recipe:
          ["Pour everything into a shaker with ice.", "Shake it up baby, twist and shout!", "strain into a cocktail glass."],
        comments: [
          "Looks interesting, I might try this one.",
          "Blue ice cream with the gumball at the bottom…you’ve got me on that one."
        ],
        likes: 13,
        tags: ["cocktails", "drinks", "tiki culture"],
        image:
          "http://tikiloungetalk.com/wp-content/uploads/2010/09/bluedevil.jpg"
      },
      {
        name: "The Sweet Caroline",
        author: "seanbrier",
        description:
          "It’s got a nice sweet taste, with citrus kick. Kind of like this girl named Caroline I used to know. Pretty simple, very tasty! The sugars seem to make the booze hit your head faster than you’d think, so be careful with this one, kids.",
        ingredients: [
          "1 oz Midori",
          "1 oz Amaretto",
          "1 oz Sour Mix",
          "Fill with Orange Juice"
        ],
        garnishes: ["orange slice", "cherry"],
        recipe:
          ["Mix all ingredients in a shaker","Pour over ice in a large glass and stir", "Garnish with an orange slice and a cherry. "],
        comments: [
          "Too Sweet. I want my money back",
          "Do not drink more than 5 of these at one time. Big mistake."
        ],
        likes: 2,
        tags: ["florida", "midori", "tiki"],
        image:
          "http://tikiloungetalk.com/wp-content/uploads/2010/08/midoridrink.jpeg"
      },
      {
        name: "Mai Tai",
        author: "seanbrier",
        description: "The drink Hawai'i made famous",
        ingredients: [
          "1 oz. lime juice",
          "1 oz. VSOP Martinique rum",
          "1 oz. dark Jamaican rum",
          "1 oz. orange Curacoa",
          "1/2 oz. Orgeat",
          "1/4 oz. sugar"
        ],
        garnishes: ["tropical flower", "umbrella"],
        recipe:
        [ "Add at least 2 cups of crushed ice", "Shake well for around 10 seconds.", "Pour unstrained into a double old-fashioned glass.",  "Sink your spent lime shell in the drink."],
        comments: [
          "Tastes like I am on the beach!",
          "I had this one a plane once"
        ],
        likes: 765,
        tags: ["hawaii", "rum", "flowers"],
        image: "http://beachbumberry.com/img/MaiTai_NEW.jpg"
      }
    ];

    this.createUser = function() {
      $http({
        method: "POST",
        url: "/users",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(
        function(response) {
          console.log(response);
        },
        function() {
          console.log("error");
        }
      );
    };

    this.logIn = function() {
      // console.log('works');
      $http({
        method: "POST",
        url: "/sessions",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(
        function(response) {
          console.log(response);
        },
        function() {
          console.log("error");
        }
      );
    };

    this.createDrink = () => {
      this.createForm.ingredients.split(",");
      this.createForm.garnishes.split(",");
      this.createForm.tags.split(",");
      this.createForm.recipe.split(". ");

      this.createForm.likes = 0;
      this.createForm.author = this.username

      console.log(this.createForm);
      $http({
        method: "POST",
        url: "/drinks",
        data: this.createForm
      }).then(
        response => {
          this.drinks.push(response.data);
          this.createForm = {};
        },
        error => {
          console.log(error);
        }
      );
    };

    this.getDrinks = () => {
      $http({
        method: "GET",
        url: "/drinks"
      }).then(
        response => {},
        error => {
          console.log(error);
        }
      );
    };

    this.deleteDrink = id => {
      $http({
        method: "DELETE",
        url: "/drinks/" + id
      })
        .then(response => {
          console.log(response.data);
        })
        .then(
          response => {
            const removeByIndex = this.drinks.findIndex(
              drink => drink._id === id
            );
            this.drinks.splice(removeByIndex, 1);
          },
          error => {
            console.log(error);
          }
        );
    };

    this.updateDrink = drink => {
      this.createForm.ingredients = this.createForm.ingredients.split(",");

      this.createForm.garnishes = this.createForm.garnishes.split(",");

      this.createForm.tags = this.createForm.tags.split(",");
      $http({
        method: "PUT",
        url: "/drinks/" + drink._id,
        data: this.createForm
      }).then(
        response => {
          console.log(response);
          this.getDrinks();
          this.showUpdateForm = false;
        },
        error => {
          console.log(error);
        }
      );
    };

    this.likeDrink = drink => {
      drink.likes++;
      $http({
        method: "PUT",
        url: "/drinks/" + drink._id,
        data: { likes: drink.likes }
      }).then(
        response => {
          console.log(response.data);
        },
        error => {
          console.log(error.message);
        }
      );
    };

    this.getDrinks();
  }
]);
