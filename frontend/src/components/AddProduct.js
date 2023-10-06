import React, { Component } from 'react';
import axios from 'axios';
import './AddCategory.css'
class AddProduct extends Component {
  state = {
    categories: [],
    successMessage: ''
  };
  // list category
  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:3000/category/view');
      if (response.status === 200) {
        this.setState({ categories: response.data });
      }
    } catch (error) {
      console.error('API error:', error);
    }
  }

  // ...........create product..........
  handleSubmit = async (e) => {
    e.preventDefault();
    const CategoryID = e.target.CategoryID.value;
    const ProductName = e.target.ProductName.value;
    try {
      const response = await axios.post('http://localhost:3000/product/create', {
        CategoryID,
        ProductName,
      });
      console.log('API response:', response.data);

      alert('Category created successfully')
      e.target.reset();
    } catch (error) {

      console.error('API error:', error);
      alert('Category created Failed')
    }
  }

  //.....back navigation...
  handleGoBack = () => {
    window.history.back();
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h1>Add Product</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="label-input-group">
            <label htmlFor="category">Category:</label>
            <select id="CategoryID" name="CategoryID">
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="label-input-group">
            <label htmlFor="title">Product:</label>
            <input type="text" id="ProductName" name="ProductName" />
          </div>
          <div className="buttonclass">
            <button onClick={this.handleGoBack}>Back</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProduct;
