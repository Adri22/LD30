
/* global $:false */
'use strict';

angular.module('ld30App')
        .controller('MainCtrl', function(
                $scope,
                gameOptionsService
                ) {
            $scope.clickStart = function() {
                var diff = parseInt(
                        $('#difficulty')
                        .find('.active')
                        .find('input')
                        .val()
                        );
                gameOptionsService.setDifficulty(diff);
            };
        });
