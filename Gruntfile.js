'use strict';

/**
 * Idea from FireShell https://github.com/toddmotto/fireshell/blob/master/Gruntfile.js
 *
 * @param grunt
 */
module.exports = function (grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
   grunt.initConfig({

     pkg: grunt.file.readJSON('package.json'),

     /**
      * Set project info
      */
     project: {
       src: './modules',
       assets: './src/main/resources/static',
       temp:'./target/js',
       css: [
         '<%= project.src %>/scss/style.scss'
       ],
       js: [
         '<%= project.src %>/js/*.js'
       ]
     },

     /**
      * Project banner
      * Dynamically appended to CSS/JS files
      * Inherits text from package.json
      */
     tag: {
       banner: '/*!\n' +
       ' * <%= pkg.name %>\n' +
       ' * <%= pkg.title %>\n' +
       ' * @author <%= pkg.author %>\n' +
       ' * @version <%= pkg.version %>\n' +
       ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
       ' */\n'
     },

      browserify: {

         dev: {
            options: {
              browserifyOptions: {
                debug: true
              },
               transform: [
                 ["babelify", {loose: "all"}],
                 "browserify-ngannotate"
               ]
            },
            files: {
               // if the source file has an extension of es6 then
               // we change the name of the source file accordingly.
               // The result file's extension is always .js
               "<%= project.assets %>/simple/index.js": [ "<%= project.src %>/simple/index.js"],
               "<%= project.assets %>/items/index.js": [ "<%= project.src %>/items/*.js" ],
               "<%= project.assets %>/formly/app.js": [ "<%= project.src %>/formly/app.js" ]
            }
         },

        dist: {
          options: {
            browserifyOptions: {
              debug: true
            },
            transform: [
              ["babelify", {loose: "all"}]
            ]
          },
          files: {
            "<%= project.temp %>/simple/index.js": [ "<%= project.src %>/simple/index.js"],
            "<%= project.temp %>/formly/app.js": [ "<%= project.src %>/formly/app.js" ]
          }
        }

      },

     /**
      * Compile Sass/SCSS files
      * https://github.com/gruntjs/grunt-contrib-sass
      * Compiles all Sass/SCSS files and appends project banner
      */
     sass: {
       dev: {
         options: {
           style: 'expanded',
           compass: false
         },
         files: {
           '<%= project.assets %>/simple/index.css': '<%= project.src %>/simple/index.scss',
           '<%= project.assets %>/items/index.css': '<%= project.src %>/items/index.scss',
           '<%= project.assets %>/formly/index.css': '<%= project.src %>/formly/index.scss'
         }
       },
       dist:{
         options: {
           style: 'compressed',
           compass: false
         },
         files: {
           '<%= project.assets %>/simple/index.css': '<%= project.src %>/simple/index.scss',
           '<%= project.assets %>/items/index.css': '<%= project.src %>/items/index.scss',
           '<%= project.assets %>/formly/index.css': '<%= project.src %>/formly/index.scss'
         }
       }
     },

     /**
      * Uglify (minify) JavaScript files
      * https://github.com/gruntjs/grunt-contrib-uglify
      * Compresses and minifies all JavaScript files into one
      */
     uglify: {
       options: {
         banner: '<%= tag.banner %>'
       },
       dist: {
         files: {
           '<%= project.assets %>/simple/index.js': '<%= project.temp %>/simple/index.js',
           '<%= project.assets %>/items/index.js': '<%= project.temp %>/items/index.js',
           "<%= project.assets %>/formly/app.js": "<%= project.temp %>/formly/app.js"
         }
       }
     },

      watch: {
         scripts: {
            files: ["./modules/**/*.js"],
            tasks: ["browserify:dev"]
         },
         scss:{
           files:["./modules/**/*.{sass,scss,css}"],
           tasks: ["sass:dev"]
         }
      }
   });

   grunt.registerTask("default", ["build","watch"]);
   grunt.registerTask("build", ["browserify:dev"]);
   grunt.registerTask("dist", ["browserify:dist","uglify:dist","sass:dist"]);

};