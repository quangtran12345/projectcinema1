var app = angular.module('Movie')
app.controller('detailController', ['$scope', 'apiService', function ($scope, apiService) {
    var id = document.getElementById('id').innerHTML;
    $scope.detailMovie = {}
    apiService.viewDetail(id).then(function (res) {
        $scope.detailMovie = res.data.movies
        console.log($scope.detailMovie.name)
    }).catch(function (res) {
        console.log(res)
    })

}])