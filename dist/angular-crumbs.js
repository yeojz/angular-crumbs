/**   
 *	angular-crumbs  
 *	Version 1.0.0  
 *	Copyright (c) 2014 Gerald Yeo http://fusedthought.com  
 *	License: MIT   
 */
'use strict';
angular.module('angularCrumbs', []).factory('BreadcrumbsFactory', [
  '$rootScope',
  '$location',
  '$routeParams',
  function ($rootScope, $location, $routeParams) {
    //
    // Variables
    //----------------------------------------
    var _breadcrumbs = [];
    var _factory = {};
    var _settings = {
        variables: true,
        showRoot: true,
        rootName: 'Home',
        rootPath: '/',
        blacklistURLs: []
      };
    //
    // Methods
    //----------------------------------------
    // Create list of ignore Paramters
    function getIgnoreCrumbs() {
      var ignoreCrumbs = [];
      if (Object.keys($routeParams).length > 0) {
        // Iterate and put id into the list.
        for (var i in $routeParams) {
          ignoreCrumbs.push($routeParams[i]);
        }
      }
      return ignoreCrumbs;
    }
    // Generate the path to current view breadcrumbs
    function getBreadcrumbPath(path, index) {
      return '/' + path.slice(0, index + 1).join('/');
    }
    // Populate the breadcrumb
    function getCrumbs(event, current) {
      // For crumbs to ignore
      var ignoreCrumbs = [],
        // Tokenize the path
        path = $location.path().split('/'),
        // Prepare result
        result = [];
      // Check for ignore variable crumbs
      if (!_settings.variables) {
        ignoreCrumbs = getIgnoreCrumbs();
      }
      // Show the root
      if (_settings.showRoot) {
        result.push({
          title: _settings.rootName,
          path: _settings.rootPath
        });
      }
      // Get rid of the first element.
      // i.e. the URL root
      path.shift();
      // For the remainder
      // Loop through
      for (var i = 0; i < path.length; i++) {
        // Get the URL Path segment
        var segment = getBreadcrumbPath(path, i),
          // Final check if skipping current iteration
          skip = false;
        // Check if current segment is in blacklist of segements
        if (_settings.blacklistURLs.indexOf(segment) >= 0) {
          skip = true;
        }
        // Check if it's in the ignore Crumbs list
        if (ignoreCrumbs.indexOf(path[i]) >= 0) {
          skip = true;
        }
        // To add or not to add?
        if (!skip) {
          result.push({
            title: path[i],
            path: segment
          });
        }
      }
      // Assign result to global store
      _breadcrumbs = result;
    }
    //
    // Watcher
    //----------------------------------------
    $rootScope.$on('$routeChangeSuccess', getCrumbs);
    //
    // Init
    //----------------------------------------
    getCrumbs();
    //
    // Factory Return Functions
    //----------------------------------------
    // Recalculate values
    _factory.generate = function () {
      getCrumbs();
    };
    // Set default settings
    _factory.set = function (name, value) {
      if (_settings[name] !== undefined && value !== undefined) {
        _settings[name] = value;
      }
    };
    // Get all the crumbs
    _factory.get = function () {
      return _breadcrumbs;
    };
    // Get Up to a certain length of crumbs
    _factory.getSome = function (len) {
      // If length demanded is actually less than the total amount of crumbs,
      // Return the full amound.
      if (len < _breadcrumbs.length) {
        len = _breadcrumbs.length;
      }
      return _breadcrumbs.slice(0, len);
    };
    // Get only the first crumb
    _factory.getFirst = function () {
      return _breadcrumbs[0] || {};
    };
    // Return factory object
    return _factory;
  }
]);