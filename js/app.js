const loadData = async() => {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a");
    const data = await response.json();
    displayData(data.drinks);
    
    categoryFilterLists();
    glassesFilterLists();
    ingredientsFilterLists();
    alchoholicFilterLists();
}

const categoryFilterLists = async () => {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
    const data = await response.json();
    displayCategoryFilterLists(data.drinks);
}
const displayCategoryFilterLists = (catagories) => {
    const filterByCatField = document.getElementById('filter-by-cat');

    catagories.forEach(catagory => {
        // <li><a class="dropdown-item" href="#">Menu item</a></li>    
        const li = document.createElement('li');
        li.innerHTML = `
            <a class="dropdown-item" href="#">${catagory.strCategory}</a>
        `;
        filterByCatField.appendChild(li);
    });
}
const displayData = (drinks) => {
    const drinksContainer = document.getElementById('display-drinks-container');
    console.log(drinks);

    drinks.forEach(drink => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${drink.strDrink}</h5>
                    <p class="card-text">${drink.strInstructions}</p>
                </div>
            </div>
        `;
        drinksContainer.appendChild(div);
    });

}
loadData();