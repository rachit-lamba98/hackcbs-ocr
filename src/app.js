const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// const cp = require('child_process');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'cryptx',
  api_key: '226239969415579',
  api_secret: 'M_hVUUOuQDzlFKpjNKg8eRoLTRs'
});

const app = express();
const port = process.env.PORT || 3001;
// const spawn = cp.spawn;
const handleError = (err, res) => {
  res
    .status(503)
    .contentType("text/plain")
    .send({error:"Oops! Something went wrong!" + err});
};



const upload = multer({
  dest: "/home/rachit/Desktop/study/hackathon/public/img"
});

filepath = path.join(__dirname, '../public')

app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine','hbs')
app.use(express.static(filepath))

app.get('', (req, res)=>{
  res.render('index',{
    title: 'OCR App'
  })
});

// app.get('/name', (req, res)=>{
//   const process = spawn('python', ['../python_scripts/text-classifier.py', 'Rachit']);
//   process.stdout.on('data', (data)=> {
//     console.log(data.toString());
//     //res.send(data.toString());
//   })
// })

// info.ocr.adv_ocr.data[0].textAnnotations[0].description

app.post('/upload', upload.single("file"), (req, res, next)=>{
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "../public/img/image.png");

  if(path.extname(req.file.originalname).toLowerCase() === ".png"){
    fs.rename(tempPath, targetPath, err =>{
      if(err) return handleError(err, res);
      cloudinary.uploader.upload(targetPath, {ocr: "adv_ocr"}, (err, result)=>{
        if(err){
          console.warn(err);
          return handleError(err, res);
        }
        // var pattern = /^(/s)+([0-9]{4})+(/s)$/;
        // var datePattern = /^[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}$/;
        // var pattern = /^(?<=\s)\d(?=\s)$/;
        var text =  result.info.ocr.adv_ocr.data[0].textAnnotations[0].description;
        var invoiceRegex = /^\w{2,3}\-\d{4}\-$/ || /^\d{4}$/ ;
        var dateRegex = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
        var moneyRegex1 =  /^\d+\,\d+$/;
        var moneyRegex2 = /^\d+\,\d+\.\d*$/
        var d = text.split("\n");
          out = [];

        for(var i=0;i<d.length;i++){
          var d2 = d[i].split(" ");
          // for(var j =0;j<d2.length;j++){
          //   if(d2[j].match(dateRegex)!=null){
          //     res.send(d2[j]);
          //     return;
          //   }
          // }
          // for(var k =0;k<d2.length;k++){
          //   if(d2[k].match(invoiceRegex)!=null){
          //     res.send(d2[k]);
          //     return;
          //   }
          // }
          // console.log(text);
          for(var l =0;l<d2.length;l++){
            if(d2[l].match(moneyRegex1) != null || d2[l].match(moneyRegex2) != null){
              out.push(d2[l]);
            }
          }
          console.log(out);
          res.send(out[out.length-1]);
          return;
        }


        // console.log("".match(dateRegex))
        // for(var i=0; i<text.length; i++){
        //   console.log(text[i].match(invoiceRegex));
        // }
        // console.log(text.match(invoiceRegex)[0]);
        // console.log(text.match(dateRegex)[0]);
        // var pattern = /[0-9]{4}/;
        // text = text.split(" ");
        // for(var i = 0; i < text.length; i++){
        //   var subtext = text[i].split('\n');
        //   for(var j = 0; j < subtext.length; j++){
        //     if(subtext[i].match(subtext[i], pattern) != null)
        //       console.log(subtext[i]);
        // //       break;
        //   }
        // }
        // var invoiceCode = text.match(text, pattern);
        // console.log(invoiceCode);
        res.status(200).contentType('text/plain').send(text);
      });
      // res.imgPath = targetPath;

     // next();
    });
  }
  else{
    fs.unlink(tempPath, err =>{
      if(err) return handleError(err, res);
      res.status(403).contentType("text/plain").send({error:"Only .png files are allowed!"});
    })
  }
});
// (req, res)=>{
//   console.log(res.imgPath);
//   const imgPath = res.imgPath;
//   const filePath = path.join(__dirname, '../python_scripts/ocr.py')
//   cp.exec('python ' + filepath + ' ' + imgPath, (error, stdout, stderr)=>{
//     if(error)
//       handleError(error, res);
//     else{
//       res.status(200).contentType("text/plain").send({data: stdout.toString()});
//     }
//   })
// });

app.listen(port, ()=>{
  console.log('Server is up on port ' + port);
})
