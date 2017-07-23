var appPoderDeCompra = angular.module('appPoderDeCompra', ['ngRoute', 'dataGrid', 'pagination', 'ngMaterial', 'ngMessages', 'blockUI', "ngAnimate", "ngAria", "mdPickers", "moment-picker"]);



var configFunction = function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });

    $routeProvider
        .when('/',
        {
            templateUrl: '/Home/Index'
        })
        .when('/Container',
        {
            templateUrl: '/Home/Container'
        })
        .when('/Login',
        {
           templateUrl: '/Login'
        })
         .when('/Registracion',
        {
            templateUrl: '/Login/Registracion'
        })
        .when('/LogOff',
        {
            templateUrl: '/Home/LogOff'
        })
        .when('/ConsultaSuscripcion',
        {
            templateUrl: '/Consultas/ConsultaSuscripcion'
        })
        .when('/ConsultaSaldo',
        {
            templateUrl: '/Consultas/ConsultaSaldo'
        })
        .when('/ReporteMovimientos',
        {
            templateUrl: '/Consultas/ReporteMovimientos'
        })
        .when('/ControlLiquidacionLiquidacion',
        {
            templateUrl: '/ControlLiquidacion/ControlLiquidacionLiquidacion'
        })
        .when('/ControlLiquidacionInventario',
        {
            templateUrl: '/ControlLiquidacion/ControlLiquidacionInventario'
        })
        .when('/ActivacionDesactivacion',
        {
            templateUrl: '/Administracion/ActivacionDesactivacion'
        })
        .when('/AdministracionBaja',
        {
            templateUrl: '/Administracion/AdministracionBaja'
        })
        .when('/AdministracionAjustesManuales',
        {
            templateUrl: '/Administracion/AdministracionAjustesManuales'
        })
        .when('/AdministracionAlta',
        {
            templateUrl: '/Administracion/AdministracionAlta'
        })
        .when('/AdministracionReprocesoAcreditacion',
        {
            templateUrl: '/Administracion/AdministracionReprocesoAcreditacion'
        })
        .when('/AdministracionReprocesoCierre',
        {
            templateUrl: '/Administracion/AdministracionReprocesoCierre'
        });
}

configFunction.$inject = ['$routeProvider', '$locationProvider', '$mdDateLocaleProvider'];

angular.module('appPoderDeCompra').config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD-MM-YYYY');
    };
});

appPoderDeCompra.config(configFunction);

