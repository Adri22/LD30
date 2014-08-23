

'use strict';

angular.module('ld30App')
        .factory('Planet', function() {

            var Planet = function(name, x, y, r) {
                this.name = name;
                this.xPos = x;
                this.yPos = y;
                this.radius = r;
            };

            Planet.prototype.showName = function() {
                console.log(this.name);
                return this.name;
            };

            Planet.prototype.getPosition = function() {
                return {
                    x: this.xPos,
                    y: this.yPos
                };
            };

            Planet.prototype.setPosition = function(x, y) {
                this.xPos = x;
                this.yPos = y;
            };

            Planet.prototype.renderPlanet = function(ctx) {
                ctx.beginPath();
                ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#003300';
                ctx.stroke();
            };

            return Planet;
        });

