angular.module('Movie', [])
    .controller('registerController', function ($scope, $http) {
        $scope.submit = function () {
            var error = false;
            if (!$scope.email) {
                alert('Input your email please !')
                error = true
            } else if (!$scope.password) {
                alert('Input your password !')
                error = true
            } else if ($scope.password.length < 6) {
                alert('Password must more five characters !')
                error = true
            } else if ($scope.password !== $scope.confirm) {
                alert('Password is not match!')
                error = true
            } else {
                const data = {
                    email: $scope.email,
                    password: $scope.password,
                }

                $http.post('/api/user/createUser', data).then(function (res) {
                    location.href = "/"
                }).catch(function (res) {
                    $scope.password = ''
                    $scope.confirm = ''
                    $scope.email = ''
                    alert(res.data.message)
                })
            }
            if (error) {
                $scope.password = ''
                $scope.confirm = ''
            }
        }
    })