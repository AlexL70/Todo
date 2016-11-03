(function () {
    "use strict";

    angular.module('todoComponents')
    .component('cmpItemEdit', {
        templateUrl: '/app/components/itemedit/todoApp.itemedit.template.html',
        bindings: {
            key: '@',
            name: '<',
            isComplete: '<',
            onSubmit: '&',
            onCancel: '&',
            submitCaption: '@',
            cancelCaption: '@',
            legend: '@'
        }
    });
})();