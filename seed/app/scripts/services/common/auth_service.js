
  angular.module('bitraz.auth', ["ngResource"])
    .service('AuthService', ["$resource", 'appConfig', function ($resource, appConfig) {
      return $resource(appConfig.apiEndpoint + '/rest-auth/login/', {}, {
        login: {
          method: 'post',
          stripTrailingSlashes: false,
          data: {
            username: '@username',
            password: '@password'
          }
        },
        details: {
          method: 'get',
          url: appConfig.apiEndpoint + '/auth/user/details'
        },
        updateDetails: {
          method: 'PUT',
          url: appConfig.apiEndpoint + '/auth/user/update/:id',
          params: {
            'id': '@id'
          }
        },
        logout: {
          method: 'post',
          url: appConfig.apiEndpoint + '/rest-auth/logout/'
        }
      }, {
        stripTrailingSlashes: false
      });
    }])


