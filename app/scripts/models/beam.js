



'use strict';

angular.module('ld30App')
        .factory('Beam', function() {

            var Beam = function(id, xs, ys, xe, ye, connectedTo) {
                this.id = id;
                this.xPosStart = xs;
                this.yPosStart = ys;
                this.xPosEnd = xe;
                this.yPosEnd = ye;
                this.connectedTo = connectedTo;
            };

            Beam.prototype.getID = function() {
                return this.id;
            };

            Beam.prototype.getConnectors = function() {
                return this.connectedTo;
            };

            Beam.prototype.renderBeam = function(ctx) {
                ctx.beginPath();
                ctx.moveTo(this.xPosStart, this.yPosStart);
                ctx.lineTo(this.xPosEnd, this.yPosEnd);
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'red';
                ctx.stroke();
            };

            return Beam;
        });

