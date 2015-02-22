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

    var gems = [
        {
            name: 'Dodecahedron',
            price: 2.95,
            description: '. . .',
            canPurchase: true
        },
        {
            name: 'Pentagonal Gem',
            price: 5.95,
            description: '. . .',
            canPurchase: true
        }
    ];
})();

