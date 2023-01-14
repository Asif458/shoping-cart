var express = require('express');
var router = express.Router();
const fileUpload=require('express-fileupload');
const productHelpers = require('../helpers/product-helpers');
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    
    {
      name:"iphone13",
      category:"mobile",
      description:"this is a good phone",
      image:"https://th.bing.com/th/id/OIP.MLKj9cxPOp1C5U5etIb4KgHaHa?w=195&h=196&c=7&r=0&o=5&pid=1.7"
    },
    {
      name:"iphone13 pro",
      category:"mobile",
      description:"this is a good phone",
      image:" https://th.bing.com/th/id/OIP.MLKj9cxPOp1C5U5etIb4KgHaHa?w=195&h=196&c=7&r=0&o=5&pid=1.7"
    },
    {
      name:"iphone 12 pro",
      category:"mobile",
      description:"this is a good phone",
      image:"https://th.bing.com/th/id/OIP.ZslkuMyOUVVGH3xE6HCuigHaJ4?w=162&h=217&c=7&r=0&o=5&pid=1.7"
      
    },
    {
      name:"iphone 14 pro max",
      category:"mobile",
      description:"this is a good phone",
      image:"https://bgr.com/wp-content/uploads/2022/03/iphone-14-pro-3d-renders-1.jpg?quality=82&strip=all"
    }



  ]
  res.render('admin/view-products',{admin:true,products})
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
    image.mv('./public/product-images/'+imageName+'jpg',(err,done)=>{
      if(!err){
        res.render("/admin/add-products")
      }else{
        console.log(err)
      }
    })
    res.render("admin/add-products")
  })
})
module.exports = router;
