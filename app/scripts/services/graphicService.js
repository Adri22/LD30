

'use strict';

angular.module('ld30App')
        .service('graphicService', function() {

            return function() {

                var gfx;

                var bgImage = new Image();
                bgImage.src = 'images/background1.png';

                var heroImage = new Image();
                heroImage.src = 'images/player_test4.png';

                var monsterImage = new Image();
                monsterImage.src = 'images/monster_test2.png';

                gfx = {
                    'bgImage': bgImage,
                    'heroImage': heroImage,
                    'monsterImage': monsterImage
                };

                return gfx;
            };
        });
