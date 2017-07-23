(function () {
    'use strict';

    var serviceId = 'commonService';
    angular.module('appPoderDeCompra').factory(serviceId, datacontext);

    datacontext.$inject = ['$http', '$q'];

    function datacontext($http, $q) {

        var service = {
            getCuentas: getCuentas,
            getConsultaSuscripcionBo: getConsultaSuscripcionBo,
            getCuentasOperativas:getCuentasOperativas,
            getCuentasTitulo: getCuentasTitulo,
            getMonedas: getMonedas,
            getProductos:getProductos,
            getTiposBusqueda: getTiposBusqueda,
            validateNullOrEmpty: validateNullOrEmpty
        };

        return service;

        function getCuentas(nup, nroDocumento, tipoDocumento) {
            var allCuentasResponse = $http({
                url: '/api/Common/GetCuentas',
                method: 'get',
                params: {
                    nup: nup,
                    dni: nroDocumento,
                    tipoDocumento: tipoDocumento
                }
            });

            return $q.when(allCuentasResponse);
        }


        function getConsultaSuscripcionBo(datoConsulta) {
            var allClientesResponse = $http({
                url: '/api/ConsultasApi/GetConsultaSuscripcionBo',
                method: 'get',
                params: {
                    datoConsulta: datoConsulta
                }
            });

            return $q.when(allClientesResponse);
        }
        
        function getCuentasOperativas(nup, moneda) {
            var allCuentasOperativasResponse = $http({
                url: '/api/Common/GetCuentasOperativas',
                method: 'get',
                params: {
                    nup: nup,
                    moneda: moneda
                }
            });

            return $q.when(allCuentasOperativasResponse);
        }

        function getCuentasTitulo(moneda, cuentaOperativa, nup) {
            var allCuentasTituloResponse = $http({
                url: '/api/Common/GetCuentasTitulo',
                method: 'get',
                params: {
                    moneda: moneda,
                    cuentaOperativa: cuentaOperativa,
                    nup: nup
                }
            });

            return $q.when(allCuentasTituloResponse);
        }
        function getMonedas() {
            var monedas = $http({
                url: '/api/Common/GetMonedas',
                method: 'get'
            });

            return $q.when(monedas);
        }
        function getProductos() {
            var data = $http({
                url: '/api/Common/GetProducts',
                method: 'get'
            });

            return $q.when(data);
        }

        function getTiposBusqueda() {
            return [ { Codigo: 1, Descripcion: 'Por Producto' }, { Codigo: 2, Descripcion: 'Por Fecha Liquidación' } ];
        }

        function validateNullOrEmpty(value) {
            return (value == null ||  value == '');

        }

    }
})();