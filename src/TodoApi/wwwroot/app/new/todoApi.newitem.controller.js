(function () {
    "use strict";

    angular.module('todoApp')
    .controller('NewItemController', NewItemController);

    NewItemController.$inject = ['TodoAppService'];

    function NewItemController(TodoAppService) {
        var naCtrl = this;

        this.item = { name: '', isComplete: false};
    }
})();