(function () {
    "use strict";

    angular.module('todoApp')
    .controller('mainController', MainController);

    MainController.$inject = [];

    function MainController() {
        var main = this;

        main.caption = 'Todo application.'
    }
})();