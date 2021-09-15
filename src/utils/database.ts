const { PrismaClient } = require("@prisma/client");

const dbClient = new PrismaClient();

export default dbClient;
