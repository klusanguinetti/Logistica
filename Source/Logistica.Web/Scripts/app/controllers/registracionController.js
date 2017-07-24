(function () {
    'use strict';

    var resgistracionControllerId = 'registracionController';
    angular.module('appPoderDeCompra').controller(resgistracionControllerId, registracionController);

    registracionController.$inject = ['$scope', '$location', '$window', 'common', 'registracionService'];

    function registracionController($scope, $location, $window, common, registracionService) {
        var vm = this;
        vm.Registracion = null;
        
        vm.message = '';

        vm.isLoading = false;
        vm.buttonLabel = 'Registrarse';
        

        function init() {
            registracionService.getViewModel()
                .then(function (response) {
                    vm.Registracion = response.data;
                    //Resultado de la llamada.
                }, function (error) {
                    alert(error.data.ExceptionMessage);
                });
        }

        init();
        vm.submitLogin = function () {
            vm.message = "";
            if (vm.Registracion.Mail.length < 7) {
                vm.loginError("Usuario incorrecto, ingrese nuevamente");
                return;
            }
            if (vm.Registracion.Password == '') {
                vm.loginError("Password incorrecta ingrese nuevamente");
                return;
            }
            if (vm.Registracion.Nombre == '') {
                vm.loginError("Nombre incorrecta ingrese nuevamente");
                return;
            }
            vm.isLoading = true;
            registracionService.registracion(vm.Registracion)
                 .then(function (response) {
                     var result = response.data;
                     if (result) {
                         alert('Es registro el usuario ' + vm.Registracion.Mail);
                         $window.location.href = '/Login/Login';
                     }
                else {
                    vm.loginError("Error al validar el usuario." + result);
                }
                //Resultado de la llamada.
                 }, function (error) {
                     vm.loginError(error.data.ExceptionMessage);
            });

        }
        vm.Error = function (errorMessage) {
            var wrap = $('#login-wrapper');

            vm.message = errorMessage;

            vm.isLoading = false;

            $('input', wrap).blur();

            // hacemos esto para disparar de vuelta la animacion css
            wrap.removeClass('error');
            wrap.position(wrap.position());
            wrap.addClass('error');
        };
        vm.loginError = function (errorMessage) {
            vm.Registracion.Password = "";
            vm.Error(errorMessage);
            common.showError(errorMessage, null);
        };

    };


})();