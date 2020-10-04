//top after declaration
function sha1Hash(str, addSalt) {
    var salt = (addSalt) ? new Date().getTime() : "";
    return crypto.createHmac('sha1', salt + "").update(str + "").digest('hex');
}

//middle
exports.createUserdata = function(req){
//console.log("data coming here",JSON.stringify(result));
let password = sha1Hash(req.body.password);
let sqlCitus = `INSERT INTO members` + ` (username,email,password,global_admin,user_of,admin_of,company,title,full_name,phone,isapproved,createdOn,modifiedOn) VALUES ('` +req.body.email+ `','` +req.body.email+ `','` +password+`',' false ','[]','[]','','','` +req.body.full_name+ `','','false','','')`;
citusQuery(sqlCitus)
.then((result) =>{
console.log("data inserted");
return true;
})
.catch((error) =>{
console.log("error");
return false;
});
}


