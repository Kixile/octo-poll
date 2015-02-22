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

    app.controller('PollsController', function(){
        this.polls = polls;
    });

    var polls = [
        {
            question: 'How do we get end-users?',
            author: 'admin',
            description: 'What are your suggestions on this topic.',
            type: 1,
            date: 1288323623006,
            options: []
        },
        {
            question: 'How we become popular?',
            author: 'admin',
            description: 'Pick strategy what will help us the most.',
            type: 2,
            date: 1288323623006,
            options: ["adds","spam mail","find sponsors"]
        },
        {
            question: 'What other poll creation tools you use?',
            author: 'admin',
            description: 'Select one or more options that you use.',
            type: 3,
            date: 1288323623006,
            options: ['poll-maker','asypolls','pollcode','strawpoll','surveymonkey']
        }
    ];
})();

