


'use strict';

angular.module('ld30App')
        .service('gameOptionsService', function() {

            var difficulty = 2;

            return {
                getDifficulty: function() {
                    return difficulty;
                },
                setDifficulty: function(diff) {
                    difficulty = diff;
                }
            };
        });
