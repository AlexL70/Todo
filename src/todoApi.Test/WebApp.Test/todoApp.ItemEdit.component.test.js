describe('Todo item edit component', function () {
    var item;
    beforeEach(module('todoComponents'));

    describe('controller', function () {
        var $componentController, ctrl, fnSubmit, fnCancel;

        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;

            item = {
                key: "dfb5e3db-403e-4789-a92a-dddf4c67e8a6",
                name: "TestItem",
                isComplete: false
            };
            fnSubmit = jasmine.createSpy('submit');
            fnCancel = jasmine.createSpy('cancel');
            var bindings = {
                key: item.key,
                name: item.name,
                isComplete: item.isComplete,
                onSumbit: fnSubmit,
                onCancel: fnCancel,
                submitCaption: "Submit",
                cancelCaption: "Cancel",
                legend: "The legend"
            };
            ctrl = $componentController('cmpItemEdit', null, bindings);
        }));

        it('should expose item', function () {
            expect(ctrl).toBeDefined();
            expect(ctrl.name).toEqual("TestItem");
            expect(ctrl.key).toEqual("dfb5e3db-403e-4789-a92a-dddf4c67e8a6");
            expect(ctrl.isComplete).toBe(false);
        });

        it('should sumbit changes', function () {
            ctrl.name = "New name";
            ctrl.isComplete = true;
            var item = {
                key: ctrl.key,
                name: ctrl.name,
                isComplete: ctrl.isComplete
            };
            ctrl.onSumbit({ item: item });
            expect(fnSubmit).toHaveBeenCalled();
            expect(fnSubmit).toHaveBeenCalledWith({item: {
                key: "dfb5e3db-403e-4789-a92a-dddf4c67e8a6",
                name: "New name",
                isComplete: true
            }});
        });

        it('should call cancel method', function () {
            ctrl.onCancel();
            expect(fnCancel).toHaveBeenCalled();
        });
    });

    describe('vizualization', function () {
        beforeEach(module('testTemplates'));

        var element, $scope, $compile;

        beforeEach(inject(function ($rootScope, _$compile_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            element = angular.element('\
                <cmp-item-edit\
                    key="{{guid}}"\
                    name="itemName"\
                    is-complete="done"\
                    submit-caption="Submit"\
                    cancel-caption="Cancel"\
                    legend="The legend"> \
                </cmp-item-edit>\
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
            var legend = element.find('legend');
            expect(legend.text()).toBe('The legend');
            //console.log(element.html());
            var submit = element.find('button:first');
            var html = element.html().replace(/\s/g, '');
            expect(html).toContain('Submit</button>');
            expect(html).toContain('Cancel</button>');
        });
    });
});