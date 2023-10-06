import Category from "./categoriesModel"



// create catogery

const createCatogery=async(req:any,res:any)=>{
    const { name, parent } = req.body;

  try {
    if (parent) {
      
      const parentCategory = await Category.findById(parent);

      if (!parentCategory) {
        return res.status(404).json({ error: 'Parent category not found' });
      }

      const newCategory = new Category({ name, parent: parentCategory._id });
      parentCategory.children.push(newCategory._id);

      await newCategory.save();
      await parentCategory.save();

      return res.status(200).json("catogory created");
    } else {
      // If no parent is specified, create a top-level category
      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();

      return res.status(201).json(savedCategory);
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

// view all catogery with condition

const list=async(req:any,res:any)=>
{
    try {
      let condition
      if(req.query.categoryID){
        condition={_id:req.query.categoryID}
      }
      else
      {
        condition={parent: null}
      } 
      const allCategories = await Category.find(condition).populate('children');
      res.json(allCategories);
      } catch (err) {
        res.status(500).json({ err });
      }
    }


// view all catrgorys
const listAll=async(req:any,res:any)=>
{
  const allCategories = await Category.find()
  res.json(allCategories)
}
 
    
export default {createCatogery,list,listAll}