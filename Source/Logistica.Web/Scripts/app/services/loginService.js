(function () {
    'use strict';

    var serviceId = 'loginService';
    angular.module('appPoderDeCompra').factory(serviceId, datacontext);

    datacontext.$inject = ['$http', '$q'];

    function datacontext($http, $q) {
        var service = {
            doLogin: doLogin,
            doLogout: doLogout,
            getUserLogued: getUserLogued,
            validateRequest: validateRequest
        };
        return service;

        function doLogin(user, password) {
            var loginData = $http({
                url: '/api/LoginApi/DoLogin',
                method: 'post',
                data: {
                    Name: user,
                    Password: password
                }
            });

            return $q.when(loginData);
        }
        function doLogout() {
            var logoutData = $http({
                url: '/api/LoginApi/DoLogout',
                method: 'get',
                params: {}
            });

            return $q.when(logoutData);
        }
        function getUserLogued() {
            var data = $http({
                url: '/api/LoginApi/GetUserLogued',
                method: 'get',
                params: {}
            });

            return $q.when(data);
        }
        function validateRequest() {
            var data = $http({
                url: '/api/LoginApi/ValidateRequest',
                method: 'get',
                params: {}
            });

            return $q.when(data);
        }
    }
    
})();