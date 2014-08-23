

'use strict';

angular.module('ld30App')
        .factory('Planet', function() {

            var Planet = function(name, x, y, r) {
                this.name = name;
                this.xPos = x;
                this.yPos = y;
                this.radius = r;
                this.selected = false;
                this.strokeStyle = '#003300';
                this.lineWidth = 1;
            };

            Planet.prototype.showName = function() {
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

            Planet.prototype.getRadius = function() {
                return this.radius;
            };

            Planet.prototype.setSelection = function(s) {
                this.selected = s;
                if (this.selected) {
                    this.strokeStyle = '#ff0000';
                    this.lineWidth = 3;
                } else {
                    this.strokeStyle = '#003300';
                    this.lineWidth = 1;
                }
            };

            Planet.prototype.renderPlanet = function(ctx) {
                ctx.beginPath();
                ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = this.strokeStyle;
                ctx.stroke();
            };

            return Planet;
        });

