const { prisma } = require("../utils.js");

const createRecordService = async (userId, data) => {
  const { amount, type, categoryId, date, notes } = data;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) throw new Error("Invalid categoryId");

  const record = await prisma.financialRecord.create({
    data: {
      amount,
      type,
      categoryId,
      userId,
      date: date ? new Date(date) : new Date(),
      notes,
    },
  });

  return record;
};

const getRecordsService = async (user, query) => {
  const { type, categoryId, from, to } = query;

  const filters = {};

  if (user.role !== "ADMIN") filters.userId = user.id;

  if (type) filters.type = type;

  if (categoryId) filters.categoryId = categoryId;

  if (from || to) filters.date = {};

  if (from) filters.date.gte = new Date(from);

  if (to) filters.date.lte = new Date(to);

  const records = await prisma.financialRecord.findMany({
    where: filters,
    include: {
      Category: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return records;
};

const updateRecordService = async (recordId, user, data) => {
  const existing = await prisma.financialRecord.findUnique({
    where: { id: recordId },
  });

  if (!existing) throw new Error("Record not found");

  const isOwner = existing.userId === user.id;
  const isAdmin = user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw new Error("Not allowed to update this record");
  }

  const updated = await prisma.financialRecord.update({
    where: { id: recordId },
    data: {
      amount: data.amount ?? existing.amount,
      type: data.type ?? existing.type,
      categoryId: data.categoryId ?? existing.categoryId,
      date: data.date ? new Date(data.date) : existing.date,
      notes: data.notes ?? existing.notes,
    },
  });

  return updated;
};

const deleteRecordService = async (recordId, user) => {
  const existing = await prisma.financialRecord.findUnique({
    where: { id: recordId },
  });

  if (!existing) throw new Error("Record not found");

  const isOwner = existing.userId === user.id;
  const isAdmin = user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw new Error("Not allowed to delete this record");
  }

  await prisma.financialRecord.delete({
    where: { id: recordId },
  });
};

module.exports = {
  createRecordService,
  getRecordsService,
  updateRecordService,
  deleteRecordService,
};
