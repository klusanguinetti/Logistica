(function () {
    'use strict';

    var serviceId = 'registracionService';
    angular.module('appPoderDeCompra').factory(serviceId, datacontext);

    datacontext.$inject = ['$http', '$q'];

    function datacontext($http, $q) {
        var service = {
            getViewModel: getViewModel,
            registracion: registracion
        };
        return service;

        function getViewModel() {
            var viewModel = $http({
                url: '/api/RegistracionApi/GetViewModel',
                method: 'get',
                params: {}
            });

            return $q.when(viewModel);
        }
        function registracion(vm) {
            var registracionData = $http({
                url: '/api/RegistracionApi/Registrarse',
                method: 'post',
                data: vm
            });

            return $q.when(registracionData);
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