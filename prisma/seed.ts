import { Contract, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const contracts: Contract[] = [
    {
      id: 1,
      name: "Contract One",
      userId: null,
    },
    {
      id: 2,
      name: "Contract Two",
      userId: null,
    },
  ];
  for (const contract of contracts) {
    const result = await prisma.contract.upsert({
      where: { id: contract.id },
      create: contract,
      update: contract,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
