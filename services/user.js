const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUserByEmail, createUser } = require('../models/user')
const { createError } = require('../module/createError');

const salt = bcrypt.genSaltSync();


async function signup(email, password,name,phone){
    if(password.length <8) {
        const error = createError('PASSWORD_TOO_SHORT',400);
        throw error; 
    }

    const user = await getUserByEmail(email)
    if (user){
        const error = createError('EXISTING_USER',409);
       throw error;         
        
    }

    const createUserDto ={
        email,name,phone,
        password: bcrypt.hashSync( password, salt),
    };

    await createUser(createUserDto);
}

async function login(email, password){
   console.log("email: ", email)
   console.log("password: ",password)
    if(!email.includes('@')){
        res.status(400).json({ message: 'error'});
        return;
    }

    if(password.length < 8){
        res.status(400).json({ message: 'error'});
        return;

    }

   const user = await getUserByEmail(email);
    if(bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({id: user.id},process.env.SECRET_KEY,{
          expiresIn: '1d',
        })
        // res.status(201).json({ message: 'SUCCESS'});
       const decoded = jwt.verify(token, process.env.SECRET_KEY); 
       return token;
       
    } else{
        const error = createError('LOGIN_FAIL',400)
        throw error;
}
}
module.exports = { signup, login }; 