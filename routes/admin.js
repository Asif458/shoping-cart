var express = require('express');
var router = express.Router();
const fileUpload=require('express-fileupload');
const productHelpers = require('../helpers/product-helpers');
var productHelpery=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products})


  })
  
});
router.get('/add-products',function(req,res){
  res.render('admin/add-products');
})
router.post('/add-products',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image);
  productHelpers.addProduct(req.body,(insertedId)=>{
    let image=req.files.image
    const imageName=insertedId

    console.log(insertedId);
    image.mv('./public/product-images/'+imageName+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-products")
      }else{
        console.log(err)
      }
    })
    
  })
})
module.exports = router;
