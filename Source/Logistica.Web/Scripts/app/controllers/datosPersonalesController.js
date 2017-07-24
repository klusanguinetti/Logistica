(function () {
    'use strict';

    var datosPersonalesControllerId = 'datosPersonalesController';
    angular.module('appPoderDeCompra').controller(datosPersonalesControllerId, datosPersonalesController);

    datosPersonalesController.$inject = ['$scope', 'datosPersonalesService', 'commonService', '$mdpTimePicker'];

    function datosPersonalesController($scope, datosPersonalesService, commonService, $mdpTimePicker) {
        var vm = this;
        vm.DatosPersona = null;

        

        function Init() {
            datosPersonalesService.getDatosPersonales()
               .then(function (response) {
                   vm.DatosPersona = response.data;
               }, function (error) {
                   alert(error.data.ExceptionMessage);
               });
        }

        Init();


        
        //vm.cancelarAdhesion = function () {
        //    cleanData();
        //    Init();
        //}

       
        //vm.submitRequest = function (item) {
        //    vm.showSelected(item);
        //    vm.cliente = item;
        //    Init();
        //    commonService.getCuentas(vm.cliente.Nup, vm.cliente.NumeroDocumento, vm.cliente.TipoDocumento)
        //        .then(function (response) {
        //            vm.allCuentas = response.data;
        //            vm.filterCtas();
        //            vm.filterCtasTitulos();
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.showSelected = function (item) {
        //    //vm.datoConsulta = item.Nup;
        //    vm.allClientes = [item];
        //};

        //vm.setCuentaMov = function (item) {
        //    vm.selectedItem = item;
        //    var date = new Date(item.Fecha);
        //    date.setMonth(date.getMonth() - 1);

        //    vm.idCuentaPdc = item.CuentaPdc;
        //    vm.fechaConsultaDesde = date;
        //    vm.fechaConsultaHasta = new Date(item.Fecha);
        //    vm.verProvisorio = "N";
        //    vm.horaProvisorio = new Date(date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000));
        //};

        
        //vm.setAltaManual = function () {

        //    var tipoCtaOper = vm.cuentaOperativa.Codigo.split("|")[0];
        //    var nroCtaOper = vm.cuentaOperativa.Codigo.split("|")[1];
        //    var sucCtaOper = vm.cuentaOperativa.Codigo.split("|")[2];

        //    administracionService.altaSuscribirPoderDeCompra(vm.cliente.Nup, vm.moneda, tipoCtaOper, nroCtaOper, sucCtaOper, vm.cuentaTitulo, vm.Motivo, vm.cuentaTitulo)
        //        .then(function (response) {
        //            cleanData();
        //            alert('Número cuenta PDC: ' + response.data.IdCuentaPdc);
        //            Init();
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.deshabilitarBtnAdherir = function () {
        //    return (
        //            vm.validateNullOrEmpty(vm.cuentaTitulo) ||
        //            vm.validateNullOrEmpty(vm.cuentaOperativa.Codigo) ||
        //            vm.validateNullOrEmpty(vm.Motivo) ||
        //            vm.validateNullOrEmpty(vm.moneda)
        //            );
        //};

        //vm.setBajaManual = function () {
        //    administracionService.bajaSuscribirPoderDeCompra(vm.selectedItem.CuentaTitulos, vm.selectedItem.NroCtaOperativa, vm.selectedItem.SucursalCtaOperativa, vm.selectedItem.TipoCtaOperativa, vm.selectedItem.Nup, vm.selectedItem.CodigoMoneda, vm.selectedItem.CuentaPdc, vm.Motivo)
        //        .then(function (response) {
        //            cleanData();
        //            alert('Número de Cuenta PDC: ' + response.data.IdCuentaPdc + ' ' + response.data.InformacionTramite);
        //            Init();
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.validateNullOrEmpty = function (value) {
        //    return commonService.validateNullOrEmpty(value);
        //};

    };
})();
