const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

const getAllBooks = async (request, response) => {
  const livro = await prisma.livros.findMany();
  response.status(200).json(livro);
};

const createBook = async (request, response) => {
  const { usuario_id, titulo, autor, genero, ano_publicacao } = request.body;
  const imagem = request.file ? path.join('src/img', request.file.filename) : null;

  const livro = await prisma.livros.create({
    data: { usuario_id, titulo, autor, genero, ano_publicacao, imagem },
  });
  response.status(201).json(livro);
};

const updateBook = async (request, response) => {
  const { usuario_id, titulo, autor, genero, ano_publicacao } = request.body;
  const { id } = request.params;
  const imagem = request.file ? path.join('src/img', request.file.filename) : null;

  const id_livro = parseInt(id);

  const livro = await prisma.livros.findFirst({
    where: { id: id_livro },
  });

  if (livro) {
    const data = { titulo, autor, genero, ano_publicacao };
    if (imagem) data.imagem = imagem;

    const updatedLivro = await prisma.livros.update({
      data,
      where: { id: id_livro },
    });
    response.status(200).json(updatedLivro);
  } else {
    response.status(404).json("Livro não encontrado");
  }
};

const deleteBook = async (request, response) => {
  const { id } = request.params;

  const id_livro = parseInt(id);

  const livro = await prisma.livros.findFirst({
    where: { id: id_livro },
  });

  if (livro) {
    await prisma.livros.delete({
      where: { id: id_livro },
    });
    response.status(204).send();
  } else {
    response.status(404).json("Livro não encontrado");
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
};
