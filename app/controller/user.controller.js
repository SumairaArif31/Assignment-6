const User=require('../models/user.model');


//Creating and saving a New User
exports.create=(req, res)=>{
     //Checking that Empty Data in not Entered
     if(!req.body){
        return res.status(400).send({
            message:"Userr Details are not completed"
        });
    }

    //New User Creatings
    const user=new User({
        Id:req.body.Id,
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    });

   return user.save()
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some Errors found while saving the data in the databas"
        });
    });


};

//View All user
    exports.selectAll=(req, res)=>{
        User.find()
        .then(user=>{
            res.send(user);
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "data cant find due to some errors"

            });
        });
    

};

//Updating an User
exports.update=(req, res)=>{
     //validating for updating User
     if(!req.body){
        return res.status(400).send({
            message:"Userr Details are not completed"
        });
    }

    User.findOneAndUpdate(req.param.Id,{
        Name:req.body.UserName,
        Email:req.body.UserEmail,
        Password:req.body.Password
    },{new: true})
    .then(user=>{
        if(!user){
            return res.status(400).send({
                message:"User Not Found with Given UserId"+req.param.Id
            });
        }
        res.send(user);
    }).catch(err=>{
        if(err.kind=='ObjectId'){
            return res.status(404).send({
                message:"User Not Found with Given UserId"+req.param.Id
            });
        }
        return res.status(500).send({
            message:"Error updaing user"+req.param.Id
        });
    });
   


}

//Deleting an user
exports.delete=(req, res)=>{
   User.findOneAndRemove(req.param.Id)
   .then(user=>{
       if(!user){
            return res.status(404).send({
                message:"User not Find with Given User Id"+req.param.Id
            });
       }
            res.send({
                message:"Note Deleted successfully"
                });
            }).catch(err=>{
                if(err.kind==='ObjectID' ||err.name==='not Found'){
                    return res.status(404).send({
                        message:"User not Find with Given User Id"+req.param.Id
                    }); 
                }
                    return res.status(500).send({
                    message: "Could not delete note with Userid " + req.params.Id
            });
        
   });


};