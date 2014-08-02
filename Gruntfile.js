
'use strict';

/*
 * Angular Crumbs Grunt File
 */
module.exports = function (grunt) {


/*
 *  Imports
 */

// Load grunt tasks automatically
require('load-grunt-tasks')(grunt);

// Time how long tasks take. Can help when optimizing build times
require('time-grunt')(grunt);


// Initilize a config area
var configOptions = {};








/*
 *  Configuration
 */

// Project Settings

configOptions.angularcrumbs= {
  src: 'src',
  dist: 'dist',
  pkg:  require('./package.json'),
  banner: '/** ' +
          '  \n *\t<%= angularcrumbs.pkg.name %>'+
          '  \n *\tVersion <%= angularcrumbs.pkg.version %>'+
          '  \n *\tCopyright (c) <%= grunt.template.today("yyyy") %> <%= angularcrumbs.pkg.author.name %> <%= angularcrumbs.pkg.author.url %>'+
          '  \n *\tLicense: <%= angularcrumbs.pkg.license %> '+
          '  \n */' +
          '  \n\n'
};








// Make Angular File minify safe

configOptions.ngmin = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= angularcrumbs.dist %>',
      src: '*.js',
      dest: '<%= angularcrumbs.dist %>'
    }]
  }
};




// Empties folders to start fresh
configOptions.clean = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= angularcrumbs.dist %>/*',
        '!<%= angularcrumbs.dist %>/.git*',
      ]
    }]
  },
};



// Concat 
configOptions.concat = {
  dist: {
    options: {
      banner: '<%= angularcrumbs.banner %>'
    },
    src: ['<%= angularcrumbs.src %>/**/*.js'],
    dest: '<%= angularcrumbs.dist %>/<%= angularcrumbs.pkg.name %>.js'
  }
};





configOptions.uglify = {
  dist: {
    options: {
      banner: '<%= angularcrumbs.banner %>'
    },
    src: '<%= angularcrumbs.dist %>/<%= angularcrumbs.pkg.name %>.js',
    dest: '<%= angularcrumbs.dist %>/<%= angularcrumbs.pkg.name %>.min.js'
  }
};






/*
 *  Register Grunt Tasks
 */

// Register the Grunt Config
grunt.initConfig(configOptions);




// Deployment Package
grunt.registerTask('build', [
  'clean:dist',
  'concat:dist',
  'ngmin:dist',
  'uglify:dist'
]);




}; // end module.export
