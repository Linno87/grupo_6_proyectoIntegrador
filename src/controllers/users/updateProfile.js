const { existsSync, unlinkSync } = require("fs");
const {validationResult} = require('express-validator');
const db = require('../../database/models')

module.exports = (req, res) => {
  const errors = validationResult(req);
   const {
    first_name,
    last_name,
    address,
    city,
    province,
    date,
    gender,
    about,
    

  } = req.body;
  if(errors.isEmpty()){

 db.User.findByPk(req.session.userLogin.id,{
  include:['address']
 })
.then((user)=>{
  req.file &&   req.file.avatar &&
  existsSync(`./public/img/users/${user.avatar}`) && 
  (user.avatar!=='defaultUserImg.jpg') &&
  unlinkSync(`./public/img/users/${user.avatar}`);
  /* actualiza datos de ubicacion */
  db.Address.update({
    address,
    city,
    province,
  },
  {
    where: {
    userId: req.session.userLogin.id
  }
  })
  /* actualiza datos de usuario */
  db.User.update({
    first_name,
    last_name,
    date,
    about,
    gender,
   avatar:  req.file ? req.file.filename : user.avatar

  },
  {
      where: {
    id: req.session.userLogin.id
  }
  }

).catch(error => console.log(error))


return res.render('userProfile',{
  
  ...user.dataValues})


})



}else{
 db.User.findByPk(req.session.userLogin.id)
 .then(user =>{
  
   return res.render('userProfile',{
    ...user.dataValues,
    old: req.body,
    errors: errors.mapped() 
   }) 
 }).catch(error => console.log(error))
 
}


}