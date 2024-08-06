const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const getAllTrades = async (request, response) => {
    try {
        const trocas = await prisma.trocas.findMany();
        response.status(200).json(trocas);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao buscar trocas.' });
    }
}

const createTrade = async (request, response) => {
    const { usuario_id, livro_id, status } = request.body;
    const novaTroca = await prisma.trocas.create({
        data: {usuario_id, livro_id, status, historicotransacoes: {
            create: []

            }

        }

    });
     return response.status(201).json(novaTroca);    
}

// VERIFICAR ENDPOINT 
const updateTrade = async (request, response) => {
    const { usuario_id, livro_id, status }  = request.body;
    const { id } = request.params;

    const id_troca = parseInt(id)

    const troca = await prisma.trocas.findFirst({
        where: { id: id_troca }
    })
    
    if(troca){
        const troca = await prisma.trocas.update({
            data: { usuario_id, livro_id, status },
            where: { id: id_troca}
        })
        response.status(200).json(troca)
    } else {
        response.status(404).json("Troca não encontrada")
    }

}

const deleteTrade = async (request, response) => {
    const { id } = request.params;

    const id_troca = parseInt(id)

    const troca = await prisma.trocas.findFirst({
        where: { id: id_troca }
    })

    if(troca){
        await prisma.trocas.delete({
            where: { id: id_troca }
        })
        response.status(204).send()
    } else {
        response.status(404).json("Troca não encontrada")
    }
}

module.exports = {
    getAllTrades,
    createTrade,
    updateTrade,
    deleteTrade
};