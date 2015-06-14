
/**
 * Example is based on http://g00glen00b.be/prototyping-spring-boot-angularjs/
 * References: http://blog.mitsuruog.info/2015/03/writing-angularjs-using-es6.html
 */

import ItemDataFactory from './ItemDataFactory.js';
import AppController from './AppController.js';

var angular = require( "angular" );

angular.module('ItemsApp', [require('angular-resource')])
  .controller( "AppController", AppController )
  .factory('ItemDataFactory', ItemDataFactory.createFactory );

