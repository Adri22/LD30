

'use strict';

angular.module('ld30App')
        .service('renderService', function() {

            function drawHUD(ctx) {
                ctx.fillStyle = 'rgb(250, 250, 250)';
                ctx.font = '15px Helvetica';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('hud text and some values here', 32, 32);
            }

            return function(ctx) {
                // ctx.drawImage(, 0, 0);
                
                drawHUD(ctx);
            };

            /*
             function makeTransparent(ctx, frameWidth, frameHeight) {
             var imgData = ctx.getImageData(0, 0, frameWidth, frameHeight);
             var pix = imgData.data;
             
             for (var i = 0, n = pix.length; i < n; i += 4) {
             var
             r = pix[i],
             g = pix[i + 1],
             b = pix[i + 2];
             
             if (r === 255 && g === 0 && b === 255) {
             pix[i] = 0;
             pix[i + 1] = 0;
             pix[i + 2] = 0;
             pix[i + 3] = 0;
             }
             }
             
             ctx.putImageData(imgData, 0, 0);
             }
             */
        });
