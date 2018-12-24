angular.module('cinema').factory('apiService',['$http',function($http){
    return {
        // User
        createUser: function (data){
            return $http.post('/createUser', data)
        }
    }
}])