describe('dotoApp ListController', function () {
    beforeEach(module('todoControllers'));
    beforeEach(module('ui.router'));
    beforeEach(module(function ($stateProvider) {
        $stateProvider.state('list', { url: '/' });
        $stateProvider.state('add', { url: '/new' });
    }));

    var $controller;
    var $scope;
    var $state;
    var mockService;
    var lstCtrl;
    var todoItems;

    beforeEach(inject(function (_$controller_, _$state_, $rootScope) {
        $controller = _$controller_;
        $state = _$state_;
        $scope = $rootScope.$new();

        todoItems = {};
        todoItems.data = [
            { key: '58eef55a-6c5c-4c24-b742-8ba56656e5f4', name: 'Item1', isComplete: true },
            { key: '05a768df-c858-4024-86c7-8e1b5953982c', name: 'Item2', isComplete: false }
        ];

        lstCtrl = $controller('ListController', {todoItems: todoItems, $state: $state});
    }));

    it('should expose data', function () {
        expect(lstCtrl).toBeDefined();
        expect(lstCtrl.itemsList).toBeDefined();
        expect(lstCtrl.itemsList[0].name).toEqual('Item1');
        expect(lstCtrl.itemsList[1].key).toEqual('05a768df-c858-4024-86c7-8e1b5953982c');
    });

    it('should switch to add state', function () {
        lstCtrl.addNewItem();
        $scope.$apply();
        expect($state.$current.name).toEqual('add');
    });
});
