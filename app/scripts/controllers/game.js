
'use strict';

angular.module('ld30App')
        .controller('GameCtrl', function(
                graphicService,
                renderService,
                Player
                // $scope
                ) {

            function init(width, height, canvasFrame) {

                canvas = document.getElementById(canvasFrame);
                ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                time = Date.now();
                w = window;

                addEventListener('keydown', function(e) {
                    keysDown[e.keyCode] = true;
                }, false);

                addEventListener('keyup', function(e) {
                    delete keysDown[e.keyCode];
                }, false);

                gfx = graphicService();
                player = new Player();
                reset();
            }

            function reset() {
                player.getPosition().x = canvas.width / 2;
                player.getPosition().y = canvas.height / 2;

                monster.x = 32 + (Math.random() * (canvas.width - 64));
                monster.y = 32 + (Math.random() * (canvas.height - 64));
            }

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

                if (
                        player.getPosition().x <= (monster.x + 32) &&
                        monster.x <= (player.getPosition().x + 32) &&
                        player.getPosition().y <= (monster.y + 32) &&
                        monster.y <= (player.getPosition().y + 32)
                        ) {
                    reset();
                }
            }

            function mainLoop() {
                var now = Date.now();
                var delta = now - time;
                var framerate = parseInt(1000 / delta);

                update(delta / 1000);
                renderService(ctx, gfx);

                time = now;

                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.font = '15px Helvetica';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('fps: ' + framerate, 5, 5);

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

            var monster = {};



            init(frameWidth, frameHeight, 'gameframe');
            mainLoop();
        });
