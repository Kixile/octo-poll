app.controller('PollIdController', ['$scope', 'polls', '$routeParams', function($scope, polls, $routeParams) {
  polls.success(function(data) {	
	id = $routeParams.id;
	for(var k in data.polls) {
		if (data.polls[k].id == id) {
			$scope.detail = data.polls[k];
		}
	}	
  });
}]);
