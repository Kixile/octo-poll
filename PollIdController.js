app.controller('PollIdController', ['$scope', 'polls', '$routeParams', function($scope, polls, $routeParams) {
  polls.success(function(data) {
    $scope.detail = data[$routeParams.id];
  });
}]);
