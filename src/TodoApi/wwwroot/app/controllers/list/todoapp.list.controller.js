(function () {
    "use strict";

    angular.module('todoControllers')
    .controller('ListController', ListController);

    ListController.$inject = ['todoItems', '$state'];

    function ListController(todoItems, $state) {
        var lstCtrl = this;
        
        lstCtrl.itemsList = todoItems.data;

        lstCtrl.addNewItem = function () {
            $state.go('add');
        };
    }
})();