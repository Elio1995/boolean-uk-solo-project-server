import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const { productList } = require("../src/utils/mockData");

async function seed() {
  for (const product of productList) {
    await prisma.product.create({
      data: product,
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
