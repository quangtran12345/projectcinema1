var app = angular.module('Movie')
app.controller('listController',['$scope','apiService', function($scope,apiService){
    function convertLinkMovie(movies) {
        for(var i=0; i < movies; i++) {
            alert("")
        }
     }
    $scope.items = function () {
        
        apiService.listMovie().then (function(res) {
            convertLinkMovie(res.data.movies) 
            $scope.listFilm = res.data.movies
        }).catch(function(res){
            console.log(res)
        })
         
    }
    $scope.logout = function () {
        apiService.logoutUser().then(function () {
            location.href = "/login"
        }).catch(function (res) {
            console.log(res)
        })
    }

    $scope.search = function() {
        var searchValue = document.getElementById("searchValue");
        apiService.searchMovie(searchValue).then(function () {
            $scope.listFilm = res.data.movies
        }).catch(function (res) {
            console.log(res)
        })
    }
}])