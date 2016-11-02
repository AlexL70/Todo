(function () {
    "use strict";

    angular.module('todoApp')
    .component('loadingSpinner', {
        templateUrl: '/app/loading/loading.template.html',
        controller: LoadingSpinnerController
    });


    LoadingSpinnerController.$inject = ['$rootScope'];
    function LoadingSpinnerController($rootScope) {
        var $ctrl = this;
        var cancellers = [];

        $ctrl.$onInit = function () {
            var cancel = $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {
                $ctrl.showSpinner = true;
                console.log('show spinner');
            });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                $ctrl.showSpinner = false;
                console.log('hide spinner');
            });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                $ctrl.showSpinner = false;
                console.log('Navigation error occured: ', error);
            });
            cancellers.push(cancel);
        };

        $ctrl.$onDestroy = function () {
            cancellers.forEach(function (canceller) {
                canceller();
            });
        };
    }
})();