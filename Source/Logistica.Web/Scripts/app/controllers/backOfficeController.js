(function () {
    'use strict';

    var backOfficeControllerControllerId = 'backOfficeController';
    angular.module('appPoderDeCompra').controller(backOfficeControllerControllerId, backOfficeControllerController);

    backOfficeControllerController.$inject = ['$scope', 'backOfficeService', 'common', '$mdpTimePicker'];

    function backOfficeControllerController($scope, backOfficeService, common, $mdpTimePicker) {
        var vm = this;

        vm.BPPesos = '';
        vm.BPDolares = '';
        vm.RTLPesos = '';
        vm.RTLDolares = '';
        vm.Motivo = '';
        vm.datoConsulta = '';
        vm.verProvisorio = 'N';
        vm.documentoConsulta = '';
        vm.tipoDocumento = '';
        vm.nupConsulta = '';
        vm.allCuentas = [];
        vm.allClientes = [];
        vm.historicoCuentas = [];
        vm.cuentasSuscriptas = [];
        vm.cuentasNoSuscriptas = [];
        vm.cuentasSaldoSuscriptas = [];
        vm.cliente = null;
        vm.ctasTitulos = [];
        vm.fecha = new Date();
        vm.hora = new Date();
        vm.cuenta = null;
        vm.saldos = null;
        vm.detalleSaldo = null;
        vm.tipoBusqueda = '';
        vm.selectedTabVtos = 0;
        vm.selectedTabProductos = '';
        vm.CodigoOperativoDescripcion = '';
        vm.fechaLiquidacionDesde = new Date();
        vm.fechaLiquidacionHasta = new Date();
        vm.monedaModel = []
        vm.moneda = '1';
        vm.NroRegistros = null;
        vm.SaldoNeutroCheck = false;

        vm.requestModel = {
            nup: 0,
            descCodOperacion: '',
            codProducto: '',
            alias: '',
            codMoneda: '',
            tipoCtaOper: 0,
            sucCtaOper: '',
            nroCtaOper: '',
            instNegociacion: '',
            instNegociacionDescripcion: '',
            montoAfectacion: 0,
            fechaLiquidacion: moment(),
            ctaTitulos: '',
            fechaConcertacion: moment(),
            descOrigen: 'S',
            valorNominal: 0,
            precioTasa: 0,
            cantNom: 0,
            precio: 0,
            idCodigoOperativo: 0,
            plazo: 0
        };

        //vm.getMonedas = function () {
        //    backOfficeService.getMonedas()
        //    .then(function (response) {
        //        if (response.data !== undefined) {
        //            vm.monedaModel = response.data;
        //        }
        //    });
        //};

        vm.getMonedas();

        //vm.modalIndexData = [];

        vm.responseModel = {
            comentario: '',
            ctaUtilizado: 0,
            pdcUtilizado: 0
        }

        //vm.tiposBusqueda = [
        //    { Codigo: 1, Descripcion: 'Por Producto' },
        //    { Codigo: 2, Descripcion: 'Por Fecha Liquidación' }
        //];

        this.showTimePicker = function (ev) {
            $mdpTimePicker($scope.currentTime, {
                targetEvent: ev
            }).then(function (selectedDate) {
                $scope.currentTime = selectedDate;
            });;
        }

        //vm.buscarCliente = function () {
        //    cleanData();
        //    backOfficeService.getConsultaSuscripcionBo(vm.datoConsulta)
        //        .then(function (response) {
        //            if (response.data !== undefined) {
        //                vm.allClientes = response.data;
        //            }
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};
        
        //vm.ConsultaMovimientosCtaPdc = function () {
        //    vm.selectedTabMovimientos = 'concertacion';
        //    backOfficeService.getMovimientosCuenta(vm.idCuentaPdc, vm.fechaConsultaDesde, vm.fechaConsultaHasta,  vm.horaProvisorio, vm.verProvisorio)
        //                    .then(function (response) {
        //                        if (response.data !== undefined) {
        //                            vm.movimientosCuenta = response.data;
        //                        }
        //                    }, function (error) {
        //                        alert(error.data.ExceptionMessage);
        //                    });
        //};

        //vm.showSelected = function (item) {
        //    //vm.datoConsulta = item.Nup;
        //    vm.allClientes = [item];
        //};

        //vm.submitRequest = function (item) {
        //    vm.showSelected(item);
        //    vm.cliente = item;
        //    backOfficeService.getCuentas(vm.cliente.Nup, vm.cliente.NumeroDocumento, vm.cliente.TipoDocumento)
        //        .then(function (response) {
        //            vm.allCuentas = response.data;
        //            vm.filterCtas();
        //            vm.filterCtasTitulos();
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.getCuentasAsociadas = function (item) {
        //    vm.showSelected(item);
        //    vm.cliente = item;
        //    backOfficeService.getCuentasSuscriptas(vm.cliente.Nup, vm.cliente.NumeroDocumento, vm.cliente.TipoDocumento)
        //        .then(function (response) {
        //            vm.cuentasSaldoSuscriptas = response.data;
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //}; 

        //vm.filterCtasTitulos = function () {
        //    var output = [],
        //         keys = [];

        //    angular.forEach(vm.allCuentas, function (item) {
        //        var key = item['CuentaTitulos'];
        //        if (keys.indexOf(key) === -1) {
        //            keys.push(key);
        //            output.push(item);
        //        }
        //    });
        //    vm.ctasTitulos = angular.copy(output);
        //};

        //vm.filterCtas = function () {
        //    angular.forEach(vm.allCuentas, function (valueCS, key) {
        //                vm.cuentasNoSuscriptas = vm.allCuentas.filter(function (item) {
        //                    return item.Estado !== "A";
        //        });
        //        vm.cuentasSuscriptas = vm.allCuentas.filter(function (item) {
        //            return item.Estado === "A";
        //            });
        //        });
        //};
        
        //vm.submitHistoricoRequest = function (index, tipo) {
        //    if (tipo === "sus") {
        //        vm.modalIndexData = vm.cuentasSuscriptas[index];
        //    } else {
        //        vm.modalIndexData = vm.cuentasNoSuscriptas[index];
        //    }
        //    backOfficeService.getHistoricoCuentas(vm.modalIndexData.CuentaTitulos,
        //                                          vm.modalIndexData.NumeroCuentaOperativa,
        //                                          vm.modalIndexData.Sucursal,
        //                                          vm.modalIndexData.TipoCtaOperativa,
        //                                          vm.modalIndexData.CodigoMoneda)
        //        .then(function (response) {
        //            if (response.data !== undefined) {
        //                vm.historicoCuentas = response.data;
        //                angular.forEach(vm.historicoCuentas, function (item) {
        //                    var FechaOriginal = moment(item.Fecha + ' ' + item.Hora, "DD/MM/YYYY hh:mm").toDate();
        //                    item.FechaOriginal = FechaOriginal;
        //                });

        //            }
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.submitDetalleRequest = function (item) {
        //    vm.CodigoOperativoDescripcion = item.DescripcionCodigoOperativo;
        //    backOfficeService.getDetalleSaldo(item.IdProducto, item.CodigoOperativo, vm.cuenta.CuentaPdc, item.FechaConcertacion, item.FechaSaldoPDC)
        //        .then(function (response) {
        //            if (response.data !== undefined) {
        //                vm.detalleSaldo = response.data;
        //            }
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.submitHistoricoCuentasTitulosRequest = function () {
        //    backOfficeService.getHistoricoCuentasTitulos(vm.cliente.CuentaTitulos)
        //        .then(function (response) {
        //            if (response.data !== undefined) {
        //                vm.historicoCuentas = response.data;
        //            }
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.cleanAll = function () {
        //    vm.allCuentas = [];
        //    vm.allClientes = [];
        //    vm.historicoCuentas = [];
        //    vm.cuentasSuscriptas = [];
        //    vm.cuentasNoSuscriptas = [];
        //    vm.cliente = null;
        //    vm.ctasTitulos = [];
        //    vm.datoConsulta = '';
        //    vm.cuenta = null;
        //    vm.saldos = null;
        //    vm.detalleSaldo = null;
        //    vm.tipoBusqueda = '';
        //    vm.selectedTabVtos = 0;
        //    vm.selectedTabProductos = 'acciones';
        //    vm.CodigoOperativoDescripcion = '';
        //    vm.movimientosCuenta = [];
        //}

        function cleanData()  {
            vm.allCuentas = [];
            vm.allClientes = [];
            vm.historicoCuentas = [];
            vm.cuentasSuscriptas = [];
            vm.cuentasNoSuscriptas = [];
            vm.cliente = null;
            vm.ctasTitulos = [];
            vm.cuenta = null;
            vm.saldos = null;
            vm.detalleSaldo = null;
            vm.tipoBusqueda = '';
            vm.selectedTabVtos = 0;
            vm.selectedTabProductos = 'acciones';
            vm.CodigoOperativoDescripcion = '';
            vm.movimientosCuenta = [];
        }

        //vm.setCuentaMov = function (item) {
        //    var date = new Date(item.Fecha)
        //    date.setMonth(date.getMonth() - 1);

        //    vm.idCuentaPdc = item.CuentaPdc;
        //    vm.fechaConsultaDesde = date;
        //    vm.fechaConsultaHasta = new Date(item.Fecha);
        //    vm.verProvisorio = "N";
        //    vm.horaProvisorio = new Date(date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000));
        //};

        //vm.disableConsultaSaldoButton = function () {
        //    return (
        //        vm.validateNullOrEmpty(vm.fecha) ||
        //        vm.validateNullOrEmpty(vm.hora) ||
        //        vm.validateNullOrEmpty(vm.tipoBusqueda)
        //        );
        //}

        //vm.disableConsultaMovimientosButton = function () {
        //    if (vm.verProvisorio === 'S') {
        //        return (
        //                vm.validateNullOrEmpty(vm.fechaConsultaDesde) ||
        //                vm.validateNullOrEmpty(vm.fechaConsultaHasta) ||
        //                vm.validateNullOrEmpty(vm.horaProvisorio)
        //        );
        //    }
        //    else {
        //        return (
        //            vm.validateNullOrEmpty(vm.fechaConsultaDesde) ||
        //            vm.validateNullOrEmpty(vm.fechaConsultaHasta) 
        //        );
        //    }
        //}

        //vm.validateNullOrEmpty = function (value) {
        //    return (value == null || value == undefined)
        //};

        //vm.setCuenta = function (item) {
        //    vm.cuenta = item;
        //    vm.fecha = new Date(item.Fecha);
        //    var date = new Date(item.Fecha);
        //    vm.hora = new Date(date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000));
        //    vm.tipoBusqueda = 1;
        //};

        //vm.getSaldosCuenta = function () {
        //    var date = new Date(vm.hora)
        //    var hora = new Date(date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000));
        //    backOfficeService.getSaldosCuenta(vm.fecha, hora, vm.tipoBusqueda, vm.cuenta.CuentaPdc)
        //        .then(function (response) {
        //            vm.saldos = response.data;
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.hayCambios = function () {
        //    return (vm.RTLPesosChanged || vm.RTLDolaresChanged || vm.BPPesosChanged || vm.BPDolaresChanged);
        //};

        //vm.consultaHabilitacionProd = function () {
        //        vm.BPPesosChanged = false;
        //        vm.BPDolaresChanged = false;
        //        vm.RTLPesosChanged = false;
        //        vm.RTLDolaresChanged = false;
        //    backOfficeService.consultaHabilitacionProd()
        //        .then(function (response) {
        //            if (response.data !== undefined) {
        //                vm.datosHabilitacionProd = response.data;

        //                angular.forEach(vm.datosHabilitacionProd, function (item) {
        //                    var segmento = item['Segmento'];
        //                    var moneda = item['IdMoneda'];
        //                    var estado = item['Estado'];

        //                    if (segmento == 'BP') {
        //                        if (moneda == '1') {
        //                            vm.BPPesos = estado;
        //                        }

        //                        if (moneda == '2') {
        //                            vm.BPDolares = estado;
        //                        }
        //                    }

        //                    if (segmento == 'RTL') {
        //                        if (moneda == '1') {
        //                            vm.RTLPesos = estado;
        //                        }

        //                        if (moneda == '2') {
        //                            vm.RTLDolares = estado;
        //                        }
        //                    }
        //                });

        //                if (vm.BPPesos == '') {
        //                        vm.BPPesos = 'B';
        //                    }

        //                if (vm.BPDolares == '') {
        //                    vm.BPDolares = 'B';
        //                }

        //                if (vm.RTLPesos == '') {
        //                    vm.RTLPesos = 'B';
        //                }

        //                if (vm.RTLDolares == '') {
        //                    vm.RTLDolares = 'B';
        //                }
        //            }
        //            cleanParameters();
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.setHabilitationProd = function () {
        //    angular.forEach(vm.datosHabilitacionProd, function (item) {
        //        var segmento = item['Segmento'];
        //        var moneda = item['IdMoneda'];

        //        if (segmento == 'BP') {
        //            if (moneda == '1') {
        //                item['Estado'] = vm.BPPesos;
        //            }

        //            if (moneda == '2') {
        //                item['Estado'] = vm.BPDolares;
        //            }
        //        }

        //        if (segmento == 'RTL') {
        //            if (moneda == '1') {
        //                item['Estado'] = vm.RTLPesos;
        //            }

        //            if (moneda == '2') {
        //                item['Estado'] = vm.RTLDolares;
        //            }
        //        }

        //        item['Motivo'] = vm.Motivo;
        //    });
        //    backOfficeService.setHabilitationProd(vm.datosHabilitacionProd)
        //        .then(function (response) {
        //            vm.consultaHabilitacionProd();
        //            cleanParameters();
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.getLiquidacion = function () {
        //    backOfficeService.getLiquidacion(vm.fechaLiquidacionDesde, vm.fechaLiquidacionHasta, vm.moneda)
        //        .then(function (response) {
        //            vm.liquidacion = response.data;
        //        }, function (error) {
        //            alert(error.data.ExceptionMessage);
        //        });
        //};

        //vm.disableLiquidacionButton = function () {
        //    return (
        //        vm.validateNullOrEmpty(vm.fechaLiquidacionDesde) ||
        //        vm.validateNullOrEmpty(vm.fechaLiquidacionHasta) ||
        //        vm.validateNullOrEmpty(vm.moneda)
        //        );
        //}

        //function cleanParameters() {
        //    vm.fecha = new Date();
        //    vm.hora = new Date();
        //    vm.Motivo = '';
        //};

    };
})();
