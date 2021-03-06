﻿describe('Todo item view component', function () {
    var item;
    beforeEach(module('todoComponents'));

    describe('controller', function () {
        var $componentController, ctrl, fnUpdate, fnDelete;

        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;

            item = {
                key: "dfb5e3db-403e-4789-a92a-dddf4c67e8a6",
                name: "TestItem",
                isComplete: false
            };
            fnUpdate = jasmine.createSpy('onUpdate');
            fnDelete = jasmine.createSpy('onDelete');
            var bindings = {
                key: item.key,
                name: item.name,
                isComplete: item.isComplete,
                onUpdste: fnUpdate,
                onDelete: fnDelete
            };
            ctrl = $componentController('cmpItemView', null, bindings);
        }));

        it('should expose item', function () {
            expect(ctrl).toBeDefined();
            expect(ctrl.name).toEqual('TestItem');
            expect(ctrl.key).toEqual('dfb5e3db-403e-4789-a92a-dddf4c67e8a6');
            expect(ctrl.isComplete).toBe(false);
        });

        it('on delete', function () {
            ctrl.onDelete({ key: ctrl.key });
            expect(fnDelete).toHaveBeenCalled();
            expect(fnDelete).toHaveBeenCalledWith({ key: 'dfb5e3db-403e-4789-a92a-dddf4c67e8a6' });
        });

        it('on edit', function () {
            ctrl.onUpdste({ key: ctrl.key });
            expect(fnUpdate).toHaveBeenCalled();
            expect(fnUpdate).toHaveBeenCalledWith({ key: 'dfb5e3db-403e-4789-a92a-dddf4c67e8a6' });
        });
    });

    describe('visualization', function () {
        beforeEach(module('testTemplates'));

        var element, $scope, $compile;

        beforeEach(inject(function ($rootScope, _$compile_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            element = angular.element('\
                <cmp-item-view \
                    key="{{guid}}"\
                    name="itemName"\
                    is-complete="done" \
                    >\
                </cmp-item-view>\
                ');
            element = $compile(element)($scope);
            item = {
                key: "dfb5e3db-403e-4789-a92a-dddf4c67e8a6",
                name: "TestItem",
                isComplete: false
            };
            $scope.guid = item.key;
            $scope.itemName = item.name;
            $scope.done = item.isComplete;
            $scope.$apply();
        }));
        it('should render template', function () {
            var h3 = element.find('h3');
            expect(h3.text()).toBe('TestItem');
        });
        it('should reflect changes', function () {
            $scope.itemName = "New item name";
            $scope.$apply();
            var h3 = element.find('h3');
            expect(h3.text()).toBe('New item name');
        });
    });
});