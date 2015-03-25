angular.module('backend', [])
    .service('backend', function ($http) {
        this.loadGoldPrice = function (callback) {
            $http.get('http://localhost:8090/gold-price')
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    alert('Could not load data, is proxy running?');
                });
        }
    });