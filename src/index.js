"use strict";

import actionPage from "./modules/actionPage";
import addCart from "./modules/addCart";
import getData from "./modules/getData";
import renderCards from "./modules/renderCards";
import renderCatalog from "./modules/renderCatalog";
import toggleCart from "./modules/toggleCart";
import toggleCheckBox from "./modules/toggleCheckBox";

getData().then((data) => {
    renderCards(data);
    renderCatalog();

    toggleCheckBox();
    actionPage();

    addCart();
    toggleCart();
});


