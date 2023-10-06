import React, { Component } from 'react';
import axios from 'axios';
import './AddCategory.css'


class AddCategory extends Component {


  state = {
    categories: [],

  };
  // list the category
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


  // ...........create for catogory.........

  handleSubmit = async (e) => {
    e.preventDefault();
    const parentValue = e.target.parent.value;
    const parent = parentValue === 'null' ? null : parentValue;
    const name = e.target.name.value;

    try {

      const response = await axios.post('http://localhost:3000/category/create', {
        parent,
        name,
      });
      console.log('API response:', response.data);
      alert('Category created successfully')

      e.target.reset();
    }
    catch (error) {

      console.error('API error:', error);
      alert('Failed to create category')
    }
  }

  //..... back navigation...
  handleGoBack = () => {
    window.history.back();
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h1>Add Category</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="label-input-group">
            <label htmlFor="category">Category:</label>
            <select id="parent" name="parent">
              <option value="null">---</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="label-input-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="name" name="name" />
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

export default AddCategory;
