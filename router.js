//in declarations
 psqlutils = require('../../api/utils/pgsql.utils'),
 jwt = require('jsonwebtoken'),

router.post("/signup", (req,res)=>{
   let password = sha1Hash(req.body.password);
 semusiDb.collection('members').insertOne({username:req.body.email,email:req.body.email,password:password,global_admin: false, admin_of: new Array(), user_of: new Array(), company: "", title: "", full_name: req.body.full_name.trim(), phone: "", isapproved: false, createdOn:"", modifiedOn: "" }, { safe: true }, function (err, result) {
  var member = [];
  console.log(err);
  console.log(result);
  if (result.ops) {
    member = result.ops;
    const psql =  psqlutils.createUserdata(req);
    res.redirect('/thankyou');
}
  else {
    res.send(err);
  }
})
})

router.post("/login",(req,res)=>{
  var password = sha1Hash(req.body.password);
  semusiDb.collection('members').findOne({username:req.body.email,password:password},function(err,result){
    if(result){
     const token = jwt.sign({
     email: result.email,
     memberId: result._id
   },
    process.env.APP_SECRET,{
     expiresIn: "1day"
    }
   )
     return res.status(200).json({
            message: "Auth successful",
            token: token
          });
    }
    else{
         res.redirect('/login')
        }
  })
})

