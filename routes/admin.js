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
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
   

})

router.get("/edit-product/:id",async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product)
  res.render('admin/edit-product',{product})
})

router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);
  let imageName=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin') 
    if(req.files.image){
      let image=req.files.image
      image.mv('./public/product-images/'+ imageName+'.jpg')
    }
  })
})
module.exports = router;
