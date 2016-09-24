'use strict';

/**
 * @ngdoc function
 * @name mailboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mailboxApp
 */
angular.module('mailboxApp')
  .controller('MainCtrl', function ($rootScope, $scope) {

    /**
     * This method listens to rows click events
     * and sets active message object in order to show the
     * message details in details view. It also sets activeRow
     * class and treats read/unread message state
     */
    $scope.$on("setActiveMessage", function(evt, message){
      $scope.activeMessage = message;
      $scope.activeMessage.read = true;
      $scope.activeRow = message.uid;
      $scope.$apply();
    });
  })
  /**
   * this directive listens to message rows click events
   */
  .directive("setActive", function () {
    return function (scope, element, attrs) {
      element.on("click", function () {
        scope.$emit("setActiveMessage", scope.message);
      });
    }
  })
  /**
   * This directive performs message deletion
   */
  .directive("deleteMsg", ['$rootScope', function($rootScope){
    return function(scope, element, attrs){
      element.on("click", function(){
        $rootScope.emails.map(function (message, index) {
          if(message.uid === attrs.deleteMsg){
            $rootScope.emails.splice(index, 1);
            scope.$apply();
            scope.$emit("setActiveMessage", $rootScope.emails[index]);
          }
        })
      })
    }
  }]);
