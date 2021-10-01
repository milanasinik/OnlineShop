import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import { isAdmin, isAuth } from "../utils.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
  })
);

categoryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send.toString({ message: "Category not found" });
    }
  })
);

categoryRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = new Category({
      name: "sample name" + Date.now(),
      description: "sample description",
    });
    const createdCategory = await category.save();
    res.send({ message: "Category created", category: createdCategory });
  })
);

categoryRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
      category.name = req.body.name;
      category.description = req.body.description;
      const updatedCategory = await category.save();
      res.send({ message: "Category updated", category: updatedCategory });
    } else {
      res.status(404).send({ message: "Category not found" });
    }
  })
);

categoryRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      const deleteCategory = await category.remove();
      res.send({ message: "Category deleted", category: deleteCategory });
    } else {
      res.status(404).send({ message: "Category not found" });
    }
  })
);
export default categoryRouter;
