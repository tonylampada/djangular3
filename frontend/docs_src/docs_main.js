(function(){

    var deps = [
        'component_catalog',
        'ui.router',
    ];
    if(window.DOCS && DOCS.angular_dependencies){
        deps = deps.concat(DOCS.angular_dependencies);
    }

    angular.module('docs_main', deps);
    angular.module('docs_main').config(function($interpolateProvider, $controllerProvider, $stateProvider, $urlRouterProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

        $controllerProvider.allowGlobals();
        $urlRouterProvider.otherwise('/instructions');

        $stateProvider
            .state('base', {
                url: '/:category/:title',
                template: '<component-catalog-sample></component-catalog-sample>',
                controller: 'IncludeComponentCatalogSampleCtrl'
            })
            .state('instructions', {
                url: '/instructions',
                template: '<div layout-padding> select something on the left </div>'
            });
    });
})();
