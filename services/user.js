const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const { getUserByEmail, createUser } = require('../models/user');
const { createError } = require('../module/createError');

const salt = bcrypt.genSaltSync();

async function signup(email, password, name, phone) {
  if (password.length < 8) {
    const error = createError('PASSWORD_TOO_SHORT', 400);
    throw error;
  }

  const user = await getUserByEmail(email);
  if (user) {
    const error = createError('EXISTING_USER', 409);
    throw error;
  }

  const createUserDto = {
    email,
    name,
    phone,
    password: bcrypt.hashSync(password, salt),
  };

  await createUser(createUserDto);
}

async function login(email, password) {
  // if(!email.includes('@')){
  //     return res.status(400).json({ message: 'error'});
  // }

  // if(password.length < 8){
  //      return res.status(400).json({ message: 'error'});
  // }

  const user = await getUserByEmail(email);
  if (!user) {
    const error = createError('NOT EXISTING_USER', 409);
    throw error;
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
    return token;
      await prisma.$queryRaw`
    select 
        email
    from users
       where password=token;
    `;
    console.log("email: ",email)
  } else {
    const error = createError('LOGIN_FAIL', 400);
    throw error;
  }
}
module.exports = { signup, login };
