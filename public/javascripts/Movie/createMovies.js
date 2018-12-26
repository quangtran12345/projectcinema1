var app = angular.module('Movie')
app.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, {$files: event.target.files })
        })
    }
    return {
        link: fn_link
    }
}]).controller('fupController',function ($scope, $http) {

    
        var formData = new FormData();

        $scope.createController =function ($files) {
            angular.forEach($files, function (value, key) {
                formData.append(key,value)
            })
        }
        $scope.uploadFiles = function () {
            var request = {
                method: 'POST',
                url: '/api/movie/create',
                data: formData, 
                headers: {
                    'Content-Type': undefined
                }
            }
        
        $http(request)
    }// $scope.movie = 'Xin chao'
})
