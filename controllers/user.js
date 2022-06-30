const { signup } = require('../services/user');
const { login } = require('../services/user');
const signupController = async(req, res)=>{
    const { email, password,name, phone} = req.body;

    await signup(email, password,name,phone);
    
    res.status(201).json({ message: 'SUCCESS'});

}




const loginController = async (req, res, next)=>{
    const { email, password} = req.body;
  
  try{
  const token = await login(email, password);
   res.json({token});
  } catch(err){
      const error = new Error("에러가 났습니다.")
      error.statusCode = 400;
      next(error);
  }

   
}

module.exports = { signupController, loginController };
