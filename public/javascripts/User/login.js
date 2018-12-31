angular.module('Movie', []).controller('loginController', function ($scope, $http) {
    var data = {
        email: undefined,
        password: undefined,
    }
    function validation() {
        var error = false;
        if (!$scope.email) {
            error = true;
            alert('Input your email')
        } else if (!$scope.password) {
            error = true;
            alert('Input your password')
        }
        return error
    }
    $scope.submit = function () {
        var error = validation()
        if(!error) {
            data = {
                email: $scope.email,
                password: $scope.password,
            }
            $http.post('/api/user/userLogin', data).then(function () {
                location.href = "/"
            }).catch(function (error) {
                $scope.email = ''
                $scope.password = ''
                alert(error.data)
            })
        }
    }
})