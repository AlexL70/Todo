(function () {
    "use strict";

    angular.module('todoControllers')
    .controller('EditItemController', EditItemController);

    EditItemController.$inject = ['item', 'TodoAppService', '$state'];

    function EditItemController(item, TodoAppService, $state) {
        var eiCtrl = this;

        eiCtrl.item = item.data;

        eiCtrl.UpdateItem = function (item) {
            TodoAppService.Update(item)
            .then(function (response) {
                eiCtrl.success = true;
                $state.go('list');
            })
            .catch(function (response) {
                eiCtrl.success = false;
                eiCtrl.ErrorMessage = response.error.message;
            });
        };

        eiCtrl.ComeBack = function () {
            $state.go('list');
        };
    }
    
})();