const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const getAllTransactions = async (request, response) => {
    const historicoTransacao = await prisma.historicotransacoes.findMany();
    response.status(200).json(historicoTransacao)
}

const createTransaction = async (request, response) => {
    const { usuario_id, troca_id } = request.body;
    const historicoTransacao = await prisma.historicotransacoes.create({
        data: { usuario_id, troca_id }
    })
    response.status(201).json(historicoTransacao)
}

const updateTransaction = async (request, response) => {
    const { usuario_id, troca_id } = request.body;
    const { id } = request.params;

    const id_historicoTransacao = parseInt(id)

    const historicoTransacao = await prisma.historicotransacoes.findFirst({
        where: { id: id_historicoTransacao }
    })

    if (historicoTransacao){
        const historicoTransacao = await prisma.historicotransacoes.update({
            data: { usuario_id,troca_id},
            where: { id: id_historicoTransacao }
        })
        response.status(200).json(historicoTransacao)
    } else {
        response.status(404).json("Histórico não encontrado")
    }
}

const deleteTransaction = async (request, response) => {
    const { id } = request.params;

    const id_historicoTransacao = parseInt(id)

    const historicoTransacao = await prisma.historicotransacoes.findFirst({
        where: { id: id_historicoTransacao }
})
    if (historicoTransacao){
        await prisma.historicotransacoes.delete({
            where: { id: id_historicoTransacao}
        })
        response.status(204).send()
    } else {
        response.status(404).json("Histórico não encontrado")
    }
}

module.exports = {
    getAllTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
}