const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await prisma.usuarios.findUnique({
            where: { email }
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.SECRET_JWT, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = { login };

