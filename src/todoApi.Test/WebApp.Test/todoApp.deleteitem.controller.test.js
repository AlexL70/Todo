describe('todoApp DeleteItemController', function () {
    beforeEach(module('todoControllers'));
    beforeEach(module('ui.router'));
    beforeEach(module(function ($stateProvider) {
        $stateProvider.state('list', { url: '/' });
    }));

    var $controller;
    var $scope;
    var $state;
    var $q;
    var mockService;
    var diCtrl;
    
    beforeEach(inject(function (_$controller_, _$q_, _$state_, $rootScope) {
        $controller = _$controller_;
        $q = _$q_;
        $state = _$state_;

        var item = {};
        item.data = {
            key: '3eb15c09-79c5-4cbf-b855-e34b8f1ec1d2',
            name: 'Feed dog',
            isComplete: false
        };

        mockService = {};
        mockService.Delete = function (key) {
            var deferred = $q.defer();
            var response;
            var f = function () {
                if (key == '3eb15c09-79c5-4cbf-b855-e34b8f1ec1d2') {
                    response = { Status: 204 };
                    deferred.resolve(response);
                }
                else {
                    response = { Status: 404, error: { message: "Item not found" } };
                    deferred.reject(response);
                }
            };
            f();

            return deferred.promise;
        };

        $scope = $rootScope.$new();
        diCtrl = $controller('DeleteItemController', { item: item, $scope: $scope, $state: $state, TodoAppService: mockService });
    }));

    it('should be defined', function () {
        expect(diCtrl).toBeDefined();
        expect(diCtrl.item).toBeDefined();
        expect(diCtrl.item.key).toEqual('3eb15c09-79c5-4cbf-b855-e34b8f1ec1d2');
        expect(diCtrl.item.name).toEqual('Feed dog');
        expect(diCtrl.item.isComplete).toBe(false);
    });

    it('item not found', function () {
        diCtrl.item.key = 'some piece of garbage';
        $scope.$apply();
        diCtrl.DeleteItem();
        $scope.$apply();
        expect(diCtrl.success).toBe(false);
    });

    it('success', function () {
        diCtrl.DeleteItem();
        $scope.$apply();
        expect(diCtrl.success).toBe(true);
        expect($state.is('list')).toBe(true);
    });

    it('cancel', function () {
        diCtrl.ComeBack();
        $scope.$apply();
        expect($state.is('list')).toBe(true);
    });
});
