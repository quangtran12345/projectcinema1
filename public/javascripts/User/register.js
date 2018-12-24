var app = angular.module('user', [])
app.controller('register','$scope','$http', async function ($scope, $http) {
    $scope.email = '';
    $scope.password = '';
    $scope.confirm = '';
    $scope.description = '';
    var emailExp = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';

    if ($scope.password !== $scope.confirm) {
        alert('Password not matched');
        $scope.email = '';
        $scope.password = '';
        $scope.confirm = '';
        $scope.description = '';
    } else if (!$scope.email.test(emailExp)) {
        alert("Email not match !");
    } else {
        $scope.createUser = function () {
            const data = {
                email: $scope.email,
                password: $scope.password,
                description: $scope.description
            }
            apiService.createUser(data);
        }
    }
})