(function () {
    "use strict";

    angular.module('todoApp')
    .controller('listController', ListController);

    ListController.$inject = [];

    function ListController() {
        lstCtrl = this;

        this.list = [];
    }
})();