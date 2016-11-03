describe('todo service', function () {
    var service;
    var $httpBackend;
    var ApiBasePath;

    beforeEach(function () {
        module('todoService');

        inject(function ($injector) {
            service = $injector.get('TodoAppService');
            $httpBackend = $injector.get('$httpBackend');
            ApiBasePath = $injector.get('ApiBasePath');
        });
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
        $httpBackend.whenGET(ApiBasePath).respond({});
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

    it('Create', function () {
        $httpBackend.whenPOST(ApiBasePath, {
            "name": "feed dog",
            "isComplete": true
        }).respond({
            "key": "81f40498-349d-47b6-8c44-e5f370c59c94",
            "name": "feed dog",
            "isComplete": true
        });
        service.Create({
            "name": "feed dog",
            "isComplete": true
        }).then(function (response) {
            expect(response.data).toEqual({
                "key": "81f40498-349d-47b6-8c44-e5f370c59c94",
                "name": "feed dog",
                "isComplete": true
            });
        });
    });

    it('Update', function () {
        $httpBackend.whenPUT(ApiBasePath + '/82fdc532-b643-4ba9-9aa8-42bff0f54315', {
            "key": "82fdc532-b643-4ba9-9aa8-42bff0f54315",
            "name": "feed fox",
            "isComplete": true
        }).respond({ Status: 204 });
        service.Update({
            "key": "82fdc532-b643-4ba9-9aa8-42bff0f54315",
            "name": "feed fox",
            "isComplete": true
        }).then(function (response) {
            expect(response.Status).toEqual(204);
        });
    });

    it('Delete', function () {
        $httpBackend.whenDELETE(ApiBasePath + '/82fdc532-b643-4ba9-9aa8-42bff0f54315')
            .respond({ Status: 204 });
        service.Delete('82fdc532-b643-4ba9-9aa8-42bff0f54315').then(function (response) {
            expect(response.Status).toEqual(204);
        });
    });
});