var app = angular.module('Movie')
app.controller('profileController',['$http','$scope','apiService', function($http,$scope,apiService){
    $scope.user = function () {
        var token = document.getElementById("token").value
        apiService.getUserProfile(token).then (function(res) {
            $scope.userProfile = res.data.response
        }).catch(function(res){
            console.log(res)
        })
    }
    $scope.user();
    $scope.genres = ['Action', 'Horror', 'Romantic']
    
    $scope.update = function () {
        var formData = new FormData
        var token = document.getElementById("token").value
        var file = $('#files')[0].files[0];
        for (key in $scope.userProfile) {
            formData.append(key, $scope.userProfile[key])
        }
        if(file) {
            formData.append('image', file)
        }
        formData.append('token', token)
        $http.put('/api/user/userUpdate', formData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function() {
            location.href = "/profile"
        }).catch(function (res) {
            alert(res.data)
        }) 
    }
}])