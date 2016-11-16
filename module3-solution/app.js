(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'directive/foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.logMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    menu.items = MenuSearchService.get();
    promise.then(function (response) {
      menu.items = response;
      console.log(menu.items);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  menu.remove = function(index) {
    MenuSearchService.remove(index);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var found = [];
  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });
    return response;
  };

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result) {
      var array = [];
      array = result.data.menu_items;
      for(var i=0; i<array.length; i++) {
        //console.log(array[i].description);
        if(array[i].description.includes(searchTerm)) {
          found.push(array[i]);
        }
      }
      return found;
    });
    console.log("res" + response);
    return response;
  };

  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

  service.remove = function(index) {
    found.splice(index,1);
  };

  service.get = function () {
    return found;
  };
}

})();
