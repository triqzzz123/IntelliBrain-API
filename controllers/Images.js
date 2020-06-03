
const Clarifai=require('clarifai')

const app = new Clarifai.App({
  apiKey: 'af4bbcfa66ef4994aa572f476e944fe4'
 })
const handleAPIcall=(req,resp)=>{
  app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data=>resp.json(data))
  .catch(err=>resp.json("unable to work with  API call"))
}

const handleImage=(req,resp,db)=>{
    const {id}=req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
      resp.json(entries[0])
    }).catch(err=>resp.status(404).json("error getting entries"))
  
  }

  module.exports={
      handleImage,
      handleAPIcall
  }