(function () {
    "use strict";

    angular.module('todoApp')
    .controller('MainController', MainController);

    MainController.$inject = [];

    function MainController() {
        var main = this;

        main.caption = 'Todo Application'
    }
})();