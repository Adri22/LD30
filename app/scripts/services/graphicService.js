

'use strict';

angular.module('ld30App')
        .service('graphicService', function() {

            return function() {

                var gfx;

                var bgImage = new Image();
                bgImage.src = 'images/background1.png';

                gfx = {
                    'bgImage': bgImage
                };

                return gfx;
            };
        });
