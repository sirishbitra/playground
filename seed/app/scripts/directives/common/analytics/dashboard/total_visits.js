angular.module("bitraz.dashboard")
  .component("totalVisits", {
    templateUrl: "views/common/dashboard/total_visits_tmpl.html",
    bindings: {
      data: "<"
    },
    controller: ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope, $timeout) {
      var $ctrl = this;

    }]
  });