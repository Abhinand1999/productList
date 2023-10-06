import Product from "./productModel";
import Category from "../categories/categoriesModel";


const getCategoryById = async (categoryId: any) => {
  return await Category.findById(categoryId);
};


const updateCategoryCount = async (categoryId: any) => {
  const parentCategory = await getCategoryById(categoryId);

  if (!parentCategory) {
    return;
  }
  const count = parentCategory.count + 1;
  if (parentCategory.parent) {
    await Category.findOneAndUpdate(
      { _id: parentCategory._id },
      { $set: { count: count } },

    );

    //  update the parent's count
    await updateCategoryCount(parentCategory.parent);
  } else {
    await Category.findOneAndUpdate(
      { _id: parentCategory._id },
      { $set: { count: count } },

    );
  }
};


const createNewProduct = async (req: any, res: any, productData: any) => {
  try {
    const newProduct = new Product(productData);
    const product = await newProduct.save();
    console.log('Product saved:', product);
   
    return product;
  } catch (error) {
    console.error('Error saving product:', error);
    return null;
  }
};




// create product
const createProduct = async (req: any, res: any) => {
  const categoryId = req.body.CategoryID;
  const ProductName = req.body.ProductName;
  const productData = {
    ProductName: ProductName,
    categoryId: categoryId,
  };

  try {

    const product = await createNewProduct(req, res, productData);

    if (product) {
      const parentCategory: any = await getCategoryById(categoryId);
      console.log("parentCategory", parentCategory);

      if (parentCategory.parent) {

        await updateCategoryCount(categoryId);
      }
      res.status(200).json({ message: 'Product created successfully', product });
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Error creating product' });
  }

};





// viewproduct

const viewproduct = async (req: any, res: any) => {
  try {
    let condition
    if (req.query.categoryID) {
      condition = { categoryId: req.query.categoryID }
    }
    else {
      condition = {}
    }
    const allProduct = await Product.find(condition);
    res.status(200).json({ allProduct });
    console.log(allProduct)
  }
  catch (err) {
    res.json(err)
  }
}







export default { createProduct, viewproduct }