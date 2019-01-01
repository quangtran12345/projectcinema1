var app = angular.module('Movie')
app.controller('detailController', ['$http', '$scope', 'apiService', function ($http, $scope, apiService) {
    $scope.load = function () {
        var id = document.getElementById('id').innerHTML;
        $scope.detailMovie = {}
        apiService.viewDetail(id).then(function (res) {
            $scope.detailMovie = res.data.movies
        }).catch(function (res) {
            console.log(res)
        })
    }
    $scope.load()

    function validateValue() {
        var error = false
        if (!$scope.detailMovie["name"]) {
            error = true
            alert("Input your movie's name")
        }
        return error
    }
    
    $scope.editMovie = function () {
            var error = validateValue(error)
            if (!error) {
                var formData = new FormData
                var id = document.getElementById("id").innerHTML

                var file = $('#files')[0].files[0];
                for (key in $scope.detailMovie) {
                    formData.append(key, $scope.detailMovie[key])
                }
                formData.append("id", id)
                if (file) {
                    formData.append('image', file)
                } else { 
                    file = undefined;
                }
                $http.put('/api/movie/editMovie', formData, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function () {
                    location.href = "/"
                }).catch(function (res) {
                    console.log(res)
                })
            }
        } 
    
    $scope.deleteMovie = function () {
        var email = document.getElementById("email").innerHTML
        var author = document.getElementById("author").value
        if (email === author) {
            var id = document.getElementById("id").innerHTML
            apiService.deleteMovie(id).then(function() {
                location.href = "/"
            }).catch(function () {
                alert("delete fail !")
            })

        } else {
            alert("You can't update for this movie.")
        }
    }
    function showFormEdit() {
        var x = document.getElementsByClassName("label-userprofile");
        var y = document.getElementsByClassName("input-userprofile");
        var btnEdit = document.getElementById("btnEdit");
        var btnCancel = document.getElementById("btnCancel");
        var changeButton = document.getElementById("change-button");
        var email = document.getElementById("email").innerHTML
        var author = document.getElementById("author").value
        if (email === author) {
            for(i=0; i < x.length; i++) {
                x[i].style.display = "none";
                y[i].style.display = "block";
            }
            btnEdit.style.display = "block";
            btnCancel.style.display = "block";
            changeButton.style.display = "block";
        } else {
            alert("You can't update for this movie.")
        }
    }
    function calcelFormEdit() {
        var x = document.getElementsByClassName("label-userprofile");
        var y = document.getElementsByClassName("input-userprofile");
        var btnEdit = document.getElementById("btnEdit");
        var btnCancel = document.getElementById("btnCancel");
        var changeButton = document.getElementById("change-button");

        for(i=0; i < x.length; i++) {
            x[i].style.display = "block";
            y[i].style.display = "none";
        }
        btnEdit.style.display = "none";
        btnCancel.style.display = "none";
        changeButton.style.display = "none";
    }
}])