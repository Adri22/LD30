

'use strict';

angular.module('ld30App')
        .service('graphicService', function() {
            return function() {

                var gfx;

                var bgImage = new Image();
                bgImage.src = 'images/background1.png';

                var playerImage = new Image();
                playerImage.src = 'images/player1.png';

                var connectorImage = new Image();
                connectorImage.src = 'images/connector.png';

                var planetImages = [];
                var planetPaths = [
                    'images/planet1.png',
                    'images/planet2.png',
                    'images/planet3.png',
                    'images/planet4.png'
                ];

                for (var i = 0; i < planetPaths.length; i++) {
                    var planetImage = new Image();
                    planetImage.src = planetPaths[i];
                    planetImages.push(planetImage);
                }

                gfx = {
                    'bgImage': bgImage,
                    'playerImage': playerImage,
                    'planetImages': planetImages,
                    'connectorImage': connectorImage
                };

                return gfx;
            };
        });
