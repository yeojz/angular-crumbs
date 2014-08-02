/*
 *  Angular Breadcrumb Factory
 *  
 *  This breadcrumb factory uses $location parameter to generate a breadcrumb trail.
 *  Does not use ui.router unlike other breadcrumb plugins
 *
 *  You can choose to ignore variable items for example :id in your routes when
 *  generating a trail
 */



'use strict';

angular.module('angularCrumbs', [])
.factory('BreadcrumbsFactory', 
['$rootScope', '$location', '$routeParams', 
function($rootScope, $location, $routeParams){




//
// Variables
//----------------------------------------
  var _breadcrumbs = [];
  var _factory = {};
  var _settings = {
    variables: true,

    showRoot: true,
    rootName: 'Home',
    rootPath: '/'
  }






  

//
// Methods
//----------------------------------------


  // Create list of ignore Paramters
  function getIgnoreCrumbs(){

    var ignoreCrumbs = [];

    if (Object.keys($routeParams).length > 0){
      // Iterate and put id into the list.
      for (var i in $routeParams){
        ignoreCrumbs.push($routeParams[i]);
      }

    }
    return ignoreCrumbs;
  }




  // Generate the path to current view breadcrumbs
  function getBreadcrumbPath(index){
    var path = $location.path().split('/');

    return '/' + (path.slice(0, index + 1)).join('/');
  }




  // Populate the breadcrumb
  function getCrumbs(event, current){
    
        // For crumbs to ignore
    var ignoreCrumbs = [],

        // Tokenize the path
        path = $location.path().split('/'), 

        // Prepare result
        result = [];


    // Check for ignore variable crumbs
    if (!_settings.variables){
      ignoreCrumbs = getIgnoreCrumbs();
    }
        
    // Show the root
    if (_setting.showRoot){
      result.push({
        title: _setting.rootName,
        path: path[0]
      })
    }

    // Get rid of the first element.
    // i.e. the URL root
    path.shift();


    // For the remainder
    // Loop through
    for (var i = 0; i < path.length; i++) {
     
      if (ignoreCrumbs.indexOf(path[i]) < 0){
        result.push({
          title: path[i], 
          path: getBreadcrumbPath(i)
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
  _factory.generate = function(){
    getCrumbs();
  }
  



  // Set default settings
  _factory.set = function(name, value){

    if (    _settings[name] !== undefined 
          && value !== undefined
        ){

      _settings[name] = value;
    }

  }




  // Get all the crumbs
  _factory.get = function() {
    return _breadcrumbs;
  };




  // Get Up to a certain length of crumbs
  _factory.getSome = function(len) {

    // If length demanded is actually less than the total amount of crumbs,
    // Return the full amound.
    if (len < _breadcrumbs.length){
      len = _breadcrumbs.length;
    }

    return _breadcrumbs.slice(0, len);
  };




  // Get only the first crumb
  _factory.getFirst = function() {
    return _breadcrumbs[0] || {};
  };




  // Return factory object
  return _factory;



}]);

