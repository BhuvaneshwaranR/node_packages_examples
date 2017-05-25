var Tesseract = require('tesseract.js');
var multiparty = require('multiparty');
exports.ImageToText = TesseractRoute;

function TesseractRoute(app, router) {

    router.post('/uploadImage', function(req, res) {

        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var image = files.image[0];
            
            Tesseract.recognize(image.path)
                .progress(function(p) { console.log('progress', p) })
                .then(function(result) {                    
                    res.json({ "result": result.text });
                });

        });
        form.on('progress', function(bytesReceived, bytesExpected) {
            var percent_complete = (bytesReceived / bytesExpected) * 100;
        });
    });

}


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
