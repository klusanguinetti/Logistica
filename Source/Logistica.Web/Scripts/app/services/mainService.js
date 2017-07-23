(function () {
    'use strict';

    var serviceId = 'mainService';
    angular.module('appPoderDeCompra').factory(serviceId, datacontext);

    datacontext.$inject = ['$http', '$q'];

    function datacontext($http, $q) {


        var service = {
            getMenu: getMenu,
            getMenuHeader: getMenuHeader
        };

        return service;

        function getMenu() {
            var data = $http({
                url: '/api/Common/GetMenu',
                method: 'get',
                params: {}
            });

            return $q.when(data);
        }

        function getMenuHeader() {
            var data = $http({
                url: '/api/Common/GetHeaderMenu',
                method: 'get',
                params: {}
            });

            return $q.when(data);
        }

      
    }
})();