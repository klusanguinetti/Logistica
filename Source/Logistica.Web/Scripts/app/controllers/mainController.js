(function () {
    'use strict';

    var mainControllerId = 'mainController';
    angular.module('appPoderDeCompra').controller(mainControllerId, mainController);

    mainController.$inject = ['$scope', '$location', '$window', 'mainService', 'loginService'];

    function mainController($scope, $location, $window, mainService, loginService) {
        var vm = this;
        var fullMenu = [];
        vm.menu = [];
        var menuItem = null;
        //vm.menuHeader = []
        var lastParent = null;
        vm.UserLogued = null;

        vm.viewLogOff = false;


        function Init() {
            //Get Menu

            mainService.getMenu().then(function (response) {
                //vm.menu = response.data;
                fullMenu = response.data;
                menuItem = getCurrentMenu();
                getMenuLevels();
            });

            mainService.getMenuHeader().then(function (response) {
                vm.menuHeader = response.data;
            });

            loginService.getUserLogued().then(function (response) {
                vm.UserLogued = response.data;
                if (vm.UserLogued != null)
                    vm.viewLogOff = true;
                else {
                    $window.location.href = '/Login';
                }
            });

            $scope.$on('$viewContentLoaded', function () {
                loginService.validateRequest()
                     .then(function (response) {
                         var result = response.data;
                         if (!result)
                             $window.location.href = '/';
                         //Resultado de la llamada.
                     }, function (error) {
                         alert(error.data.ExceptionMessage);
                     });
            });

        };

        function getCurrentMenu() {
            for (var i = 0; i < fullMenu.length; i++) {
                if (fullMenu[i].Url == $location.path()) {
                    return angular.copy(fullMenu[i]);
                }
            }
            return null;
        }
        function getMenuById(id) {
            for (var i = 0; i < fullMenu.length; i++) {
                if (fullMenu[i].Id == id) {
                    return angular.copy(fullMenu[i]);
                }
            }
            return null;
        }

        Init();

        vm.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        vm.getShowMenu = function () {
            var item = getCurrentMenu();
            if (item != undefined) {
                return item.ShowMenu;
            }
            else return false;
        };

        //Menu
        function getMenuLevels() {
            lastParent = null;
            vm.menu = [];
            var menuLevel = 0;
            var currentParent = null;

            if (menuItem != null) {
                currentParent = menuItem.ParentId;
                menuItem.Selected = true;
                menuLevel = menuItem.Level;
            }
            else {
                if (fullMenu.length > 0) {
                    menuItem = fullMenu[0];
                    currentParent = menuItem.Parent;
                    menuItem.Selected = true;
                    menuLevel = menuItem.Level;
                }
            }
            //if (currentParent == null) {
            //    vm.menu.unshift(fullMenu);
            //}
            //else {
            //Padres
            for (var currentLevel = menuLevel; currentLevel >= 0 ; currentLevel--) {
                var level = vm.getChilds(currentParent);
                vm.menu.unshift(level);
                if (menuItem != null) {
                    var parent = getMenuById(currentParent);
                    if (parent == null) {
                        break;
                    }
                    parent.Selected = true;
                    lastParent = currentParent;
                    currentParent = parent.Parent;
                }
            }

            //Hijos
            var currentChild = menuItem;
            var loop = true;
            while (currentChild != null && loop) {
                var level = vm.getChilds(currentChild.Id);
                if (level != null && level.length > 0) {
                    level[0].Selected = true;
                    vm.menu.push(level);
                    currentChild = level[0];
                    menuItem = currentChild;
                }
                else {
                    loop = false;
                }
            }
        };

        vm.getChilds = function (parentId) {
            var level = [];
            angular.forEach(fullMenu, function (item) {
                if (item.Parent == parentId) {
                    var itemCopiado = angular.copy(item);
                    if ((menuItem && menuItem.Id == itemCopiado.Id) || lastParent == itemCopiado.Id) {
                        itemCopiado.Selected = true;
                    }
                    else {
                        itemCopiado.Selected = false;
                    }

                    if ((itemCopiado.Url == null || itemCopiado.Url == '') && vm.getChilds(itemCopiado.Id).length == 0) {
                        itemCopiado.Disabled = true;
                    }
                    else {
                        itemCopiado.Disabled = false;
                    }

                    level.push(itemCopiado);
                }
            });
            return level;
        };

        

       

        vm.getMenuItem = function () {
            return getCurrentMenu();
        };

        vm.selectMenuItem = function (item) {
            menuItem = item;

            getMenuLevels();
            if (menuItem != null && menuItem.Url != null && menuItem.Url != '') {
                $location.path(menuItem.Url);
            }

        };

        //GetGlobal Variables
        vm.getShowMenu = function () {
            var item = getCurrentMenu();
            if (item != undefined) {
                return item.ShowMenu;
            }
            else return null;
        };
    };
})();