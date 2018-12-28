angular.module('Movie',[]).factory('apiService',['$http',function($http){
    return {
        //List Movies
        listMovie: function () {
            return $http.get("/api/movie/list");
        },
        //Create User
        // createUser: function (formData) {
        //     return $http.post('/api/movie/create', formData, {
        //             transformRequest: angular.identity,
        //             headers: {
        //                 'Content-Type': undefined
        //             }
        //         }).then(function() {
        //             location.href = "/"
        //         })
        //     }
    }
}])
