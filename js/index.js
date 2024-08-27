// index.js

// Fetch data from menu.json
fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        generatePopularCoffeeCards(data);
        generatePopularProductCards(data);
    })
    .catch(error => console.error('Error fetching menu data:', error));

// Function to generate popular coffee cards
function generatePopularCoffeeCards(data) {
    const coffeeSection = document.querySelector('.coffee-cards');
    const coffeeItems = data.menu.find(category => category.category === "Coffee").items;

    // Filter popular coffee items and limit to 3 items
    const popularCoffeeItems = coffeeItems.filter(item => item.isPopular).slice(0, 3);

    popularCoffeeItems.forEach(item => {
        const coffeeCard = document.createElement('div');
        coffeeCard.classList.add('coffee-card');
        coffeeCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">$${item.price}</span>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        `;
        coffeeSection.appendChild(coffeeCard);
    });
}

// Function to generate popular product cards
function generatePopularProductCards(data) {
    const productSection = document.querySelector('.product-cards');
    const productItems = data.menu.find(category => category.category === "Products").items;

    // Filter popular product items and limit to 3 items
    const popularProductItems = productItems.filter(item => item.isPopular).slice(0, 3);

    popularProductItems.forEach(item => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">$${item.price}</span>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        `;
        productSection.appendChild(productCard);
    });

}

// google chart
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Americano', 3],
      ['Latte', 1],
      ['Affogato', 1],
      ['Mocha', 1],
      ['Nitro Coffee', 2]
    ]);

    // Set chart options
    var options = {'title':'Best Coffees based on rating',
                   'width':600,
                   'height':400};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);

}