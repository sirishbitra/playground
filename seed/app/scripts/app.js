(function () {
    angular.module('bitraz', [
        "routes",
        "bitraz.controllers",
        "bitraz.services",
        "bitraz.directives",
        "bitraz.models"

    ]).constant('appConfig', {
            apiEndPoint: 'http://192.168.1.66:3301'
            // apiEndPoint: 'http://192.168.1.64:8080'
    }).config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);
})();

