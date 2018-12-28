var app = angular.module('Movie')
app.controller('listController',['$scope','apiService', function($scope,apiService){
    
    $scope.items = function () {
        apiService.listMovie().then (function(res) {
            $scope.listFilm = res.data.movies
        }).catch(function(res){
            console.log(res)
        }) 
    }
    $scope.items()
}])