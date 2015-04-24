app.factory('polls', ['$http', function($http) {
    return $http.get('https://octo-poll.herokuapp.com/user_questions.php?callback=JSON_CALLBACK')
        .success(function(data) {
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);