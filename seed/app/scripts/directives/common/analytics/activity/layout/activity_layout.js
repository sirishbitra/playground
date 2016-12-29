angular.module("bitraz")
  .component("activityLayout", {
    templateUrl: "scripts/directives/common/analytics/activity/layout/activity_layout.html",
    bindings: {
      campaignId: "<"
    },
    controller: ["$scope", "$rootScope", "$uibModal", "$timeout", function ($scope, $rootScope, $uibModal, $timeout) {
    console.log('activity layout', $uibModal)

    }]
  });