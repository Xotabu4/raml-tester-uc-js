angular.module('httpReal', ['ng'])
    .config(['$provide', function ($provide) {
        $provide.decorator('$httpBackend', function () {
            return angular.injector(['ng']).get('$httpBackend');
        });
    }])
    .service('httpReal', ['$rootScope', function ($rootScope) {
        this.submit = function () {
            $rootScope.$digest();
        };
    }]);

describe('backend', function () {
    var backend, $httpBackend, httpReal;
    beforeAll(function (done) {
        RAML.tester.addJasmineMatchers();
        RAML.tester.reload(done);
    });
    beforeEach(module('backend', 'httpReal', 'ngMockE2E'));
    beforeEach(inject(function (_backend_, $injector, _httpReal_) {
        backend = _backend_;
        $httpBackend = $injector.get('$httpBackend');
        httpReal = _httpReal_;
        $httpBackend.whenGET('http://localhost:8090/gold-price').passThrough();
    }));
    beforeEach(RAML.tester.clearReports);
    afterEach(function (done) {
        RAML.tester.reports(function (reports) {
            expect(reports['raml-tester-uc-js']).toHaveNoViolations();
            done();
        });
    });

    it('should have been injected', function () {
        expect(backend).not.toBeUndefined();
    });

    it('should call the server', function (done) {
        backend.loadGoldPrice(function (data) {
            expect(data[0].key).toBe('Gold');
            done();
        });
        httpReal.submit();
    });

    it('should use all RAML elements', function (done) {
        RAML.tester.usage(function (usage) {
            expect(usage['raml-tester-uc-js'].unused).toEqual({});
            done();
        });
    });
});