
'use strict';

angular.module('ld30App')
        .controller('GameCtrl', function(
                graphicService,
                gameOptionsService,
                Player,
                Planet
                // $scope
                ) {

            function init(width, height, canvasFrame) {

                canvas = document.getElementById(canvasFrame);
                ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                time = Date.now();
                w = window;
                gfx = graphicService();
                difficulty = gameOptionsService.getDifficulty();

                addEventListener('keydown', function(e) {
                    keysDown[e.keyCode] = true;
                }, false);

                addEventListener('keyup', function(e) {
                    delete keysDown[e.keyCode];
                }, false);

                canvas.addEventListener('click', function(e) {
                    click(e);
                }, false);

                player = new Player('test', 0, 0);

                planetGenerator();
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

                for (var i = 0; i < planets.length; i++) {
                    if (planets[i].getRotation() >= 360) {
                        planets[i].setRotation(0);
                    }
                    planets[i].setRotation(
                            planets[i].getRotation() +
                            (1 / (planets[i].getRadius() / 10)) * timeModifier
                            );
                }
            }

            function planetGenerator() {

                var counter = null;
                switch (difficulty) {
                    case 1:
                        counter = 5;
                        break;
                    case 2:
                        counter = 10;
                        break;
                    case 3:
                        counter = 15;
                        break;
                    default:
                        counter = 5;
                        break;
                }

                do {
                    var radius = Math.floor((Math.random() * 60) + 20);

                    var x = Math.floor((Math.random() * canvas.width) + 1) + (radius / 2);
                    var y = Math.floor((Math.random() * canvas.height) + 1);

                    var p = new Planet(counter + 1, 'planet' + counter, x, y, radius);
                    // p.showName();
                    planets.push(p);
                    counter--;
                } while (counter > 0);
            }

            function renderPlanets(ctx, gfx) {
                if (gfx.planetImages.length < planets.length) {
                    for (var index = 0; index < planets.length; index++) {
                        gfx.planetImages.push(gfx.planetImages[index]);
                    }
                }
                for (var i = 0; i < planets.length; i++) {
                    var planetImg = gfx.planetImages[i];
                    planets[i].renderPlanet(ctx, planetImg);
                }
            }

            function render(ctx, gfx, fps) {
                ctx.drawImage(gfx.bgImage, 0, 0);

                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.font = '15px Helvetica';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('fps: ' + fps, 5, 5);

                renderPlanets(ctx, gfx);
            }

            function detectPlanetOnClick(x, y) {
                for (var i = 0; i < planets.length; i++) {
                    var planetPos = planets[i].getPosition();
                    var planetRadius = planets[i].getRadius();
                    if (
                            (x > (planetPos.x - planetRadius)) &&
                            (x < (planetPos.x + planetRadius)) &&
                            (y > (planetPos.y - planetRadius)) &&
                            (y < (planetPos.y + planetRadius))
                            ) {
                        console.log('planet clicked: ' + planets[i].showName());
                        planets[i].setSelection(true);
                    } else {
                        planets[i].setSelection(false);
                    }
                }
            }

            function click(event) {
                console.log('x: ' + event.offsetX + ' - y: ' + event.offsetY);
                detectPlanetOnClick(event.offsetX, event.offsetY);
            }

            function mainLoop() {
                var now = Date.now();
                var delta = now - time;
                var framerate = parseInt(1000 / delta);

                update(delta / 1000);
                render(ctx, gfx, framerate);

                time = now;

                w.requestAnimationFrame(mainLoop);
            }

            var w;
            var time;
            var canvas;
            var ctx;
            var gfx;
            var frameWidth = 1024;
            var frameHeight = 768;
            var keysDown = {};
            var player;
            var planets = [];
            var difficulty;

            init(frameWidth, frameHeight, 'gameframe');
            mainLoop();
        });
