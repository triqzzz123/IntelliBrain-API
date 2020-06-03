const handleSignin=(req,resp,db,bcrypt)=>{
   const{password,email}=req.body;
  if(!password||!email){
    return resp.status(400).json("incorrect form submission")
  } 
    db.select('email','hash').from('login')
    .where('email','=',email)
    .then(data=>{
     const isValid =bcrypt.compareSync(password,data[0].hash);
     if (isValid){
      return db.select('*').from('users')
      .where('email',"=",email)
      .then(user=>resp.json(user[0]))
      .catch(err=>resp.status(404).json("error returning user"))
     }else{
       resp.status(400).json("entered wrong credentials")
     }
   }).catch(err=>resp.status(404).json("entered wrong credentials"))
   }


module.exports={
handleSignin

}