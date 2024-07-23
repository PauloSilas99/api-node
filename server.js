import express from 'express'
const app = express();
app.use(express.json());

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// const users = []; usado quando não tinha banco de dados

app.get('/usuarios', async (req,res)=>{
    const users = await prisma.user.findMany()
    res.status(200).json(users);
});

app.post('/usuarios', async (req,res)=>{
    // users.push(req.body) usado quando não tinha banco de dados
    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
})

app.put('/usuarios/:id', async (req,res)=>{
    // users.push(req.body) usado quando não tinha banco de dados
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
})

app.delete('/usuarios/:id', async (req,res)=>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(201).json({message:'Usuário deletado com sucesso!'});
})

app.listen(3000,()=>{
    console.log('Servidor rodando!')
})