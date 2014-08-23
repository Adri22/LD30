
'use strict';

angular.module('ld30App')
        .controller('GameCtrl', function(
                graphicService,
                Player,
                Planet,
                $scope
                ) {

            function init(width, height, canvasFrame) {

                canvas = document.getElementById(canvasFrame);
                ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                time = Date.now();
                w = window;
                gfx = graphicService();

                addEventListener('keydown', function(e) {
                    keysDown[e.keyCode] = true;
                }, false);

                addEventListener('keyup', function(e) {
                    delete keysDown[e.keyCode];
                }, false);

                player = new Player('test', 0, 0);

                planetGenerator(10);
            }

            /*
             function reset() {
             player.getPosition().x = canvas.width / 2;
             player.getPosition().y = canvas.height / 2;
             }
             */

            function update(timeModifier) {

                if (keysDown[38]) {
                    player.getPosition().y -= 1 * timeModifier;
                }
                if (keysDown[40]) {
                    player.getPosition().y += 1 * timeModifier;
                }
                if (keysDown[37]) {
                    player.getPosition().x -= 1 * timeModifier;
                }
                if (keysDown[39]) {
                    player.getPosition().x += 1 * timeModifier;
                }
            }

            function planetGenerator(counter) {
                do {
                    var radius = Math.floor((Math.random() * 60) + 21);
                    var x = Math.floor((Math.random() * canvas.width) + 1) + (radius / 2);
                    var y = Math.floor((Math.random() * canvas.height) + 1);
                    var p = new Planet('planet' + counter, x, y, radius);
                    // p.showName();
                    planets.push(p);
                    counter--;
                } while (counter > 0);
            }

            function renderPlanets(ctx) {
                for (var i = 0; i < planets.length; i++) {
                    planets[i].renderPlanet(ctx);
                }
            }

            function render(ctx, gfx, fps) {
                ctx.drawImage(gfx.bgImage, 0, 0);

                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.font = '15px Helvetica';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('fps: ' + fps, 5, 5);

                renderPlanets(ctx);
            }

            function detectPlanetOnClick(x, y){
                for(var i = 0; i < planets.length; i++){
                    planets.p
                }
            }
            
            $scope.click = function(event) {
                console.log('clicked');
                console.log('x: ' + event.offsetX + ' - y: ' + event.offsetY);
            };

            function mainLoop() {
                var now = Date.now();
                var delta = now - time;
                var framerate = parseInt(1000 / delta);

                update(delta / 1000);
                render(ctx, gfx, framerate, planets);

                time = now;

                w.requestAnimationFrame(mainLoop);
            }

            var w;
            var time;
            var canvas;
            var ctx;
            var gfx;
            var frameWidth = 800;
            var frameHeight = 600;
            var keysDown = {};
            var player;
            var planets = [];

            init(frameWidth, frameHeight, 'gameframe');
            mainLoop();
        });
