/**
 *
 * appCtrl
 *
 */

angular
    .module('bitraz')
    .controller('appCtrl', appCtrl)
    .controller('AppController', AppController)
    .controller('HeaderController', HeaderController)
    .controller('HomeController', HomeController)
    .controller('ClientController', ClientController)
    .controller('ContactController', ContactController)
    .controller('FeatureController', FeatureController)
    .controller('LoginController', LoginController);


function AppController($http, $scope) {}

function ClientController($http, $scope) {}
function ContactController($http, $scope) {}
function LoginController($http, $scope) {}
function HeaderController($rootScope, $scope, $state) {
  console.log('HeaderController', $state)
  $scope.active = $state.current.data.activeMenu;

  $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {
    $scope.active = toState.data.activeMenu;
  })
}
function FeatureController($http, $scope) {}
function HomeController($http, $scope) {}
function appCtrl($http, $scope) {
  console.log($scope, $http)
}


