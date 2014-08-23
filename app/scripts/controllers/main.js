
'use strict';

angular.module('ld30App')
        .controller('MainCtrl', function(
                $scope,
                gameOptionsService
                ) {
            $scope.clickDifficultyOption = function(diff) {
                gameOptionsService(diff);
            };
        });
