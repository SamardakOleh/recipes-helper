import React, { Component } from 'react';
import Recipes from '../Recipes';
import { Link, Route } from 'react-router-dom';

import './my-recipes.css';

function MyRecipes({ authService }) {
  if (!authService.isLoggedIn())
    return (
      <div className={'my-recipes'}>
        Для доступа к своим рецептам вам нужно авторизироваться.
        <button className={'btn btn-success'} onClick={authService.login}>
          Войти
        </button>
      </div>
    );

  return (
    <div>
      <div className={'mt-2'}>
        <Link className={'btn btn-outline-success ml-2'} to={`/recipes/my/add`}>
          Добавить
        </Link>
      </div>
      <Recipes authService={authService} forUser={true} />
    </div>
  );
}

export default MyRecipes;
