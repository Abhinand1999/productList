import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.css'

function Homepage() {

  const [data, setData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [categoryID, setCategoryID] = useState(null);

// .........list of catogory...........
  useEffect(() => {
    axios.get('http://localhost:3000/category/viewAll', {
      params: { categoryID: categoryID }
    })
      .then(response => {
        console.log("result==>", response.data)
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


// ..........list of product.....
  const fetchProducts = (categoryID) => {
    axios.get(`http://localhost:3000/product/viewAll`, {
      params: { categoryID: categoryID }
    })
      .then(response => {
        setProductList(response.data.allProduct);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };


// .........list of subcatogory.......
  const handleCategoryChange = (categoryID) => {
    setCategoryID(categoryID);
    fetchProducts(categoryID);

    axios.get('http://localhost:3000/category/viewAll', {
      params: { categoryID: categoryID }
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };




  return (
    <div className="page-container">
      <div className="header">
        <p><a href="/add-category">Add Category</a> | </p>
        <p><a href="/add-product">Add Product</a></p>
      </div>
      <div className="main-content">
        <div className="main-category">
          {data.map(item => (
            <p key={item.id}>
              <a href="#" onClick={() => handleCategoryChange(item._id)}>
                {item.name} ({item.count})
              </a>
            </p>
          ))}
        </div>
        <div className="subcategory">
          <h3>Subcategory</h3>
          <div className="subcategory-list-container">
            <div className="subcategory-list">
              {data.map(item => (
                item.children.map(subcategory => (
                  <p key={subcategory.id}>
                    <a href="#" onClick={() => handleCategoryChange(subcategory._id)}>
                      {subcategory.name} ({subcategory.count})
                    </a>
                  </p>
                ))
              ))}
            </div>
          </div>
        </div>

        <div className="product">
          <h3>Product</h3>
          <ul className="product-list">
            {productList.map(product => (
              <li key={product._id}>{product.ProductName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
