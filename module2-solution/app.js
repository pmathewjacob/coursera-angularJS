(function () {
'use strict';
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  ShoppingListCheckOffService.addItems();
  toBuy.items = ShoppingListCheckOffService.getToBuyitems();

  toBuy.move = function(index) {
    ShoppingListCheckOffService.moveItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
 var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtitems();
}

function ShoppingListCheckOffService() {
  var service = this;
  var toBuyItems = [];
  var alreadyBoughtItems = [];

  service.addToBuyitems = function(quantity, name) {
    var item = {
      quantity: quantity,
      name: name
    };
    toBuyItems.push(item);
  };

  service.getToBuyitems = function() {
    return toBuyItems;
  };

  service.getAlreadyBoughtitems = function() {
    return alreadyBoughtItems;
  };

  service.moveItem = function(index){
    var item = {
      quantity: toBuyItems[index].quantity,
      name: toBuyItems[index].name
    };

    alreadyBoughtItems.push(item);
    toBuyItems.splice(index, 1);
  };

  service.addItems = function() {
    service.addToBuyitems(10,'cone ice creams');
    service.addToBuyitems(20,'fries');
    service.addToBuyitems(30,'chips');
    service.addToBuyitems(40,'coke cans');
    service.addToBuyitems(50,'cookies');
  };

}

})();
