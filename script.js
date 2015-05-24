var app = angular.module("octo-poll", []).
  config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/home',
    {
      templateUrl:    'home.html'
    });
    $routeProvider.when('/about',
    {
      templateUrl:    'about.html'
    });
    $routeProvider.when('/polls',
    {
      templateUrl:    'polls.html'
    });
    $routeProvider.when('/polls/:id', {
    	templateUrl:    'PollDetails.html',
      controller:     'PollIdController',
    	});    
    $routeProvider.otherwise(
    {
      redirectTo:     '/home'
    });
});

app.controller('NavCtrl', 
['$scope', '$location', function ($scope, $location) {
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
  };
  
  $scope.loadHome = function () {
        $location.url('/home');
    };
    
      $scope.loadAbout = function () {
        $location.url('/about');
    };
    
      $scope.loadPolls = function () {
        $location.url('/polls');
    };
    
}]);


app.controller('pollsJsonCtrl', ['$scope', 'polls', function($scope, polls) {
  polls.success(function(data) {
      $scope.allPolls = data;
  });
}]);

app.controller('PollsAddCtlr', ['$scope', '$http', function($scope,$http) {
   var counter=2;
   $scope.allAnswers = [{ id: '1' },{ id: '2' }];

   $scope.addAnswer = function($event){    
    counter++;    
    $scope.allAnswers.push({'id':counter});
    console.log($scope.allAnswers)
    $event.preventDefault();
   }
   $scope.send = function($event){
	   var Json = JSON.stringify({
			"question" : $scope.poll.question,
			"author" : $scope.poll.author,
			"answers" : $scope.allAnswers
	   });
     $http({
      method:'POST',
      url: 'resources/create_question.php',
      data: Json,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
     })
     .success(function(res){
      console.log(res);
     })
     .error(function(error){
      console.log(error);
     })
	   
   }
   
}]);


