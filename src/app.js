angular.module('app', ['backend', 'nvd3ChartDirectives'])
    .controller('ctrl', function (backend) {
        var that = this;
        backend.loadGoldPrice(function (data) {
            that.gold = data;
        });
    });