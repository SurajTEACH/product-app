import Product  from "../models/Product.js";

// create product

export const createProduct = async (req, res)=>{
      const {name, price}  =  req.body;

      try {
         const product  = await Product.create({
              name,
              price,
              user:req.user
         });
         res.json(product);
      } catch (error) {
        res.status(500).json({message:"Duplicate product not allowed"});
      }
};

// get products

export const getProducts = async (req, res) =>{
       const products = await Product.find({user:req.user});
        res.json(products);
}

// search products by name

export const  searchProducts = async (req, res) =>{
      const {name} = req.query;

      const products = await Product.find({
             user:req.user,
             name:{$regex:name, $options:'i'}
      });

      res.json(products);
}

// update product

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const product = await Product.findOneAndUpdate(
    { _id: id, user: req.user },
    { name, price },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// delete product

export const deleteProduct = async (req, res) =>{
      const {id} = req.params;

      try { 
          await Product.findOneAndDelete({_id:id, user:req.user});
      }
      catch(error){
           return res.status(404).json({message:"Product not found"});
      }
      
      res.json({message:"Product deleted"});
} 