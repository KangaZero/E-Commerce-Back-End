const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const getAllTag = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    })
    res.status(200).json(getAllTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const getIdTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    })
    if (!getIdTag) {
      return res.status(404).json({message: "No such tag ID found!"})
    } else {
      res.status(200).json(getIdTag);
    }
  } catch (err) {
    res.status(500).json(err)
  }
  // find a single tag by its `id`

  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const postTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(postTag);
  } catch (err) {
    res.status(500).json(err)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      },
    });
    if (!updateTag) {
      return res.status(404).json({ message: 'No such tag ID found!' });
    } else {
      res.status(200).json(updateTag);
    }
  } catch (err) {
    res.status(500).json(err)
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      return res.status(404).json({ message: 'No such category ID found!' });
    } else {
      res.status(200).json(deleteTag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
