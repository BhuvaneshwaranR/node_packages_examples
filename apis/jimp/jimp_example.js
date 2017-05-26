var Jimp = require("jimp"); //used to do image manipulation /*lwip is anthore module for manipulating image*/
var multiparty = require('multiparty');
exports.ImageManipulation = JimpRoute;

function JimpRoute(app, router) {

    router.post('/ImageManipulation', function(req, res) {
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var image = files.image[0];


            /*
                        Jimp.read(image.path, function(err, image_handle) {
                            if (err) throw err;
                            image_handle.resize(256, 256) // resize 
                                .quality(60) // set JPEG quality 
                                .greyscale() // set greyscale 
                                .write(__dirname+"/images/"+image.originalFilename); // save 
                               res.json({"success":true})

                        });*/



                Jimp.read(image.path, function(err, image_handle) {
                    if (err) res.json(err);

                    Jimp.read("gray-logo.png", function(readerr, imageread) {
                        // do stuff with the image (if no exception)
                        if (readerr) res.json(readerr);
                        // for composite and mask function input is jimp image
                        image_handle.composite(imageread, 0, 0) // mask                    
                            .write(__dirname + "/images/" + image.originalFilename); // save 
                        res.json({ "success": true })

                    });
                });
            

        });
        form.on('progress', function(bytesReceived, bytesExpected) {
            var percent_complete = (bytesReceived / bytesExpected) * 100;
        });
    });



}


/*
image.composite( src, x, y );     // composites another Jimp image over this image at x, y
image.mask( src, x, y );          // masks the image with another Jimp image at x, y using average pixel value
*/

/*image": [
      {
        "fieldName": "image",
        "originalFilename": "image.jpg",
        "path": "/tmp/qoeQDIxr7eT0_M9K-4O6g4TM.jpg",
        "headers": {
          "content-disposition": "form-data; name=\"image\"; filename=\"image.jpg\"",
          "content-type": "image/jpeg"
        },
        "size": 78193
      }*/



/*
NOTE : To find more image manipulation package see the below link
  https://stackoverflow.com/questions/10692075/which-library-should-i-use-for-server-side-image-manipulation-on-node-js
*/
