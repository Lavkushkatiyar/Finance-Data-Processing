const { prisma } = require("../utils.js")

const createRecordService = async (userId, data) => {
  const { amount, type, categoryId, date, notes } = data

  if (!amount || amount <= 0) {
    throw new Error("Invalid amount")
  }

  if (!["INCOME", "EXPENSE"].includes(type)) {
    throw new Error("Invalid type")
  }

  if (!categoryId) {
    throw new Error("categoryId is required")
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  })

  if (!category) {
    throw new Error("Invalid categoryId")
  }

  const record = await prisma.financialRecord.create({
    data: {
      amount,
      type,
      categoryId,
      userId,
      date: date ? new Date(date) : new Date(),
      notes
    }
  })

  return record
}

module.exports = { createRecordService }