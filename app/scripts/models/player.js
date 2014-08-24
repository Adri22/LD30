

'use strict';

angular.module('ld30App')
        .factory('Player', function() {

            var Player = function(name, x, y) {
                this.name = name;
                this.xPos = x;
                this.yPos = y;
                this.width = 70;
                this.height = 70;
                this.speed = 500;
                this.rotation = 0;
                this.playerStates = {
                    'neutral': 1,
                    'left': 0,
                    'speed': 2,
                    'right': 3
                };
                this.isBoost = false;
                this.rotationDirections = {
                    'left': false,
                    'right': false
                };
            };

            Player.prototype.showName = function() {
                return this.name;
            };

            Player.prototype.getPosition = function() {
                return {
                    x: this.xPos,
                    y: this.yPos
                };
            };

            Player.prototype.setPosition = function(x, y) {
                this.xPos = x;
                this.yPos = y;
            };

            Player.prototype.getRotation = function() {
                return this.rotation;
            };

            Player.prototype.setRotation = function(rot) {
                this.rotation = rot;
            };

            Player.prototype.isRotating = function() {
                if (this.rotationDirections.left || this.rotationDirections.right) {
                    return true;
                } else {
                    return false;
                }
            };

            Player.prototype.getSpeed = function() {
                return this.speed;
            };

            Player.prototype.setBoost = function(b) {
                this.isBoost = b;
            };
            
            Player.prototype.getState = function() {
                if (this.isBoost) {
                    return this.playerStates.speed;
                } else {
                    return this.playerStates.neutral;
                }
            };

            Player.prototype.renderPlayer = function(ctx, img) {
                ctx.save();
                ctx.translate(
                        this.xPos + this.width / 2,
                        this.yPos + this.height / 2
                        );
                ctx.rotate(this.rotation);

                /*
                 ctx.beginPath();
                 // ctx.lineWidth = '6';
                 // ctx.strokeStyle = 'red';
                 ctx.rect(
                 -(this.width / 2),
                 -(this.height / 2),
                 this.width,
                 this.height
                 );
                 ctx.stroke();
                 *//*
                  ctx.beginPath();
                  ctx.moveTo(0, 0);
                  ctx.lineTo(0, this.height);
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = 'blue';
                  ctx.stroke();
                  */

                // ctx.fillStyle = 'blue';
                // ctx.fill();

                ctx.drawImage(
                        img,
                        this.getState() * this.width,
                        0,
                        this.width,
                        this.height,
                        -this.width / 2,
                        -this.height / 2,
                        this.width,
                        this.height
                        );

                ctx.restore();
            };

            return Player;
        });










