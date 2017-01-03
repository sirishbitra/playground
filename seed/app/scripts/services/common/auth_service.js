
  angular.module('bitraz.auth', ["ngResource"])
    .service('AuthService', ["$resource", 'appConfig', function ($resource, appConfig) {
      return $resource(appConfig.apiEndPoint + '/rest-auth/login/', {}, {
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
          url: appConfig.apiEndPoint + '/auth/user/details'
        },
        updateDetails: {
          method: 'PUT',
          url: appConfig.apiEndPoint + '/auth/user/update/:id',
          params: {
            'id': '@id'
          }
        },
        logout: {
          method: 'post',
          url: appConfig.apiEndPoint + '/rest-auth/logout/'
        }
      }, {
        stripTrailingSlashes: false
      });
    }])


