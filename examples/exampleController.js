'use strict';

angular.module('MyApp')
.controller('BreadcrumbsController', 
['$scope', '$rootScope', 'BreadcrumbsFactory',
function ($scope, $rootScope, BreadcrumbsFactory) {

	BreadcrumbsFactory.set('variables', false);
	BreadcrumbsFactory.generate();

	$scope.breadcrumbs = BreadcrumbsFactory.get();

}]);