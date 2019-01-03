var app = angular.module('Movie')
app.controller('sendMailController',['$scope', 'apiService', function ($scope, apiService) {
    var data = {
        email: undefined,
    }
    function validation() {
        var error = false;
        if (!$scope.email) {
            error = true;
            alert('Input your email')
        }
        return error
    }
    $scope.sendMail = function () {
        var error = validation()
        if(!error) {
            data = {
                email: $scope.email,
            }
            apiService.sendMailResetPass(data).then(function (res) {
                alert(res.data.message)
                location.href = "/login"
            }).catch(function (error) {
                alert(error.data)
            })
        }
    }
}])