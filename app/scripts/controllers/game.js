
'use strict';

angular.module('ld30App')
        .controller('GameCtrl', function(
                graphicService,
                gameOptionsService,
                Player,
                Planet,
                Connector,
                Beam,
                $scope
                ) {

            function init(width, height, canvasFrame) {
                gameEnd = false;
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
                reset();
            }

            function reset() {
                timerEnd = time + (30 * 1000);
                beamCounter = 0;
                player.setPosition(canvas.width / 2, canvas.height / 2);
            }

            function update(timeModifier) {
                var playerPos = player.getPosition();
                var playerRot = player.getRotation();

                if (keysDown[38]) {

                    var stepX = playerRot > 180 ? -player.getSpeed() : player.getSpeed();
                    var stepY = (playerRot > 90) && (playerRot < 270) ? player.getSpeed() : -player.getSpeed();

                    player.setPosition(
                            playerPos.x + ((Math.sin(playerRot) * stepX) * timeModifier),
                            playerPos.y + ((Math.cos(playerRot) * stepY) * timeModifier)
                            );
                    if (!player.isRotating) {
                        player.setRotation(playerRot);
                    }

                    player.setBoost(true);
                } else {
                    player.setBoost(false);
                }

                if (keysDown[37] && player.getState() !== 1) {
                    player.setRotation(playerRot - 5 * timeModifier);
                }

                if (keysDown[39] && player.getState() !== 1) {
                    player.setRotation(playerRot + 5 * timeModifier);
                }

                setConnector();
                createBeams();

                for (var i = 0; i < planets.length; i++) {
                    if (planets[i].getRotation() >= 360) {
                        planets[i].setRotation(0);
                    }
                    planets[i].setRotation(
                            planets[i].getRotation() +
                            (1 / (planets[i].getRadius() / 10)) * timeModifier
                            );
                }

                timer = timerEnd - time;
            }

            function planetGenerator() {
                var minimumDistance = 100;
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

                var success = function(p) {
                    collision = true;
                };

                var error = function(p) {
                    collision = false;
                };

                var tmpCounter = counter;
                do {
                    var collision = true;
                    var x, y, radius, p;

                    do {
                        radius = Math.floor((Math.random() * 60) + 20);
                        x = Math.floor((Math.random() * canvas.width) + 1) + (radius / 2);
                        y = Math.floor((Math.random() * canvas.height) + 1);

                        if (tmpCounter !== counter) {
                            detectPlanet(x - (radius + minimumDistance), y - (radius + minimumDistance), success, error);
                            if (!collision) {
                                detectPlanet(x + (radius + minimumDistance), y + (radius + minimumDistance), success, error);
                            }
                            if (!collision) {
                                detectPlanet(x - (radius + minimumDistance), y + (radius + minimumDistance), success, error);
                            }
                            if (!collision) {
                                detectPlanet(x + (radius + minimumDistance), y - (radius + minimumDistance), success, error);
                            }
                        }

                        if (tmpCounter === counter) {
                            p = new Planet(tmpCounter, 'planet' + tmpCounter, x, y, radius);
                            planets.push(p);
                            tmpCounter--;
                        }

                    } while (collision);

                    p = new Planet(tmpCounter, 'planet' + tmpCounter, x, y, radius);
                    planets.push(p);
                    tmpCounter--;
                } while (tmpCounter > 0);
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

            function renderConnectors(ctx, gfx) {
                for (var i = 0; i < connectors.length; i++) {
                    connectors[i].renderConnector(ctx, gfx.connectorImage);
                }
            }

            function renderBeams(ctx) {
                for (var i = 0; i < beams.length; i++) {
                    beams[i].renderBeam(ctx);
                }
            }

            function render(ctx, gfx, fps) {
                ctx.drawImage(gfx.bgImage, 0, 0);

                renderPlanets(ctx, gfx);
                renderBeams(ctx);
                renderConnectors(ctx, gfx);
                player.renderPlayer(ctx, gfx.playerImage);

                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.font = '15px Helvetica';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('fps: ' + fps, 5, 5);

                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.font = '20px Helvetica';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('time left: ' + Math.floor(timer / 1000) + ' | beams created: ' + beamCounter, 100, 5);

                if (gameEnd) {
                    ctx.fillStyle = 'rgb(255, 0, 0)';
                    ctx.font = '35px Helvetica';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Finished', 500, 400);
                }
            }

            function detectPlanet(x, y, successCallback, errorCallback) {
                var success = successCallback;
                var error = errorCallback;
                for (var i = 0; i < planets.length; i++) {
                    var planetPos = planets[i].getPosition();
                    var planetRadius = planets[i].getRadius();
                    if (
                            (x > (planetPos.x - planetRadius)) &&
                            (x < (planetPos.x + planetRadius)) &&
                            (y > (planetPos.y - planetRadius)) &&
                            (y < (planetPos.y + planetRadius))
                            ) {
                        success(planets[i]);
                    } else {
                        if (error !== null) {
                            error(planets[i]);
                        }
                    }
                }
            }

            function click(event) {
                detectPlanet(event.offsetX, event.offsetY,
                        function(planet) {
                            planet.setSelection(true);
                        },
                        function(planet) {
                            planet.setSelection(false);
                        });
            }

            function setConnector() {
                var playerPos = player.getPosition();
                detectPlanet(playerPos.x, playerPos.y,
                        function(p) {
                            if (p.isSelected() && !p.hasConnector()) {
                                var pPos = p.getPosition();
                                var c = new Connector(connectors.length + 1, pPos.x, pPos.y, p.getID());
                                for (var i = 0; i < planets.length; i++) {
                                    if (planets[i].getID() === p.getID()) {
                                        planets[i].setConnector(c.getID());
                                    }
                                }
                                connectors.push(c);
                            }
                        }, null);
            }

            function createBeams() {
                for (var i = 0; i < connectors.length; i++) {
                    for (var x = 0; x < connectors.length; x++) {
                        if (connectors[i].getID() !== connectors[x].getID()) {
                            var cTmpConnectors1 = connectors[i].getConnectors();
                            var cTmpConnectors2 = connectors[x].getConnectors();
                            var idTmp = connectors[i].getID();
                            if (!(cTmpConnectors2[idTmp])) {
                                var c1Pos = connectors[i].getPosition();
                                var c2Pos = connectors[x].getPosition();
                                var connectorIDs = [connectors[i].getID(), connectors[x].getID()];
                                var b = new Beam(
                                        beams.length + 1,
                                        c1Pos.x,
                                        c1Pos.y,
                                        c2Pos.x,
                                        c2Pos.y,
                                        connectorIDs
                                        );
                                connectors[i].setConnectionTo(connectors[x].getID());
                                connectors[x].setConnectionTo(connectors[i].getID());
                                beams.push(b);
                                beamCounter++;
                            }
                        }
                    }
                }
            }

            function mainLoop() {
                var now = Date.now();
                var delta = now - time;
                var framerate = parseInt(1000 / delta);

                update(delta / 1000);
                render(ctx, gfx, framerate);

                time = now;

                if (timer <= 0 && !gameEnd) {
                    // alert('you created ' + $scope.beamCounter + ' beams between planets!');
                    gameEnd = true;
                    w.requestAnimationFrame(mainLoop);
                } else if (!gameEnd) {
                    w.requestAnimationFrame(mainLoop);
                }
            }

            var w;
            var time;
            var timer;
            var timerEnd;
            var gameEnd;
            var canvas;
            var ctx;
            var gfx;
            var frameWidth = 1024;
            var frameHeight = 768;
            var keysDown = {};
            var player;
            var planets = [];
            var connectors = [];
            var beams = [];
            var difficulty;
            var beamCounter;

            init(frameWidth, frameHeight, 'gameframe');
            mainLoop();
        });
