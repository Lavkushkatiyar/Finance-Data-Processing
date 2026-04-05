const { z } = require("zod");

const createCategorySchema = z.object({
  name: z.string().min(2),
  type: z.enum(["INCOME", "EXPENSE"]),
}).strict();

const categoryIdParamSchema = z.object({
  id: z.string().min(1),
}).strict();

module.exports = {
  createCategorySchema,
  categoryIdParamSchema,
};
