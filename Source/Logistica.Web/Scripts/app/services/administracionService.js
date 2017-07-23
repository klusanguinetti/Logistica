(function () {
    'use strict';

    var serviceId = 'administracionService';
    angular.module('appPoderDeCompra').factory(serviceId, datacontext);

    datacontext.$inject = ['$http', '$q'];

    function datacontext($http, $q) {

        var service = {
            consultaHabilitacionProd: consultaHabilitacionProd,
            setHabilitationProd: setHabilitationProd,
            bajaSuscribirPoderDeCompra: bajaSuscribirPoderDeCompra,
            altaSuscribirPoderDeCompra: altaSuscribirPoderDeCompra
        };

        return service;

        function consultaHabilitacionProd() {
            var consultaHabilitacionProdResponse = $http({
                url: '/api/AdministracionApi/ConsultaHabilitacionProd',
                method: 'get',
                params: {}
            });

            return $q.when(consultaHabilitacionProdResponse);
        }

        function setHabilitationProd(datosHabilitacionProd) {
            var setHabilitationProdResponse = $http({
                url: '/api/AdministracionApi/SetHabilitationProd',
                method: 'post',
                data: datosHabilitacionProd
            });

            return $q.when(setHabilitationProdResponse);
        }


        function altaSuscribirPoderDeCompra(nup, codigoMoneda, tipoCtaOperativa, nroCtaOperativa, sucursalCtaOperativa, cuentaTitulos, motivo, denominacion) {
            var suscriptionData = $http({
                url: '/api/AdministracionApi/AltaSuscribirPoderDeCompra',
                method: 'get',
                params: {
                    nup: nup,
                    codigoMoneda: codigoMoneda,
                    tipoCtaOperativa: tipoCtaOperativa,
                    nroCtaOperativa: nroCtaOperativa,
                    sucursalCtaOperativa: sucursalCtaOperativa,
                    cuentaTitulos: cuentaTitulos,
                    motivo: motivo,
                    denominacion: denominacion
                }
            });

            return $q.when(suscriptionData);
        }

        function bajaSuscribirPoderDeCompra(cuentaTitulo, nroCtaOperativa, sucursalCtaOperativa, tipoCtaOperativa, nup, codigoMoneda, idCuentaPdc, motivo) {
            var suscriptionData = $http({
                url: '/api/AdministracionApi/BajaSuscribirPoderDeCompra',
                method: 'get',
                params: {
                    cuentaTitulo: cuentaTitulo,
                    nroCtaOperativa: nroCtaOperativa,
                    sucursalCtaOperativa: sucursalCtaOperativa,
                    tipoCtaOperativa: tipoCtaOperativa,
                    nup: nup,
                    codigoMoneda: codigoMoneda,
                    idCuentaPdc: idCuentaPdc,
                    motivo: motivo
                }
            });

            return $q.when(suscriptionData);
        }
    }
})();