angular.module('Movie').controller('createController', ['$scope', '$http', function ($scope, $http) {
    $scope.submit = function () {
        var formData = new FormData
        var date = $("#datepicker").datepicker('getDate')
        $scope.dates = {}
        var timestamp = Math.floor( date.getTime());
        $scope.dates = timestamp;
        var file = $('#files')[0].files[0];
        for (key in $scope.dataMovies) {
            formData.append(key, $scope.dataMovies[key])
        }
        formData.append('date', $scope.dates)
        formData.append('image', file)

        $http.post('/api/movie/create', formData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function() {
            location.href = "/"
        }).catch(function (res) {
            console.log(res)
        }) 
    }
}])
