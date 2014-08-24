


'use strict';

angular.module('ld30App')
        .factory('Connector', function() {

            var Connector = function(id, x, y, pID) {
                this.id = id;
                this.xPos = x;
                this.yPos = y;
                this.width = 32;
                this.height = 32;
                this.planetID = pID;
            };

            Connector.prototype.getID = function() {
                return this.id;
            };

            Connector.prototype.getPosition = function() {
                return {
                    x: this.xPos,
                    y: this.yPos
                };
            };

            Connector.prototype.setPosition = function(x, y) {
                this.xPos = x;
                this.yPos = y;
            };

            Connector.prototype.renderConnector = function(ctx, img) {
                ctx.drawImage(
                        img,
                        this.xPos - (this.width / 2),
                        this.yPos - (this.height / 2)
                        );
            };

            return Connector;
        });

