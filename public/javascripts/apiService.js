angular.module('Movie',[]).factory('apiService',['$http',function($http){
    return {
        //List Movies
        listMovie: function () {
            return $http.get("/api/movie/list");
        },
        //Create Movies
        createMovies: function (formData){
            
            return $http.post('/api/movie/create', formData)
        },
    }
}])
