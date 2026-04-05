const { z } = require("zod");

const createRecordSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  categoryId: z.string().min(1),
  date: z.string().optional(),
  notes: z.string().optional(),
});

const updateRecordSchema = z.object({
  amount: z.number().positive().optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  categoryId: z.string().min(1).optional(),
  date: z.string().optional(),
  notes: z.string().optional(),
});

const getRecordsQuerySchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  categoryId: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});
const recordIdParamSchema = z.object({
  id: z.string().min(1),
});

module.exports = {
  createRecordSchema,
  updateRecordSchema,
  getRecordsQuerySchema,
  recordIdParamSchema,
};
