var db=require('../config/connection')
var collection=require('../config/collections');
const bcrypt=require('bcrypt');
const ObjectId  = require('mongodb').ObjectId;


module.exports={
    // doSignup:(userData)=>{
    //     return new Promise(async(resolve,_reject)=>{
    
    //         const salt = await  bcrypt.genSalt(10);
    //         userData.Password= bcrypt.hash(userData.Password,salt,(_err,_hash) => {})
    //         db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
    //             resolve(data)
    
    //         })
    
    
    
    //     })

    // },

    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then()
            resolve(userData)
            
        })
    },

    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("loginSuccessfull");
                        response.user=user
                        response.status=true
                        resolve(response)

                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                    
                })
            }else{
                console.log('login failed');
                resolve({status:false})
            }
        })
    },
    addToCart:(proId,userId)=>{
        return new Promise(async (resolve,reject)=>{
            let userCart=await db.get().collection(collection.CART_COLLECTION).findone({user:ObjectId(userId)})
            if(userCart){

            }else{
                let cartObj={
                    user:ObjectId(userId),
                    products:[objectId(proId)]
                }
                db.get().collection(collcetion.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
            
        })
    }

}
