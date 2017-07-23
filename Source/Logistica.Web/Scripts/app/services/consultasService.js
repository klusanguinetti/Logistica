(function () {
    'use strict';

    var serviceId = 'consultasService';
    angular.module('appPoderDeCompra').factory(serviceId, datacontext);

    datacontext.$inject = ['$http', '$q'];

    function datacontext($http, $q) {

        var service = {
            getCuentasSuscriptas: getCuentasSuscriptas,
            getHistoricoCuentas: getHistoricoCuentas,
            getHistoricoCuentasTitulos: getHistoricoCuentasTitulos,
            getDetalleSaldo: getDetalleSaldo,
            getMovimientosCuenta: getMovimientosCuenta,
            getSaldosCuenta: getSaldosCuenta
        };

        return service;

        function getCuentasSuscriptas(nup, nroDocumento, tipoDocumento) {
            var cuentasSuscriptasResponse = $http({
                url: '/api/ConsultasApi/GetCuentasSuscriptas',
                method: 'get',
                params: {
                    nup: nup,
                    dni: nroDocumento,
                    tipoDocumento: tipoDocumento
                }
            });

            return $q.when(cuentasSuscriptasResponse);
        } 

        function getHistoricoCuentas(cuentaTitulos, cuentaOperativa, sucursalCtaOperativa, tipoCtaOperativa, codigoMoneda) {
            var allCuentasResponse = $http({
                url: '/api/ConsultasApi/GetHistoricoCuentas',
                method: 'get',
                params: {
                    cuentaTitulos: cuentaTitulos,
                    cuentaOperativa: cuentaOperativa,
                    sucursalCtaOperativa: sucursalCtaOperativa,
                    tipoCtaOperativa: tipoCtaOperativa,
                    codigoMoneda: codigoMoneda
                }
            });

            return $q.when(allCuentasResponse);
        }

        function getHistoricoCuentasTitulos(cuentaTitulos) {
            var allCuentasResponse = $http({
                url: '/api/ConsultasApi/GetHistoricoCuentas',
                method: 'get',
                params: {
                    cuentaTitulos: cuentaTitulos
                }
            });

            return $q.when(allCuentasResponse);
        }

        function getDetalleSaldo(idProducto, codigoOperativo, cuentaPdc, fechaConcertacion, fechaSaldoPdc) {
            var detalleResponse = $http({
                url: '/api/ConsultasApi/GetDetalleSaldo',
                method: 'get',
                params: {
                    idProducto: idProducto,
                    codigoOperativo: codigoOperativo,
                    cuentaPdc: cuentaPdc,
                    fechaConcertacion: fechaConcertacion,
                    fechaSaldoPdc: fechaSaldoPdc
                }
            });

            return $q.when(detalleResponse);
        }

        function getMovimientosCuenta(cuentaTitulos, nroCtaOperativa, sucCtaOperativa, tipoCtaOperativa, fechaConsultaDesde, fechaConsultaHasta, horaProvisorio, verProvisorio) {

            var movimientosCuentaResponse = $http({
                url: '/api/ConsultasApi/getMovimientosCuenta',
                method: 'get',
                params: {
                    cuentaTitulos: cuentaTitulos,
                    sucCtaOperativa: sucCtaOperativa,
                    nroCtaOperativa: nroCtaOperativa,
                    tipoCtaOperativa: tipoCtaOperativa,
                    fechaConsultaDesde: fechaConsultaDesde,
                    fechaConsultaHasta: fechaConsultaHasta,
                    horaProvisorio: horaProvisorio,
                    verProvisorio: verProvisorio
                }
            });

            return $q.when(movimientosCuentaResponse);
        }

        function getSaldosCuenta(fecha, hora, tipoBusqueda, idPdc) {
            var allSaldosCuentaResponse = $http({
                url: '/api/ConsultasApi/GetSaldosCuenta',
                method: 'get',
                params: {
                    fecha: fecha,
                    hora: hora,
                    tipoBusqueda: tipoBusqueda,
                    cuentaPDC: idPdc
                }
            });

            return $q.when(allSaldosCuentaResponse);
        }
    }
})();