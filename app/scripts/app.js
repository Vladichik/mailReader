'use strict';

/**
 * @ngdoc overview
 * @name mailboxApp
 * @description
 * # mailboxApp
 *
 * Main module of the application.
 */
angular
  .module('mailboxApp', [
    'ngResource',
    'ngSanitize'
  ])
  .run(function ($rootScope, $http) {
    /**
     * This request simulates request to the server that returns emails
     * data before the application starts and then it puts the data into
     * the application scope and makes first message in the list selected.
     */
    $http.get("resources/emails.json").then(function success(response){
      if(!response.data.error) {
        $rootScope.emails = response.data.messages;
        $rootScope.$$childHead.activeMessage = response.data.messages[0];
        $rootScope.$$childHead.activeRow = response.data.messages[0].uid;
      }
    });

    /**
     * Here we initiate application strings and system language
     */
    $rootScope.appStrings = APP_STRINGS;
    $rootScope.lang = "en";
  });
