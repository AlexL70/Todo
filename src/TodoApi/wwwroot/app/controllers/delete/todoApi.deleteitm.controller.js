(function () {
    "use strict";

    angular.module('todoControllers')
    .controller('DeleteItemController', DeleteItemController);

    DeleteItemController.$inject = ['item', 'TodoAppService', '$state'];

    function DeleteItemController(item, TodoAppService, $state) {
        var diCtrl = this;

        diCtrl.item = item.data;

        diCtrl.DeleteItem = function () {
            TodoAppService.Delete(diCtrl.item.key)
            .then(function (response) {
                diCtrl.success = true;
                $state.go('list');
            })
            .catch(function (response) {
                diCtrl.success = false;
                diCtrl.ErrorMessage = response.error.message;
            });
        };

        diCtrl.ComeBack = function () {
            $state.go('list');
        };
    }
})();