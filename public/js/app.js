const app = angular.module('TikiApp', []);

app.controller('MainController', ['$http', function ($http) {

    this.createForm = {}
    this.drink = ''

    this.includePath = 'partials/drinks.html';

    this.changeInclude = (path) => {
        this.includePath = 'partials/'+ path +'.html';
    }
    this.createDrink = () => {
      this.createForm.likes = 0
      $http({
        method:'POST',
        url: '/drinks',
        data: this.createForm
      }).then(response => {
        this.drinks.push(response.data)
        this.createForm = {}
      },  error => {
        console.log(error)
    })
  }

  this.getDrinks = () => {
    $http({
      method: 'GET',
      url: '/drinks'
    }).then(response => {
      this.drinks = response.data
    }, error => {
      console.log(error)
    })
  }

  this.deleteDrink = id => {
    $http({
      method: 'DELETE',
      url: '/drinks/' + id
      }).then (response => {
        console.log(response.data)
      }).then(response => {
        const removeByIndex = this.drinks.findIndex(drink => drink._id === id)
        this.drinks.splice(removeByIndex, 1)
      }, error => {
        console.log(error)
      })
    }

    this.updateDrink = (drink) => {
      $http({
        method:'PUT',
        url: '/drinks/' + drink._id,
        data: this.createForm
      }).then(response => {
        console.log(response)
        this.getDrinks()
        this.showUpdateForm = false
      },  error => {
        console.log(error)
    })
    }

    this.likeDrink = drink => {
      drink.likes++
      $http({
      method: 'PUT',
      url: '/drinks/' + drink._id,
      data: {likes: drink.likes}
    }).then(response => {
      console.log(response.data)
    }, error => {
      console.log(error.message)
    })
    }

  this.getDrinks()
}]);
