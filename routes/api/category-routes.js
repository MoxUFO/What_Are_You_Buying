const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    console.log("Ayo getting categories")
    const categoryData = await Category.findAll({
      include: [{
        model: Product,
        include: [
          {
            model: Tag,
            through: ProductTag
          }
        ]
      }]
    })
    res.json(categoryData)
  } catch (error) {
    console.log(error)
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
