(function () {
    'use strict';

    var loginControllerId = 'loginController';
    angular.module('appPoderDeCompra').controller(loginControllerId, loginController);

    loginController.$inject = ['$scope', '$location', '$window', 'common', 'loginService'];

    function loginController($scope, $location, $window, common, loginService) {
        var vm = this;
        vm.name = '';
        vm.password = '';
        vm.isLoading = false;
        vm.buttonLabel = 'Ingresar';
        vm.ip = '';

        function init() {
            if ($location.$$path == "/LogOff") {
                loginService.doLogout()
                 .then(function () {
                     $window.location.href = '/';
                 }, function (error) {
                     alert(error.data.ExceptionMessage);
                 });
            }
        }

        init();
        vm.submitLogin = function () {
            vm.message = "";
            if (vm.name.length < 7) {
                vm.loginError("Usuario incorrecto, ingrese nuevamente");
                return;
            }

            if (vm.password == '') {
                vm.loginError("Password incorrecta ingrese nuevamente");
                return;
            }

            vm.isLoading = true;
            loginService.doLogin(vm.name, vm.password)
                 .then(function (response) {
                     var result = response.data;
                     if (result == "OK")
                    $window.location.href = '/';
                else {
                    vm.loginError("Error al validar el usuario." + result);
                }
                //Resultado de la llamada.
            }, function (error) {
                     alert(error.data.ExceptionMessage);
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
            vm.password = "";
            vm.Error(errorMessage);
            common.showError(errorMessage, null);
        };

        vm.registrarce = function () {
            $window.location.href = '/login/Registracion';
        };
    };


})();