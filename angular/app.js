/**
 * Created by Innar Hallik on 21.02.2015.
 */
(function(){
    var app = angular.module('octo-poll',[]);

    app.controller('PanelController', function(){
        this.tab = 1;

        this.setTab = function(newValue){
            this.tab = newValue;
        };

        this.isSet = function(tabName){
            return this.tab === tabName;
        };
    });

    app.controller('ShowController', function(){
        this.showPoll = {};
        this.answers = {};
        this.active = false;

        this.setPoll = function(newValue){
            this.showPoll = newValue;
            this.answers = {};
            this.active = true;
        };

        this.clear = function(){
            this.active = false;
            this.answers = {};
        };

        this.isSet = function(){
            return this.active;
        };

        this.optionsType = function(){
            if (this.showPoll.multi){
                return "checkbox";
            }else{
                return "radio";
            }

        };
    });

	app.controller('PollsAddController', function() {
		this.poll;
        this.addPoll = function() {
            this.poll.date = Date.now();
            this.poll.id = 5;
            polls.push(this.poll);
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
})();