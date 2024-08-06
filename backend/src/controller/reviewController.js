const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const getAllReviews = async (request, response) => {
    const avaliacao = await prisma.avaliacoes.findMany();
    response.status(200).json(avaliacao)
}

const createReview = async (request, response) => {
    const { usuario_id, nota, comentario } = request.body;
    const avaliacao = await prisma.avaliacoes.create({
        data: { usuario_id, nota, comentario }
    })
    response.status(201).json(avaliacao)
}

const updateReview = async (request, response) => {
    const { usuario_id, nota, comentario} = request.body;
    const { id } = request.params;

    const id_avaliacao = parseInt(id)

    const avaliacao = await prisma.avaliacoes.findFirst({
        where: { id: id_avaliacao}
    })

    if (avaliacao){
        const avaliacao = await prisma.avaliacoes.update({
            data: { usuario_id, nota, comentario },
            where: { id: id_avaliacao}
        })
        response.status(200).json(avaliacao)
    } else {
        response.status(404).json("Avaliação não encontrada")
    }
}

const deleteReview =async (request, response) => {
    const {id} = request.params;

    const id_avaliacao = parseInt (id)

    const avaliacao = await prisma.avaliacoes.findFirst({
        where: { id: id_avaliacao}
    })
    
    if (avaliacao){
        await prisma.avaliacoes.delete({
            where: { id: id_avaliacao}
        })
        response.status(204).send()
    } else {
        response.status(404).json("Histórico não encontrado")
    }
}

module.exports ={
    getAllReviews,
    createReview,
    updateReview,
    deleteReview,    
}