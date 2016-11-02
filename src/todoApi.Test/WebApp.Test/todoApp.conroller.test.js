describe('todoApp.MainController', function () {
    beforeEach(module('todoApp'));
    var $controller;
    var mainController;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;

        //  Skip injecting service

        mainController = $controller('MainController', {});
    }));

    it('caption', function () {
        expect(mainController).toBeDefined();
        expect(mainController.caption).toEqual('Todo Application');
    });
});