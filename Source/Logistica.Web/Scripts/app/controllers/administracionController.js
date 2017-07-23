(function () {
    'use strict';

    var administracionControllerId = 'administracionController';
    angular.module('appPoderDeCompra').controller(administracionControllerId, administracionController);

    administracionController.$inject = ['$scope', 'administracionService', 'commonService', '$mdpTimePicker'];

    function administracionController($scope, administracionService, commonService, $mdpTimePicker) {
        var vm = this;
        vm.fecha = new Date();
        vm.hora = new Date();
        vm.BPPesos = '';
        vm.BPDolares = '';
        vm.RTLPesos = '';
        vm.RTLDolares = '';
        vm.Motivo = '';
        vm.selectedItem = null;
        vm.moneda = null;
        vm.cuentaOperativa = null;
        vm.cuentaTitulo = null;
        vm.monedaModel = [];
        vm.cuentasOperativas = [];
        vm.cuentasTitulo = [];
        vm.cliente = null;
        vm.BPPesosChanged = false;
        vm.BPDolaresChanged = false;
        vm.RTLPesosChanged = false;
        vm.RTLDolaresChanged = false;
        vm.datoConsulta = '';
        vm.TipoCtaOperativa = -1;

        function cleanData() {
            vm.cliente = null;
            vm.allCuentas = null;
            vm.allClientes = [];
        }
        function getMonedas() {
            commonService.getMonedas()
                .then(function (response) {
                    vm.monedaModel = response.data;
                }, function (error) {
                    alert(error.data.ExceptionMessage);
                });
        }

        function Init() {
            vm.moneda = null;
            vm.cuentaOperativa = null;
            vm.cuentaTitulo = null;
            vm.cuentasOperativas = [];
            vm.cuentasTitulo = [];
            vm.Motivo = '';
            vm.datoConsulta = '';
            getMonedas();
        }

        Init();

       

        vm.cancelarAdhesion = function () {
            cleanData();
            Init();
        }

        vm.getCuentasOperativas = function () {
            if (vm.cliente.Nup != null && vm.moneda != '' && vm.moneda != undefined) {
                commonService.getCuentasOperativas(vm.cliente.Nup, vm.moneda)
                .then(function (response) {
                    vm.cuentasOperativas = response.data;
                }, function (error) {
                    alert(error.data.ExceptionMessage);
                });
            }
            else {
                vm.cuentasOperativas = [];
            }
        }

        vm.getCuentasTitulo = function () {
            if (vm.cliente.Nup != null && vm.moneda != '' && vm.moneda != undefined && vm.cuentaOperativa.Codigo) {
                commonService.getCuentasTitulo(
                    vm.moneda,
                    vm.cuentaOperativa.Codigo,
                    vm.cliente.Nup).then(function (response) {
                        vm.cuentasTitulo = response.data;
                    }, function (error) {
                        alert(error.data.ExceptionMessage);
                    });
            }
            else {
                vm.cuentasTitulo = [];
            }
        };

        function cleanParameters() {
            vm.fecha = new Date();
            vm.hora = new Date();
            vm.Motivo = '';
        };

        vm.buscarCliente = function () {
            cleanData();
            commonService.getConsultaSuscripcionBo(vm.datoConsulta)
                .then(function (response) {
                    if (response.data !== undefined) {
                        vm.allClientes = response.data;
                    }
                }, function (error) {
                    alert(error.data.ExceptionMessage);
                });
        };

        

        vm.hayCambios = function () {
            return (vm.RTLPesosChanged || vm.RTLDolaresChanged || vm.BPPesosChanged || vm.BPDolaresChanged);
        };

        vm.consultaHabilitacionProd = function () {
            vm.BPPesosChanged = false;
            vm.BPDolaresChanged = false;
            vm.RTLPesosChanged = false;
            vm.RTLDolaresChanged = false;
            administracionService.consultaHabilitacionProd()
                .then(function (response) {
                    if (response.data !== undefined) {
                        vm.datosHabilitacionProd = response.data;

                        angular.forEach(vm.datosHabilitacionProd, function (item) {
                            var segmento = item['Segmento'];
                            var moneda = item['IdMoneda'];
                            var estado = item['Estado'];

                            if (segmento == 'BP') {
                                if (moneda == '1') {
                                    vm.BPPesos = estado;
                                }

                                if (moneda == '2') {
                                    vm.BPDolares = estado;
                                }
                            }

                            if (segmento == 'RTL') {
                                if (moneda == '1') {
                                    vm.RTLPesos = estado;
                                }

                                if (moneda == '2') {
                                    vm.RTLDolares = estado;
                                }
                            }
                        });

                        if (vm.BPPesos == '') {
                            vm.BPPesos = 'B';
                        }

                        if (vm.BPDolares == '') {
                            vm.BPDolares = 'B';
                        }

                        if (vm.RTLPesos == '') {
                            vm.RTLPesos = 'B';
                        }

                        if (vm.RTLDolares == '') {
                            vm.RTLDolares = 'B';
                        }
                    }
                    cleanParameters();
                }, function (error) {
                    alert(error.data.ExceptionMessage);
                });
        };

        vm.setHabilitationProd = function () {
            angular.forEach(vm.datosHabilitacionProd, function (item) {
                var segmento = item['Segmento'];
                var moneda = item['IdMoneda'];

                if (segmento == 'BP') {
                    if (moneda == '1') {
                        item['Estado'] = vm.BPPesos;
                    }

                    if (moneda == '2') {
                        item['Estado'] = vm.BPDolares;
                    }
                }

                if (segmento == 'RTL') {
                    if (moneda == '1') {
                        item['Estado'] = vm.RTLPesos;
                    }

                    if (moneda == '2') {
                        item['Estado'] = vm.RTLDolares;
                    }
                }

                item['Motivo'] = vm.Motivo;
            });
            administracionService.setHabilitationProd(vm.datosHabilitacionProd)
                .then(function () {
                    vm.consultaHabilitacionProd();
                    cleanParameters();
                }, function (error) {
                    alert(error.data.ExceptionMessage);
                });
        };

        vm.filterCtasTitulos = function () {
            var output = [],
                 keys = [];

            angular.forEach(vm.allCuentas, function (item) {
                var key = item['CuentaTitulos'];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });
            vm.ctasTitulos = angular.copy(output);
        };

        vm.filterCtas = function () {
            angular.forEach(vm.allCuentas, function (valueCS, key) {
                        vm.cuentasNoSuscriptas = vm.allCuentas.filter(function (item) {
                            return item.Estado !== "A";
                });
                vm.cuentasSuscriptas = vm.allCuentas.filter(function (item) {
                    return item.Estado === "A";
                    });
                });
        };

        vm.submitRequest = function (item) {
            vm.showSelected(item);
            vm.cliente = item;
            Init();
            commonService.getCuentas(vm.cliente.Nup, vm.cliente.NumeroDocumento, vm.cliente.TipoDocumento)
                .then(function (response) {
                    vm.allCuentas = response.data;
                    vm.filterCtas();
                    vm.filterCtasTitulos();
                }, function (error) {
                    alert(error.data.ExceptionMessage);
                });
        };

        vm.showSelected = function (item) {
            //vm.datoConsulta = item.Nup;
            vm.allClientes = [item];
        };

        vm.setCuentaMov = function (item) {
            vm.selectedItem = item;
            var date = new Date(item.Fecha);
            date.setMonth(date.getMonth() - 1);

            vm.idCuentaPdc = item.CuentaPdc;
            vm.fechaConsultaDesde = date;
            vm.fechaConsultaHasta = new Date(item.Fecha);
            vm.verProvisorio = "N";
            vm.horaProvisorio = new Date(date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000));
        };

        
        vm.setAltaManual = function () {

            var tipoCtaOper = vm.cuentaOperativa.Codigo.split("|")[0];
            var nroCtaOper = vm.cuentaOperativa.Codigo.split("|")[1];
            var sucCtaOper = vm.cuentaOperativa.Codigo.split("|")[2];

            administracionService.altaSuscribirPoderDeCompra(vm.cliente.Nup, vm.moneda, tipoCtaOper, nroCtaOper, sucCtaOper, vm.cuentaTitulo, vm.Motivo, vm.cuentaTitulo)
                .then(function (response) {
                    cleanData();
                    alert('Número cuenta PDC: ' + response.data.IdCuentaPdc);
                    Init();
                }, function (error) {
                    alert(error.data.ExceptionMessage);
                });
        };

        vm.deshabilitarBtnAdherir = function () {
            return (
                    vm.validateNullOrEmpty(vm.cuentaTitulo) ||
                    vm.validateNullOrEmpty(vm.cuentaOperativa.Codigo) ||
                    vm.validateNullOrEmpty(vm.Motivo) ||
                    vm.validateNullOrEmpty(vm.moneda)
                    );
        };

        vm.setBajaManual = function () {
            administracionService.bajaSuscribirPoderDeCompra(vm.selectedItem.CuentaTitulos, vm.selectedItem.NroCtaOperativa, vm.selectedItem.SucursalCtaOperativa, vm.selectedItem.TipoCtaOperativa, vm.selectedItem.Nup, vm.selectedItem.CodigoMoneda, vm.selectedItem.CuentaPdc, vm.Motivo)
                .then(function (response) {
                    cleanData();
                    alert('Número de Cuenta PDC: ' + response.data.IdCuentaPdc + ' ' + response.data.InformacionTramite);
                    Init();
                }, function (error) {
                    alert(error.data.ExceptionMessage);
                });
        };

        vm.validateNullOrEmpty = function (value) {
            return commonService.validateNullOrEmpty(value);
        };

    };
})();
