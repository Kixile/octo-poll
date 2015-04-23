// Code goes here
(function(){
var app = angular.module("octo-poll", []).
  config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/home',
    {
      templateUrl:    'home.html',
      controller:     'HomeCtrl'
    });
    $routeProvider.when('/about',
    {
      templateUrl:    'about.html',
      controller:     'AboutCtrl'
    });
    $routeProvider.when('/polls',
    {
      templateUrl:    'polls.html',
      controller:     'PollsCtrl'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/home',
      controller:     'HomeCtrl', 
    }
  );
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

app.controller('AboutCtrl', function($scope, $compile) {
  console.log('inside about controller');

});

app.controller('HomeCtrl', function($scope, $compile) {
	console.log('inside home controller');
	
	$scope.clear = function () {
        $scope.polls={};
    };

});

app.controller('PollsCtrl', function($scope, $compile) {
  console.log('inside poll controller');

});

app.controller('pollsJsonCtrl', function($scope, $http) {
	$http.get('https://octo-poll.herokuapp.com/user_questions.php').then(function(res){
		$scope.pollsJson = res.data;  
		console.log('load json');		  
        });
	});

})();