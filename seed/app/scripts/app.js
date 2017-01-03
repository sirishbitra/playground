(function () {
    console.log(window.appConfig.apiUrl)
    angular.module('bitraz', [
        "routes",
        "bitraz.controllers",
        "bitraz.services",
        "bitraz.directives",
        "bitraz.models"

    ]).constant('appConfig', {
            apiEndPoint: window.appConfig.env == 'local' ? 'http://192.168.1.66:3301': (window.appConfig.apiUrl || 'http://192.168.1.66:3301'),
            userInfo: window.appConfig.userInfo || {}
            // apiEndPoint: 'http://192.168.1.64:8080'
    }).config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

})();

