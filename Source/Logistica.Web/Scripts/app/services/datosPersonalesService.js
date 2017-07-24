(function () {
    'use strict';

    var serviceId = 'datosPersonalesService';
    angular.module('appPoderDeCompra').factory(serviceId, datacontext);

    datacontext.$inject = ['$http', '$q'];

    function datacontext($http, $q) {

        var service = {
            getDatosPersonales: getDatosPersonales
        };

        return service;

        function getDatosPersonales() {
            var consultaHabilitacionProdResponse = $http({
                url: '/api/DatosPersonalesApi/GetDatosPersonales',
                method: 'get',
                params: {}
            });
            
            return $q.when(consultaHabilitacionProdResponse);
        }

       
    }
})();