const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express');

async function getUserByEmail(email){
const [user] = await prisma.$queryRaw`
SELECT
     id, 
    email, 
    password
FROM users
WHERE email = ${email};
`;

return user;
}

async function createUser(createUserDTO){
    const { email, password,name,phone} = createUserDTO;

    await prisma.$queryRaw`
    INSERT INTO
        users(email, password,name,phone)
    VALUES 
        (${email}, ${password},${name},${phone});
    `;
};

module.exports = { getUserByEmail, createUser};