// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
});
// Products belongsTo Category

Category.hasMany(Product, {
  foreignKey:  "category_id"
});
// Categories have many Products

Product.belongsToMany(Tag, {
  as: "tag_product_id",
  foreignKey: "product_id",
  through: ProductTag,
});
// Products belongToMany Tags (through ProductTag)

Tag.belongsToMany(Product, {
  as: "product_tag_id",
  foreignKey: "tag_id",
  through: ProductTag,
});
// Tags belongToMany Products (through ProductTag)



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
