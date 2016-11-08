(function () {
    "use strict";

    angular.module('todoControllers')
    .controller('NewItemController', NewItemController);

    NewItemController.$inject = ['TodoAppService', '$state'];

    function NewItemController(TodoAppService, $state) {
        var niCtrl = this;

        niCtrl.CreateNewItem = function (item) {
            TodoAppService.Create(item)
            .then(function (response) {
                niCtrl.success = true;
                niCtrl.NewItemKey = response.data.key;
                $state.go('list');
            })
            .catch(function (response) {
                niCtrl.success = false;
                niCtrl.ErrorMessage = response.status + ': ' + response.statusText;
            });
        };

        niCtrl.ComeBack = function () {
            $state.go('list');
        }
    }
})();