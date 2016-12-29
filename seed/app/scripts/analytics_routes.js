function configState($stateProvider, $urlRouterProvider, $compileProvider, $urlMatcherFactoryProvider, $httpProvider) {

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
    .state('bitraz.main', {
      //Astract state is activated implicitly when one of its descendants are activated.
      abstract: true,
      //sticky state continue running even after it is "exited". controller of a Sticky State are retained.
      sticky: true,
      deepStateRedirect: true,
      views: {
        "header@bitraz": {
          templateUrl: "views/analytics/header.html",
          controller: "HeaderController"
        }
      }
    })
    // Dashboard - Main page
    .state('bitraz.main.index', {
      url: "/index",

      data: {
        pageTitle: 'Home',
        activeMenu:'home'
      },
      views: {
        "body@bitraz": {
          templateUrl: "views/analytics/index.html",
          controller: "HomeController"
        }
      }
    })
    .state('bitraz.main.analytics', {
      url: "/analytics",
      data: {
        pageTitle: 'Analytics',
        activeMenu:'analytics'
      },
      views: {
        "body@bitraz": {
          templateUrl: "views/analytics/analytics.html",
          controller: "AnalyticsController"
        }
      }
    })
    .state('bitraz.main.campaigns', {
      url: "/campaigns",
      data: {
        pageTitle: 'Campaigns',
        activeMenu:'campaigns'
      },
      views: {
        "body@bitraz": {
          templateUrl: "views/analytics/campaigns.html",
          controller: "CampaignsController"
        }
      }
    })
    .state('bitraz.main.users', {
      url: "/users",
      data: {
        pageTitle: 'Users',
        activeMenu:'users'
      },
      views: {
        "body@bitraz": {
          templateUrl: "views/analytics/users.html",
          controller: "UsersController"
        }
      }
    })
    .state('bitraz.main.archieves', {
      url: "/archieves",
      data: {
        pageTitle: 'Archieves',
        activeMenu:'archieves'
      },
      views: {
        "body@bitraz": {
          templateUrl: "views/analytics/archieves.html",
          controller: "ArchievesController"
        }
      }
    })
    .state('bitraz.main.settings', {
      url: "/settings",
      data: {
        pageTitle: 'Settings',
        activeMenu:'settings'
      },
      views: {
        "body@bitraz": {
          templateUrl: "views/analytics/settings.html",
          controller: "SettingsController"
        }
      }
    })
}

angular
  .module('bitraz')
  .config(configState)
  .run(function($rootScope, $state) {
    $rootScope.$state = $state;
  });