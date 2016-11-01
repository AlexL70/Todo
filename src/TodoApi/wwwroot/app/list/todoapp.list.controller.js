(function () {
    "use strict";

    angular.module('todoApp')
    .controller('listController', ListController);

    ListController.$inject = [];

    function ListController() {
        var lstCtrl = this;

        this.list = [];
    }
})();