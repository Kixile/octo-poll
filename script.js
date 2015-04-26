var app = angular.module("octo-poll", ['directive.g+signin']).
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

    $scope.$on('event:google-plus-signin-success', function (event,authResult) {
    // Send login to server or save into cookie
  });
  $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
    // Auth failure or signout detected
  });
    
}]);

app.controller('AboutCtrl', function($scope, $compile) {
  console.log('inside about controller');

});

app.controller('HomeCtrl', function($scope, $compile) {
  console.log('inside home controller');

});

app.controller('PollsCtrl', function($scope, $compile) {
  console.log('inside poll controller');

});

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


