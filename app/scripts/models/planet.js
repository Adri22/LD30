

'use strict';

angular.module('ld30App')
        .factory('Planet', function() {

            var Planet = function(id, name, x, y, r) {
                this.id = id;
                this.name = name;
                this.xPos = x;
                this.yPos = y;
                this.radius = r;
                this.selected = false;
                this.strokeStyle = '#003300';
                this.lineWidth = 1;
                this.rotation = 0;
            };

            Planet.prototype.getID = function() {
                return this.id;
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

            Planet.prototype.getRotation = function() {
                return this.rotation;
            };

            Planet.prototype.setRotation = function(rot) {
                this.rotation = rot;
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

            Planet.prototype.renderPlanet = function(ctx, img) {
                ctx.save();
                ctx.translate(this.xPos, this.yPos);
                ctx.rotate(this.rotation);
                ctx.beginPath();
                ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
                // ctx.fillStyle = 'green';
                // ctx.fill();
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = this.strokeStyle;
                ctx.stroke();
                ctx.drawImage(
                        img,
                        -this.radius,
                        -this.radius,
                        (this.radius * 2),
                        (this.radius * 2)
                        );
                ctx.restore();
            };

            return Planet;
        });

