const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  try {
    console.log("Ayo getting categories")
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through:ProductTag
      }]
    })
    res.json(tagData)
  } catch (error) {
    console.log(error)
  }
  // be sure to include its associated Product data
});

router.get('/:id',async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through:ProductTag
      }]
    })
    if (!tagData) {
      res.status(404).json({message:"no tag with that id exist."})
    }
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
      tag_name: req.body.tag_name,
      productIds: req.body.productIds
    })
      .then((tag) => {
        if (req.body.productIds.length) {
          const tagProductIdArr = req.body.productIds.map((product_id) => {
            return{
              tag_id: tag.id,
              product_id,
            }
          })
          return ProductTag.bulkCreate(tagProductIdArr)
        }
        res.status(200).json(tag);
      })
      .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err)
      })

});

router.put('/:id', (req, res) => {
  try {
    Tag.update(
      {
        tag_name:req.body.tag_name
      },
      {
        where:{
          id:req.params.id
        }
      }
    ) 
    .then((tag)=>{
      res.json(tag)
    })
    
  } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id',async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
