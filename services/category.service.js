const prisma = require("../db/prisma");

const createCategoryService = async (data) => {
  const category = await prisma.category.create({
    data: {
      name: data.name,
      type: data.type,
    },
  });
  return category;
};

const getCategoriesService = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const deleteCategoryService = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) throw new Error("Category not found");
  
  await prisma.category.delete({
    where: { id: categoryId },
  });
};

module.exports = {
  createCategoryService,
  getCategoriesService,
  deleteCategoryService,
};
