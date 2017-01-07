(function () {
    angular.module('bitraz', [
        "routes",
        "bitraz.controllers",
        "bitraz.services",
        "bitraz.directives",
        "bitraz.models"

    ]).constant('appConfig', {
        apps: (()=> {
            if (window.appConfig.env == 'prod') {
                return window.appConfig.appUrl || {admin: window.appConfig.apiUrl+'/Admin', analytics: window.appConfig.apiUrl+'/Analytics', landing: window.appConfig.apiUrl+'/Home'};
            } else if (window.appConfig.env == 'dev') {
                return {admin: (window.appConfig.appUrl && window.appConfig.appUrl.admin) || 'http://localhost:3301/admin/admin.html', analytics: (window.appConfig.appUrl && window.appConfig.appUrl.analytics) || 'http://localhost:3301/analytics/analytics.html', landing: (window.appConfig.appUrl && window.appConfig.appUrl.landing) || 'http://localhost:3301/index.html'};
            } else {
                return {admin: 'http://localhost:3301/admin.html', analytics: 'http://localhost:3301/analytics.html', landing: 'http://localhost:3301/index.html'};
            }
        })(),
        apiEndPoint: window.appConfig.env == 'local' ? 'http://192.168.1.66:3301' : (window.appConfig.apiUrl || 'http://192.168.1.66:3301'),
        userInfo: window.appConfig.userInfo || {},

            // apiEndPoint: 'http://192.168.1.64:8080'
    }).config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

})();

