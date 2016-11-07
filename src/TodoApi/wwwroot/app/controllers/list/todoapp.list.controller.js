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

        lstCtrl.Update = function (key) {
            $state.go('edit', { id: key });
        };

        lstCtrl.Delete = function (key) {
            $state.go('delete', { id: key });
        };
    }
})();