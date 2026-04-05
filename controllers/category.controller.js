const {
  createCategoryService,
  getCategoriesService,
  deleteCategoryService,
} = require("../services/category.service");

const createCategoryController = async (req, res) => {
  try {
    const data = req.validatedBody;
    const category = await createCategoryService(data);
    res.status(201).json({ message: "Category created", data: category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategoriesController = async (req, res) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.validatedParams;
    await deleteCategoryService(id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCategoryController,
  getCategoriesController,
  deleteCategoryController,
};
