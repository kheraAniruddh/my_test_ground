
import Province from "./Province.js";
import MainController from "./MainController.js";

//
// Application Dependencies
//
require("api-check");
var angular = require( "angular" );
angular.module('formlyApp', [require("angular-formly"), require("angular-formly-templates-bootstrap")])
  .controller( "MainController", MainController )
  .factory( "province", Province.provinceFactory );
