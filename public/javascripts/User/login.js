angular.module('Movie', []).controller('loginController', function ($scope, $http) {
    $scope.submit = function () {
        var error = false;
        if (!$scope.email) {
            error = true;
            alert('Input your email')
        } else if (!$scope.password) {
            error = true;
            alert('Input your password')
        } else {
            const data = {
                email: $scope.email,
                password: $scope.password,
            }
            $http.post('/api/user/userLogin', data).then(function () {
                location.href = "/"
            }).catch(function () {
                $scope.email = ''
                $scope.password = ''
                alert("Username or password is wrong !")
            })
        }

        if (error === true) {
            $scope.email = ''
            $scope.password = ''
        }
    }
})