(function () {
    'use strict';

    var serviceId = 'backOfficeService';
    angular.module('appPoderDeCompra').factory(serviceId, datacontext);

    datacontext.$inject = ['$http', '$q'];

    function datacontext($http, $q) {

        var service = {
            //getConsultaSuscripcionBo: getConsultaSuscripcionBo,
            //getCuentas: getCuentas,
            //getHistoricoCuentas: getHistoricoCuentas,
            //getHistoricoCuentasTitulos: getHistoricoCuentasTitulos,
            //getCuentasSuscriptas: getCuentasSuscriptas,
            //getSaldosCuenta: getSaldosCuenta,
            //getMovimientosCuenta: getMovimientosCuenta,
            //getDetalleSaldo: getDetalleSaldo,
            //consultaHabilitacionProd: consultaHabilitacionProd,
            //setHabilitationProd: setHabilitationProd,
            //getMonedas: getMonedas,
            //getLiquidacion: getLiquidacion

        };

        return service;

        //function getConsultaSuscripcionBo(datoConsulta) {
        //    var allClientesResponse = $http({
        //        url: '/api/Common/getConsultaSuscripcionBo',
        //        method: 'get',
        //        params: {
        //            datoConsulta: datoConsulta
        //        }
        //    });

        //    return $q.when(allClientesResponse);
        //};



        //function getCuentas(nup, nroDocumento, tipoDocumento) {
        //    var allCuentasResponse = $http({
        //        url: '/api/Common/GetCuentas',
        //        method: 'get',
        //        params: {
        //            nup: nup,
        //            dni: nroDocumento,
        //            tipoDocumento: tipoDocumento
        //        }
        //    });

        //    return $q.when(allCuentasResponse);
        //}

        //function getCuentasSuscriptas(nup, nroDocumento, tipoDocumento) {
        //    var cuentasSuscriptasResponse = $http({
        //        url: '/api/Common/GetCuentasSuscriptas',
        //        method: 'get',
        //        params: {
        //            nup: nup,
        //            dni: nroDocumento,
        //            tipoDocumento: tipoDocumento
        //        }
        //    });

        //    return $q.when(cuentasSuscriptasResponse);
        //} 

        function getAllCuentas(datoConsulta) {
            var allCuentasResponse = $http({
            url: '/api/Common/GetAllCuentas',
                    method: 'get'
                    });

        return $q.when(allCuentasResponse);
        }

        //function getHistoricoCuentas(cuentaTitulos, cuentaOperativa, sucursal, tipoCuenta, codigoMoneda) {
        //    var allCuentasResponse = $http({
        //        url: '/api/Common/GetHistoricoCuentas',
        //        method: 'get',
        //        params: {
        //            cuentaTitulos: cuentaTitulos,
        //            cuentaOperativa: cuentaOperativa,
        //            sucursal: sucursal,
        //            tipoCuenta: tipoCuenta,
        //            codigoMoneda: codigoMoneda
        //        }
        //    });

        //    return $q.when(allCuentasResponse);
        //}

        //function getHistoricoCuentasTitulos(cuentaTitulos) {
        //    var allCuentasResponse = $http({
        //        url: '/api/Common/getHistoricoCuentas',
        //        method: 'get',
        //        params: {
        //            cuentaTitulos: cuentaTitulos
        //        }
        //    });

        //    return $q.when(allCuentasResponse);
        //}

        //function getMovimientosCuenta(idCuentaPdc, fechaConsultaDesde, fechaConsultaHasta, horaProvisorio, verProvisorio) {getSaldosCuenta
        //    var movimientosCuentaResponse = $http({
        //        url: '/api/Common/getMovimientosCuenta',
        //        method: 'get',
        //        params: {
        //            idCuentaPdc: idCuentaPdc,
        //            fechaConsultaDesde: fechaConsultaDesde,
        //            fechaConsultaHasta: fechaConsultaHasta,
        //            horaProvisorio: horaProvisorio,
        //            verProvisorio: verProvisorio
        //        }
        //    });

        //    return $q.when(movimientosCuentaResponse);
        //}

        //function getDetalleSaldo(IdProducto, CodigoOperativo, CuentaPdc, FechaConcertacion, FechaSaldoPdc) {
        //    var detalleResponse = $http({
        //        url: '/api/Common/GetDetalleSaldo',
        //        method: 'get',
        //        params: {
        //            IdProducto:IdProducto,
        //            CodigoOperativo:CodigoOperativo,
        //            CuentaPdc:CuentaPdc,
        //            FechaConcertacion: FechaConcertacion,
        //            FechaSaldoPdc: FechaSaldoPdc
        //        }
        //    });

        //    return $q.when(detalleResponse);
        //}

        //function getSaldosCuenta(fecha, hora, tipoBusqueda, idPdc) {
        //    var allSaldosCuentaResponse = $http({
        //        url: '/api/Common/GetSaldosCuenta',
        //        method: 'get',
        //        params: {
        //            fecha: fecha,
        //            hora: hora,
        //            tipoBusqueda: tipoBusqueda,
        //            cuentaPDC: idPdc
        //        }
        //    });

        //    return $q.when(allSaldosCuentaResponse);
        //};

        //function consultaHabilitacionProd() {
        //    var consultaHabilitacionProdResponse = $http({
        //        url: '/api/Common/ConsultaHabilitacionProd',
        //        method: 'get',
        //        params: {}
        //    });

        //    return $q.when(consultaHabilitacionProdResponse);
        //};

        //function setHabilitationProd(datosHabilitacionProd) {
        //    var setHabilitationProdResponse = $http({
        //        url: '/api/Common/SetHabilitationProd',
        //        method: 'post',
        //        data: datosHabilitacionProd
        //    });

        //    return $q.when(setHabilitationProdResponse);
        //};

        //function getMonedas(fecha, hora, tipoBusqueda, idPdc) {
        //    var allSaldosCuentaResponse = $http({
        //        url: '/api/Common/GetMonedas',
        //        method: 'get'              
        //    });

        //    return $q.when(allSaldosCuentaResponse);
        //}


    }
})();