import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class RecipeForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      products: [],
      hours: 0,
      minutes: 0,
      description: '',
      duration: Number.MAX_SAFE_INTEGER,
      productsInput: ''
    };
    this.props = props;
  }

  submit = e => {
    e.preventDefault();
    let state = { ...this.state };
    if (this.state.productsInput !== '') {
      state.products.push({ name: this.state.productsInput });
      state.productsInput = '';
    }

    let recipe = {
      _id: this.props.recipes.filterRecipe
        ? this.props.recipes.filterRecipe._id
        : null,
      name: state.name,
      products: state.products,
      duration: state.duration,
      description: state.description
    };
    this.setState(state, () => {
      this.props.submitHandler(recipe);
    });
  };

  handleProductsChange = e => {
    let product = {};
    product.name = e.target.value;
    let products = [...this.state.products];
    let state = { ...this.state };
    state.productsInput = e.target.value;
    this.setState(state);
    if (product.name.includes(',')) {
      product.name = product.name.slice(0, product.name.length - 1);
      e.target.value = '';
      products.push(product);
      state.productsInput = '';
    }
    this.setState(
      {
        products: products
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  handleTimeChange = e => {
    let state = { ...this.state };
    state[e.target.name] = +e.target.value;
    this.setState(state, () => {
      this.handleDurationChange();
    });
  };

  handleDurationChange = () => {
    let state = { ...this.state };
    state.duration = state.hours * 60 + state.minutes;
    this.setState(state, () => {
      this.props.onChange(this.state);
    });
  };

  handleTextChange = e => {
    let state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state, () => {
      this.props.onChange(this.state);
    });
  };

  deleteProductHandler(index) {
    let products = [...this.state.products];
    products.splice(index, 1);
    this.setState(
      {
        products: products
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  }

  onFileChange = e => {
    this.setState(
      {
        image: e.target.files[0]
      },
      () => {
        const fd = new FormData();
        fd.append('image', this.state.image, this.state.image.name);
        console.dir(fd);
        if (this.props.recipes.filterRecipe)
          axios
            .patch(
              `/api/recipes/${this.props.recipes.filterRecipe._id}/images`,
              fd,
              {
                headers: {
                  'content-type': 'multipart/form-data'
                }
              }
            )
            .then(r => console.log(r));
      }
    );
    console.dir(e.target.files);
  };

  parseDuration(duration) {
    let state = { ...this.state };
    state.hours = Math.floor(duration / 60);
    state.minutes = duration % 60;
    this.setState(state);
  }

  render() {
    const exampleText = {
      fontSize: '10px'
    };

    let recipeForFilter = this.props.recipes.editRecipe
      ? this.props.recipes.editRecipe
      : null;

    let products = (
      <div>
        {this.state.products.map((product, index) => {
          return (
            <div
              key={product._id}
              className={
                'badge badge-dark ml-1  align-items-center justify-content-stretch flex-nowrap'
              }
            >
              <span className={''}>{product.name}</span>
              <button
                onClick={() => this.deleteProductHandler(index)}
                type="button"
                className="close "
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          );
        })}
      </div>
    );

    let textArea = null;

    if (!this.props.forFilter) {
      textArea = (
        <div>
          <div>Описание</div>
          <textarea
            name="description"
            required={!this.props.forFilter}
            defaultValue={this.props.forEdit ? recipeForFilter.description : ''}
            onChange={e => this.handleTextChange(e)}
            className={'form_control'}
            rows={3}
            placeholder={'Описание'}
          />
        </div>
      );
    }

    let hours = [];
    for (let i = 1; i <= 5; i++) {
      hours.push(i);
    }

    let imgInput;

    if (!this.props.forFilter) {
      imgInput = (
        <div>
          <div>Фотографии</div>
          <input
            name={'img'}
            onChange={this.onFileChange}
            type={'file'}
            multiple={true}
            accept={'image/*,image/jpeg'}
            className={'form-control-file'}
          />
        </div>
      );
    }

    let hoursSelect = (
      <select
        name="hours"
        onChange={this.handleTimeChange}
        className={'form-control'}
        id={'find-recipe-form-hours'}
      >
        <option value={0}>Выбрать часы</option>
        {hours.map(hour => {
          return (
            <option selected={this.state.hours == hour} value={hour}>
              {hour}
            </option>
          );
        })}
      </select>
    );

    let minutsSelect = null;
    let minutes = [];
    for (let i = 15; i <= 45; i += 15) minutes.push(i);

    minutsSelect = (
      <select
        name="minutes"
        onChange={this.handleTimeChange}
        className={'form-control'}
        id={'find-recipe-form-minutes'}
      >
        <option value={0}>Выбрать минуты</option>
        {minutes.map(minute => {
          return (
            <option selected={this.state.minutes === minute} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>
    );
    return (
      <div className={'card'}>
        <div className={'card-body'}>
          <form
            onSubmit={e => this.submit(e)}
            className={'form-group flex-column d-flex '}
          >
            <span>Название рецепта</span>
            <input
              name="name"
              required={!this.props.forFilter}
              defaultValue={this.props.forEdit ? recipeForFilter.name : ''}
              onChange={this.handleTextChange}
              className={'form-control'}
              type={'text'}
              id={'find-recipe-form-name'}
              placeholder={'Название'}
            />
            <span>Продукты (разделять ',')</span>
            <span style={exampleText}>(Например: мясо, сыр)</span>
            <input
              value={this.state.productsInput}
              onChange={this.handleProductsChange}
              className={'form-control'}
              type={'text'}
              id={'find-recipe-form-products'}
              placeholder={'Продукты'}
            />
            {products}
            <span>Часы</span>
            {hoursSelect}
            <span>Минуты</span>
            {minutsSelect}
            {textArea}
            {imgInput}
            <button
              type={'submit'}
              className={'btn btn-outline-success mt-1 justify-content-center'}
            >
              {this.props.buttonName}
            </button>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.forEdit) {
      // this.parseDuration(this.props.recipe.duration);
      let state = { ...this.state };
      state.hours = Math.floor(this.props.recipes.editRecipe.duration / 60);
      state.minutes = this.props.recipes.editRecipe.duration % 60;
      state.duration = state.hours * 60 + state.minutes;
      state.products = this.props.recipes.editRecipe.products;
      state.name = this.props.recipes.editRecipe.name;
      state.description = this.props.recipes.editRecipe.description;
      this.setState(state);
    }
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(mapStateToProps)(RecipeForm);
