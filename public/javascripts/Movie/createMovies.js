angular.module('Movie').controller('createController', ['$scope', '$http', function ($scope, $http) {
    $scope.genres = ['Action', 'Horror', 'Romantic']
    
    function validateValue() {
        var error = false
        if(!$scope.dataMovies["name"]) {
            error = true
            alert("Input your movie's name")
        }
        return error
    }
    
    $scope.submit = function () {
        var error = validateValue(error)
        if(!error) {
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
            if(file) {
                formData.append('image', file)
            }
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
    }
}])
