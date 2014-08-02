angular-crumbs
==============


Angular-crumbs is a factory module for [AngularJS](http://angularjs.org) which generates a breadcrumb trail for your current route.


# Usage

We use [bower](http://twitter.github.com/bower/) for dependency management.  Add

    dependencies: {
        "angular-crumbs"": "latest"
    }

To your `bower.json` file. Then run

	bower install

This will copy the ui-date files into your `components` folder, along with its dependencies. 


Alternatively you can run

	bower install angular-crumbs --save


Load the script files in your application:

    <script type="text/javascript" src="components/angular-crumbs/dist/angular-crumbs.min.js"></script>


Add the date module as a dependency to your application module:

    var myAppModule = angular.module('MyApp', ['angularCrumbs'])


Example BreadCrumb Factory usage:

	'use strict';

	angular.module('MyApp')
	.controller('ExampleController', 
	['$scope', '$rootScope', 'BreadcrumbsFactory',
	function ($scope, $rootScope, BreadcrumbsFactory) {

		$scope.breadcrumbs = BreadcrumbsFactory.get();

	}]);



Example HTML:

	<ul ng-controller="BreadcrumbsController">
	    <li ng-repeat="crumbs in breadcrumbs">
	        <ng-switch on="$last">
	            <span ng-switch-when="true">{{crumbs.title}}</span>
	            <span ng-switch-default><a href="{{crumbs.path}}">{{crumb.title}}</a></span>
	        </ng-switch>
	    </li>
	</ul>