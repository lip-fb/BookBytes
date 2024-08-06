const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const getAllMessages = async (request, response) => {
    const chat = await prisma.mensagenschat.findMany();
    response.status(200).json(chat)
}

const createMessage = async (request,response) => {
    const {usuario_id, mensagem} = request.body ;
    const chat = await prisma.mensagenschat.create({
        data: { usuario_id, mensagem} 

    })
    response.status(201).json(chat)
}

module.exports = {
    getAllMessages,
    createMessage

}