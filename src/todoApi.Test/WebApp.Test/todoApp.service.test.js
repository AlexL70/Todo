describe('todo service', function () {
    var service;
    var $httpBackend;
    var ApiBasePath;

    beforeEach(function () {
        module('todoApp');

        inject(function ($injector) {
            service = $injector.get('TodoAppService');
            $httpBackend = $injector.get('$httpBackend');
            ApiBasePath = $injector.get('ApiBasePath');
        });
    });

    beforeEach(function () {
        $httpBackend.whenGET('/app/list/todoapi.list.html').respond('');
    });

    it('GetAll', function () {
        $httpBackend.whenGET(ApiBasePath).respond([{
            "key": "6a47995d-2e67-47a2-9ac5-ec4b2c4d3ccb",
            "name": "Item 1",
            "isComplete": false
        }]);
        service.GetAll().then(function (response) {
            expect(response.data).toEqual([{
                "key": "6a47995d-2e67-47a2-9ac5-ec4b2c4d3ccb",
                "name": "Item 1",
                "isComplete": false
            }]);
        });
        $httpBackend.flush();
    });

    it('GetTodo', function () {
        $httpBackend.whenGET(ApiBasePath + '/969ec3af-e93f-4a0e-938e-f4441404e99a').respond({
                "key": "969ec3af-e93f-4a0e-938e-f4441404e99a",
                "name": "Item 1",
                "isComplete": false
        });
        service.GetTodo('969ec3af-e93f-4a0e-938e-f4441404e99a').then(function (response) {
            expect(response.data).toEqual({
                "key": "969ec3af-e93f-4a0e-938e-f4441404e99a",
                "name": "Item 1",
                "isComplete": false
            });
        });
        $httpBackend.flush();
    });
});