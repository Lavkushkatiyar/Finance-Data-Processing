const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDashboardSummaryService = async (user) => {
  const where = {};

  if (user.role !== "ADMIN") {
    where.userId = user.id;
  }

  const income = await prisma.financialRecord.aggregate({
    where: { ...where, type: "INCOME" },
    _sum: { amount: true },
  });

  const expense = await prisma.financialRecord.aggregate({
    where: { ...where, type: "EXPENSE" },
    _sum: { amount: true },
  });

  const categorySummary = await prisma.financialRecord.groupBy({
    by: ["categoryId"],
    where,
    _sum: { amount: true },
  });

  const recent = await prisma.financialRecord.findMany({
    where,
    include: { Category: true },
    orderBy: { date: "desc" },
    take: 5,
  });

  const totalIncome = income._sum.amount || 0;
  const totalExpense = expense._sum.amount || 0;

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
    categorySummary,
    recent,
  };
};

module.exports = { getDashboardSummaryService };
