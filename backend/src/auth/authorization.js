const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authorization = (roles) => {
    return async (req, res, next) => {
        const { id } = req.user;

        try {
            const usuario = await prisma.usuarios.findUnique({
                where: { id }
            });

            if (!usuario || !roles.includes(usuario.role)) {
                return res.status(403).json({ error: 'Acesso negado.' });
            }

            next();
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };
};

module.exports = authorization;
