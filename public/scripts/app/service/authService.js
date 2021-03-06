app.factory('authService', ['$rootScope', '$http', '$q', 'localStorageService', function($rootScope, $http, $q, localStorageService) {

    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false,
        userRoles: []
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var _login = function(loginData) {

        var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post("/api/login", data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {

            localStorageService.set('authorizationData', {
                token: response.token
            });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.useRefreshTokens = loginData.useRefreshTokens;

            $rootScope.user = response;

            deferred.resolve(response);

        }).error(function(err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function() {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;

    };

    var _fillAuthData = function() {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
            _authentication.userRoles = authData.userRoles;
        }

    };

    var _refreshToken = function() {
        var deferred = $q.defer();

        //     var authData = localStorageService.get('authorizationData');
        // 
        //     if (authData) {
        // 
        //       if (authData.useRefreshTokens) {
        // 
        //         var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;
        // 
        //         localStorageService.remove('authorizationData');
        // 
        //         $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
        // 
        //           localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
        // 
        //           deferred.resolve(response);
        // 
        //         }).error(function (err, status) {
        //           _logOut();
        //           deferred.reject(err);
        //         });
        //       }
        //     }

        return deferred.promise;
    };

    var _obtainAccessToken = function(externalData) {

        var deferred = $q.defer();

        //     $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {
        // 
        //       localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });
        // 
        //       _authentication.isAuth = true;
        //       _authentication.userName = response.userName;
        //       _authentication.useRefreshTokens = false;
        // 
        //       deferred.resolve(response);
        // 
        //     }).error(function (err, status) {
        //       _logOut();
        //       deferred.reject(err);
        //     });

        return deferred.promise;

    };

    var _registerExternal = function(registerExternalData) {

        var deferred = $q.defer();

        //     $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {
        // 
        //       localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });
        // 
        //       _authentication.isAuth = true;
        //       _authentication.userName = response.userName;
        //       _authentication.useRefreshTokens = false;
        // 
        //       $rootScope.userRoles = response.userRoles;
        // 
        //       deferred.resolve(response);
        // 
        //     }).error(function (err, status) {
        //       _logOut();
        //       deferred.reject(err);
        //     });

        return deferred.promise;

    };

    //authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
}]);
