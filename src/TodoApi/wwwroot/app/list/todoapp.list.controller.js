(function () {
    "use strict";

    angular.module('todoApp')
    .controller('ListController', ListController);

    ListController.$inject = ['todoItems'];

    function ListController(todoItems) {
        var lstCtrl = this;
        
        lstCtrl.itemsList = todoItems.data;
    }
})();