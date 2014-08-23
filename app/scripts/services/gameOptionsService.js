


'use strict';

angular.module('ld30App')
        .service('gameOptionsService', function() {
            return function(diff) {
                var difficulty = diff;
                var options = {
                    'difficulty': difficulty
                };
                return options;
            };
        });
