describe('todoApp NewItemController', function () {
    beforeEach(module('todoControllers'));
    beforeEach(module('ui.router'));
    beforeEach(module(function ($stateProvider) {
        $stateProvider.state('list', { url: '/' });
        $stateProvider.state('new', { url: '/new' });
    }));

    var $controller;
    var $scope;
    var $state;
    var mockService;
    var niCtrl;

    beforeEach(inject(function (_$controller_, _$q_, _$state_, $rootScope) {
        $controller = _$controller_;
        $q = _$q_;
        $state = _$state_

        mockService = {};
        mockService.Create = function (todo) {
            var deferred = $q.defer();
            var response;
            var f = function () {
                if (!todo) {
                    response = { Status: 400, error: { message: "No item provided" } };
                    deferred.reject(response);
                } else if (!todo.name) {
                    response = { Status: 400, error: { message: "Item name cannot be empty" } };
                    deferred.reject(response);
                } else {
                    todo.key = "3eb15c09-79c5-4cbf-b855-e34b8f1ec1d2";
                    response = { Status: 201, data: todo };
                    deferred.resolve(response);
                }
            };
            f();
            return deferred.promise;
        };

        $scope = $rootScope.$new();
        niCtrl = $controller('NewItemController', { $scope: $scope, $state: $state, TodoAppService: mockService });
    }));

    it('no item', function () {
        niCtrl.CreateNewItem();
        $scope.$apply();
        expect(niCtrl.success).toBe(false);
        expect(niCtrl.ErrorMessage).toEqual("No item provided");
    });

    it('no item name', function () {
        var newItem = { name: '', isComisComplete: false };
        niCtrl.CreateNewItem(newItem);
        $scope.$apply();
        expect(niCtrl.success).toBe(false);
        expect(niCtrl.ErrorMessage).toBe("Item name cannot be empty");
    });

    it('success', function () {
        var newItem = { name: 'new item', isComisComplete: false };
        niCtrl.CreateNewItem(newItem);
        $scope.$apply();
        expect(niCtrl.success).toBe(true);
        expect(niCtrl.NewItemKey).toEqual("3eb15c09-79c5-4cbf-b855-e34b8f1ec1d2");
        expect($state.is('list')).toBe(true);
    })

    it('cancel', function () {
        niCtrl.ComeBack();
        $scope.$apply();
        expect($state.$current.name).toEqual('list');
        //expect($state.is('list')).toBe(true);
    });
});