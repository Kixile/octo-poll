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

});

app.controller('PollsCtrl', function($scope, $compile) {
  console.log('inside poll controller');

});

app.controller('pollsJsonCtrl', ['$scope', 'polls', function($scope, polls) {
  polls.success(function(data) {
      $scope.allPolls = data;
  });
}]);

app.controller('PollsAddController', function() {
    this.poll;
        this.poll_clean = {};

        this.addPoll = function() {
            this.poll_clean.question = this.poll.question;
            this.poll_clean.author = this.poll.author;
            this.poll_clean.description = "Just a static at the moment.";
            this.poll_clean.date = Date.now();
            this.poll_clean.id = polls.length;
            this.poll_clean.multi = this.poll.multi;
            this.poll_clean.users = this.poll.users;

            var raw_options = [this.poll.a1,this.poll.a2,this.poll.a3,this.poll.a4,this.poll.a5,this.poll.a6,this.poll.a7,this.poll.a8];
            var clean = new Array();
            var seen = {};
            var j = 0;
            for(var i = 0; i<8; i++){
                if (raw_options[i]){
                    var item = raw_options[i];
                    if(seen[item] !== 1) {
                        seen[item] = 1;
                        clean[j++] = item;
                    }
                }
            }
            this.poll_clean.options = clean;
            polls.push(this.poll_clean);
            this.poll={};
        };
    });

    app.controller('PollsController', function(){
        this.polls = polls;
    });

    var polls = [
        {
            question: 'How do we get end-users?',
            author: 'admin',
            description: 'What are your suggestions on this topic.',
            date: 1288323623006,
            options: [],
            multi:false,
            users:true,
            id: 0
        },
        {
            question: 'How we become popular?',
            author: 'admin',
            description: 'Pick strategy what will help us the most.',
            date: 1288323623006,
            options: ["adds","spam mail","find sponsors"],
            multi:true,
            users:false,
            id: 1
        },
        {
            question: 'What other poll creation tools you use?',
            author: 'admin',
            description: 'Select one or more options that you use.',
            date: 1288323623006,
            options: ['poll-maker','asypolls','pollcode','strawpoll','surveymonkey'],
            multi:false,
            users:true,
            id: 3
        }
    ];
