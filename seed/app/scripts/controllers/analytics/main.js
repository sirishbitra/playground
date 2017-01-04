/**
 *
 * appCtrl
 *
 */

angular
    .module('bitraz.controllers', [])
    .controller('appCtrl', appCtrl)
    .controller('AppController', AppController)
    .controller('HeaderController', HeaderController)
    .controller('HomeController', HomeController)
    .controller('AnalyticsController', AnalyticsController)
    .controller('CampaignsController', CampaignsController)
    .controller('UsersController', UsersController)
    .controller('ArchievesController', ArchievesController)
    .controller('SettingsController', SettingsController)


function AppController($http, $scope) {}
function HeaderController($rootScope, $scope, $state, AuthService, appConfig) {
  console.log('HeaderController', $state, AuthService, appConfig)
  $scope.active = $state.current.data.activeMenu;

  $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {
    $scope.active = toState.data.activeMenu;
  })
}
function HomeController($http, $scope) {}
function AnalyticsController($http, $scope, RidService, $state, $timeout) {
  $scope.rid = {};
  $scope.isLoaded = false;
  $scope.init = () => {
    $scope.rid.id = $state.params.rid || null;
    // $scope.hasAuthentication = false;
    // $scope.isAuthorized = false;

    // if($scope.rid.id){
    //   $scope.validateRid();
    // }else{
      $scope.isLoaded = true;
    //}
    
    
  };

  $scope.init();
}
function CampaignsController($http, $scope) {}
function ArchievesController($http, $scope) {}
function SettingsController($http, $scope) {}
function UsersController($http, $scope) {}
function appCtrl($http, $scope) {

  console.log($scope, $http)


}


