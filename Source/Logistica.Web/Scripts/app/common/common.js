(function () {
    'use strict';

    appPoderDeCompra.factory('common', common);

    common.$inject = ['$mdDialog'];

    function common($mdDialog) {

        var service = {
            showAlert: showAlert,
            showError: showError,
            formattedStringToNumber: formattedStringToNumber,
        };

        return service;

        function showAlert(title, message, callback) {
            $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title(title)
                    .content(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                )
                .finally(callback);
        }

        function showError(message, callback) {
            $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(true)
                    .title("Error")
                    .content(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                )
                .finally(callback);
        }

        function formattedStringToNumber(number) {
            if (number && number != '') {
                var param = number.toString();
                var regex = new RegExp(",", "gi");
                return parseFloat(param.replace(regex, "."));
            }
            else
            {
                return 0;
            }
            
        }
    }
})();