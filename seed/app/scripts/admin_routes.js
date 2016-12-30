angular.module('routes', [
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
  'highcharts-ng',
  "bitraz.template"
]).config(["$stateProvider", "$httpProvider", "$compileProvider",
    "$urlRouterProvider", "$urlMatcherFactoryProvider",
    function ($stateProvider, $httpProvider, $compileProvider, $urlRouterProvider,
              $urlMatcherFactoryProvider) {

      // Optimize load start with remove binding information inside the DOM element
      // trailing slash in url is optional
      $urlMatcherFactoryProvider.strictMode(false);

      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      $httpProvider.defaults.withCredentials = true;
      // $httpProvider.interceptors.push('httpInterceptor');
      $httpProvider.useApplyAsync(true);

      $compileProvider.debugInfoEnabled(true);

      // Set default state
      $urlRouterProvider.otherwise("/index");
      $stateProvider
        .state('bitraz', {
          abstract: true,
          // add new module targets below. (each sticky child needs a dedicated target)
          template: '<div ui-view="header" class="header-container"></div><div ui-view="body"></div>',
          controller: "AppController"
        })
        .state('bitraz.admin', {
          //Astract state is activated implicitly when one of its descendants are activated.
          abstract: true,
          //sticky state continue running even after it is "exited". controller of a Sticky State are retained.
          sticky: true,
          deepStateRedirect: true,
          views: {
            "header@bitraz": {
              templateUrl: "views/admin/header.html",
              controller: "HeaderController"
            }
          }
        })
        // Dashboard - Main page
        .state('bitraz.admin.index', {
          url: "/index",

          data: {
            pageTitle: 'Home',
            activeMenu:'home'
          },
          views: {
            "body@bitraz": {
              templateUrl: "views/admin/index.html",
              controller: "HomeController"
            }
          }
        })
        .state('bitraz.admin.analytics', {
          url: "/analytics",
          data: {
            pageTitle: 'Analytics',
            activeMenu:'analytics'
          },
          views: {
            "body@bitraz": {
              templateUrl: "views/admin/analytics.html",
              controller: "AnalyticsController"
            }
          }
        })
        .state('bitraz.admin.campaigns', {
          url: "/campaigns",
          data: {
            pageTitle: 'Campaigns',
            activeMenu:'campaigns'
          },
          views: {
            "body@bitraz": {
              templateUrl: "views/admin/campaigns.html",
              controller: "CampaignsController"
            }
          }
        })
        .state('bitraz.admin.users', {
          url: "/users",
          data: {
            pageTitle: 'Users',
            activeMenu:'users'
          },
          views: {
            "body@bitraz": {
              templateUrl: "views/admin/users.html",
              controller: "UsersController"
            }
          }
        })
        .state('bitraz.admin.archieves', {
          url: "/archieves",
          data: {
            pageTitle: 'Archieves',
            activeMenu:'archieves'
          },
          views: {
            "body@bitraz": {
              templateUrl: "views/admin/archieves.html",
              controller: "ArchievesController"
            }
          }
        })
        .state('bitraz.admin.settings', {
          url: "/settings",
          data: {
            pageTitle: 'Settings',
            activeMenu:'settings'
          },
          views: {
            "body@bitraz": {
              templateUrl: "views/admin/settings.html",
              controller: "SettingsController"
            }
          }
        })
  }])
  .run(function($rootScope, $state) {
    $rootScope.$state = $state;
  });