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
            for(var i = 0; i<8; i++){
                if (raw_options[i]){
                    clean.push(raw_options[i]);
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
})();