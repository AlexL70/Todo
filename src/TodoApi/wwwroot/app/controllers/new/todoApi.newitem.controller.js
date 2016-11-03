(function () {
    "use strict";

    angular.module('todoControllers')
    .controller('NewItemController', NewItemController);

    NewItemController.$inject = ['TodoAppService'];

    function NewItemController(TodoAppService) {
        var niCtrl = this;

        niCtrl.NewItem = { name: '', isComplete: false };

        niCtrl.CreateNewItem = function() {
            TodoAppService.Create(niCtrl.NewItem)
            .then(function (response) {
                niCtrl.success = true;
                niCtrl.NewItem.key = response.data.key;
            })
            .catch(function (response) {
                niCtrl.success = false;
                niCtrl.ErrorMessage = response.error.message;
            });
        }
    }
})();