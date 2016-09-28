(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope','$filter'];
function LunchCheckController($scope, $filter) {
  $scope.output = "";
  $scope.styled = "";
  $scope.name = "";
  $scope.array = "";
  $scope.calculate = function () {
    if($scope.name == "") {
      $scope.output = "Please enter data first.";
      $scope.styled = "border-color:red";
    } else {
        $scope.array = $scope.name.replace(/\s+/g, '').split(',');
        $scope.array = $scope.array.filter(function(e){ return e === 0 || e});
        console.log($scope.array);
        if($scope.array.length < 1) {
          $scope.output = "Please enter data first.";
          $scope.styled = "border-color:red";
        } else if($scope.array.length <= 3) {
          $scope.styled = "border-color:green";
          $scope.output = "Enjoy!";
        } else {
          $scope.styled = "border-color:green";
          $scope.output = "Too much!";
        }
      }
  };
}

})();
