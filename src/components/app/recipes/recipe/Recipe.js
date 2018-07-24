import React, {Component} from 'react';
import './recipe.css';
import axios from 'axios'
import {Link} from "react-router-dom";

class Recipe extends Component {

    deleteRecipe = () => {
        axios.delete(`http://localhost:4000/recipes/${this.props.recipe._id}`).then(() => {
            this.props.onDeleteRecipe();
        })
    };

    render() {
        let products = (
            <div className={'d-flex flex-wrap'}>
                Продукты: {this.props.recipe.products.map(product => {
                return <div key={product._id} className={''}>&nbsp;{product.name.toLowerCase()}</div>
            })}
            </div>
        );

        let duration = this.parseDuration(this.props.recipe.duration);
        let durationComponent = (
            <div>Длительность: {duration.hours !== 0 ? `${duration.hours} часов` : null} {duration.realMinutes !== 0 ? `${duration.realMinutes} минут` : null}</div>
        );

        let description = (
            <div>Способ приготовления: {this.props.recipe.description}</div>
        );

        let recipeFooter = null;

        if (this.props.forUser) {
            recipeFooter = (
                <div className={'card-footer d-flex justify-content-between'}>
                    <Link to={'/recipes/my/edit'}>
                        <button onClick={() => this.setRecipeInLocalStorage(this.props.recipe)}
                                className={'btn btn-outline-warning'}>Редактировать
                        </button>
                    </Link>
                    <div/>
                    <button onClick={() => this.deleteRecipe()} className={'btn btn-outline-danger'}>Удалить</button>
                </div>
            );
        }

        return (
            <div className={'col-lg-6 col-sm-11'}>
                <div className={'card flex-wrap recipe-card m-2'}>
                    <div className={'card-header d-flex justify-content-center'}>
                        {this.props.recipe.name}
                    </div>
                    <div className={'card-body'}>
                        <div>{description}</div>
                        <div className={'d-flex justify-content-between mt-1'}>
                            {products}
                            {durationComponent}
                        </div>
                    </div>
                    {recipeFooter}
                </div>
            </div>
        )
    }


    parseDuration(minutes) {
        let hours = Math.floor(minutes / 60);
        let realMinutes = minutes % 60;
        return {
            hours: hours,
            realMinutes: realMinutes
        }
    }

    componentDidMount() {
    }


    setRecipeInLocalStorage = (recipe) => {
        localStorage.setItem('recipeForEdit', JSON.stringify(recipe))
    };

}

export default Recipe;