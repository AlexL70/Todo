describe('todoApp EditItemController', function () {
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
    var eiCtrl;

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
        mockService.Update = function (todo) {
            var deferred = $q.defer();
            var response;
            var f = function () {
                if (!todo) {
                    response = { Status: 400, error: { message: "No item provided" } };
                    deferred.reject(response);
                } else if (!todo.name) {
                    response = { Status: 400, error: { message: "Item name cannot be empty" } };
                    deferred.reject(response);
                } else if(todo.key != item.data.key) {
                    response = { Status: 404, error: { message: "Item not found"} };
                    deferred.reject(response);
                }
                else {
                    response = { Status: 201, data: todo };
                    deferred.resolve(response);
                }
            };
            f();

            return deferred.promise;
        };

        $scope = $rootScope.$new();
        eiCtrl = $controller('EditItemController', { item: item, $scope: $scope, $state: $state, TodoAppService: mockService });
    }));

    it('should be definec', function () {
        expect(eiCtrl).toBeDefined();
        expect(eiCtrl.item).toBeDefined();
        expect(eiCtrl.item.key).toEqual('3eb15c09-79c5-4cbf-b855-e34b8f1ec1d2');
        expect(eiCtrl.item.name).toEqual('Feed dog');
        expect(eiCtrl.item.isComplete).toBe(false);
    });

    it('no item', function () {
        eiCtrl.UpdateItem();
        $scope.$apply();
        expect(eiCtrl.success).toBe(false);
        expect(eiCtrl.ErrorMessage).toEqual('No item provided');
    });

    it('no item name', function () {
        var item = {
            key: eiCtrl.item.key,
            name: '',
            isComplete: false
        };
        eiCtrl.UpdateItem(item);
        $scope.$apply();
        expect(eiCtrl.success).toBe(false);
        expect(eiCtrl.ErrorMessage).toEqual('Item name cannot be empty');
    });

    it('item not found', function () {
        var item = {
            key: '3eb15c09-79c5-b855-4cbf-e34b8f1ec1d2',
            name: 'New name',
            isComplete: false
        };
        eiCtrl.UpdateItem(item);
        $scope.$apply();
        expect(eiCtrl.success).toBe(false);
        expect(eiCtrl.ErrorMessage).toEqual('Item not found');
    });

    it('success', function () {
        var item = {
            key: eiCtrl.item.key,
            name: 'New name',
            isComplete: true
        };
        eiCtrl.UpdateItem(item);
        $scope.$apply();
        expect(eiCtrl.success).toBe(true);
        expect($state.is('list')).toBe(true);
    });

    it('cancel', function () {
        eiCtrl.ComeBack();
        $scope.$apply();
        expect($state.$current.name).toEqual('list');
    });
});