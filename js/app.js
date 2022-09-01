const loadData = async () => {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a");
    const data = await response.json();
    displayData(data.drinks);

    categoryFilterLists('filter-by-cat', 'c');
    categoryFilterLists('filter-by-glass', 'g');
    categoryFilterLists('filter-by-ingredients', 'i');
    categoryFilterLists('filter-by-alchoholic', 'a');
}

const categoryFilterLists = async (target, filterBy) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${filterBy}=list`);
    const data = await response.json();
    displayCategoryFilterLists(data.drinks, target, filterBy);
}
const displayCategoryFilterLists = (lists, target, filterBy) => {
    const filterByCatField = document.getElementById(target);

    lists.forEach(list => {
        const values = Object.values(list);
        const [listName] = values;
        const li = document.createElement('li');
        li.innerHTML = `
            <a class="dropdown-item" href="#" onclick="loadByFilter('${filterBy}', '${listName}')">${listName}</a>
        `;
        filterByCatField.appendChild(li);
    });
}





const displayData = (drinks) => {
    const drinksContainer = document.getElementById('display-drinks-container');
    console.log(drinks);
    drinksContainer.textContent = ``;
    drinks.forEach(drink => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${drink.strDrink}</h5>
                    <p class="card-text">${drink.strInstructions ? (drink.strInstructions.length > 60 ? drink.strInstructions.slice(0, 60) : drink.strInstructions) : "No instructions"}</p>
                </div>
            </div>
        `;
        drinksContainer.appendChild(div);
    });

}

const loadByFilter = async (filterBy, listName) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filterBy}=${listName}`;

    const response = await fetch(url);
    const data = await response.json();
    displayData(data.drinks);
}
loadData();