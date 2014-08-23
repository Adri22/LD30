

'use strict';

angular.module('ld30App')
        .factory('Player', function() {

            var Player = function(name, x, y) {
                this.name = name;
                this.xPos = x;
                this.yPos = y;
            };

            Player.prototype.showName = function() {
                console.log(this.name);
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

            return Player;
        });










