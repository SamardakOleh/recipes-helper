import React, {Component} from 'react';
import RecipeForm from "../RecipeForm";

class FindRecipeForm extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            formRecipe: {}
        }
    }

    submit = (e) => {
        e.preventDefault();
        this.find();
    };

    onChange = (formRecipe) => {
        let state = {...this.state, formRecipe};
        this.setState(state);
    };

    find() {
        let filteredRecipes = this.props.recipes.filter(recipe => {
            let acceptable = false;
            let recipeProductNames = recipe.products.map(product=> {
                return product.name.toLowerCase();
            });
            let selectedProductNames = this.state.formRecipe.products.map(product=> {
                return product.name.toLowerCase();
            });

            for (let selectedProduct of selectedProductNames)
                if (!recipeProductNames.includes(selectedProduct))
                    return acceptable;
            if (recipe.name.includes(this.state.formRecipe.name) &&
                recipe.duration <= this.state.formRecipe.duration)
                    acceptable = true;
            return acceptable;
        });
        this.props.onFilter(filteredRecipes);
    }

    render() {
        return (
            <div>
                <RecipeForm
                    onChange={this.onChange}
                    buttonName={'Найти'}
                    submitHandler={this.submit}
                    forFilter={true}
                />
            </div>
        )
    }

    componentDidMount() {
    }
}

export default FindRecipeForm;