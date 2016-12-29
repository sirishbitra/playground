(function () {
    angular.module('bitraz', [
        "ui.router",
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngSanitize',
        'ngTouch',               // Angular flexible routing
        'ui.bootstrap',             // AngularJS native directives for Bootstrap
        'ui.grid',
        'ui.bootstrap.modal',
        'ui.bootstrap.tpls',
        'daterangepicker',
        'highcharts-ng'
    ]).constant('appConfig', {
            apiEndPoint: 'http://192.168.1.66:3301'
            // apiEndPoint: 'http://192.168.1.64:8080'
    }).config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);
})();

