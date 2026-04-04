const { prisma } = require("../utils.js")

const createRecordService = async (userId, data) => {
  const { amount, type, categoryId, date, notes } = data

  if (!amount || amount <= 0) throw new Error("Invalid amount")

  if (!["INCOME", "EXPENSE"].includes(type)) throw new Error("Invalid type")


  if (!categoryId) throw new Error("categoryId is required")

  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  })

  if (!category) throw new Error("Invalid categoryId")

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

const getRecordsService = async (user, query) => {
  const { type, categoryId, from, to } = query

  const filters = {}

  if (type) filters.type = type

  if (categoryId) filters.categoryId = categoryId

  if (from || to) filters.date = {}

  if (from)  filters.date.gte = new Date(from)
  

  if (to) filters.date.lte = new Date(to)

  const records = await prisma.financialRecord.findMany({
    where: filters,
    include: {
      Category: true
    },
    orderBy: {
      date: "desc"
    }
  })
  return records
}


module.exports = { createRecordService, getRecordsService }