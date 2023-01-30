var db=require('../config/connection')
var collection=require('../config/collections');
const bcrypt=require('bcrypt');
const ObjectId  = require('mongodb').ObjectId;


module.exports={
    doSignup:(userData)=>{
    return new Promise(async(resolve,_reject)=>{

        const salt = await  bcrypt.genSalt(10);
        userData.Password= bcrypt.hash(userData.Password,salt,(_err,_hash) => {})
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data)

        })
       


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
                    }else{
                        console.log("login failed");
                    }
                    
                })
            }else{
                console.log('login failed');
            }
        })
    }

}
