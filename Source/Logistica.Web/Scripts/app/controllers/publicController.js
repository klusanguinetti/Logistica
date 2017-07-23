(function () {
    'use strict';

    var publicControllerId = 'publicController';
    angular.module('appPoderDeCompra').controller(publicControllerId, publicController);

    publicController.$inject = ['$scope', '$location'];

    function publicController($scope, $location) {
        var vm = this;
       
    };
})();