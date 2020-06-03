 const handleRegister=(req,resp,db,bcrypt)=>{
    const{name,password,email}=req.body;
   if(!name||!password||!email){
      return resp.status(400).json("incorrect form submission")
    } 
    const hash=bcrypt.hashSync(password);
    db.transaction(trx=>{
      trx.insert({
        email:email,
        hash:hash
      }).into('login')
      .returning('email')
      .then(loginEmail=>{
       return trx('users')
       .returning('*')
       .insert ({
        name:name,
        email:loginEmail[0],
        joined:new Date()
       
       })
       .then(
        user=>{resp.json(user[0])})
       }).then(trx.commit)
       .catch(trx.rollback)
    }).catch(err => resp.json("unable to register"))
    
    }


module.exports={

    handleRegister
}

    
    
    
    