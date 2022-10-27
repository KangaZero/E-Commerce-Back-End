const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const getAllCategory = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(getAllCategory);
  } catch (err) {
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const getIdCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!getIdCategory) {
    return res.status(404).json({message: "No such category ID found!"})
    } else {
      res.status(200).json(getIdCategory);
    }
  } catch (err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const postCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(postCategory);
  } catch (err) {
    res.status(500).json(err)
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory) {
      return res.status(404).json({ message: 'No such category ID found!' });
    } else {
      res.status(200).json(updateCategory);
    }
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if (!deleteCategory) {
      return res.status(404).json({ message: 'No such category ID found!' });
    } else {
      res.status(200).json(deleteCategory);
    }
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
