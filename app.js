'use strict'

// 1. check if products from storage is null, if not null, then use the results of that instead of making new objects. If null, call a function that makes all the new products, otherwise we're going to use our results instead of those objects. ***may need to do a for loop that passes each item through the new product image constructor again.

var Images = [];
var Indexes = [];
var TotalClicks = 0;

// constructor function, organize the coins/data
function ProductImage(image, name) {
  this.timesClicked = 0;
  this.timesShown= 0;
  this.image = image;
  this.name = name; 

ProductImage.allImages.push(this);
}

ProductImage.allImages = [];


function getMyTreasureFromStorage() {
  var productsFromStorage = localStorage.getItem('productArray');
  console.log(productsFromStorage);
  if (productsFromStorage === null){
    return null;
  }
  var parsedstoredTreasure = JSON.parse(productsFromStorage);
  return parsedstoredTreasure;
}

var storageResults = getMyTreasureFromStorage();
console.log(storageResults, 'storage-results');
if (storageResults === null) {
  // here I'm going to call the function that makes all of my products
  makeProducts();
}
else {
  // my storage results are going to be ProductImage.allImages.array 
  ProductImage.allImages = storageResults 
}

function makeProducts() {
//here I am creating all my products
new ProductImage('assets/bag.jpg', 'bag');
new ProductImage('assets/banana.jpg', 'banana');
new ProductImage('assets/bathroom.jpg', 'bathroom');
new ProductImage('assets/boots.jpg', 'boots');
new ProductImage('assets/breakfast.jpg', 'breakfast');
new ProductImage('assets/bubblegum.jpg', 'bubblegum');
new ProductImage('assets/chair.jpg', 'chair');
new ProductImage('assets/cthulhu.jpg', 'cthulhu');
new ProductImage('assets/dog-duck.jpg', 'dog-duck');
new ProductImage('assets/dragon.jpg', 'dragon');
new ProductImage('assets/pen.jpg', 'pen');
new ProductImage('assets/pet-sweep.jpg', 'pet-sweep');
new ProductImage('assets/scissors.jpg', 'scissors');
new ProductImage('assets/shark.jpg', 'scissors');
new ProductImage('assets/sweep.png', 'sweep');
new ProductImage('assets/tauntaun.jpg', 'tauntaun');
new ProductImage('assets/unicorn.jpg', 'unicorn');
new ProductImage('assets/usb.gif', 'usb');
new ProductImage('assets/water-can.jpg', 'water-can');
new ProductImage('assets/wine-glass.jpg', 'wine-glass');
console.log(ProductImage.allImages);
}

var productContainer = document.getElementById('product-container');
var leftImageDOM = document.getElementById('left-image');
var centerImageDOM = document.getElementById('center-image');
var rightImageDOM = document.getElementById('right-image');


function generateRandomProducts(){
  var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);

  while (rightIndex === leftIndex){
    rightIndex = Math.floor(Math.random() * ProductImage.length);
  }
  while( middleIndex === rightIndex || middleIndex === leftIndex){
    middleIndex  = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  var leftImage = ProductImage.allImages[leftIndex];
  var middleImage = ProductImage.allImages[middleIndex];
  var rightImage = ProductImage.allImages[rightIndex];
  
return [leftImage, middleImage, rightImage];
}


//renders the images to the HTML
function renderImages(leftImage, centerImage, rightImage) {
  leftImageDOM.src = leftImage.image;
  leftImageDOM.alt = leftImage.name;
  leftImage.timesShown++;

  centerImageDOM.src = centerImage.image;
  centerImageDOM.alt = centerImage.image;
  centerImage.timesShown++;

  rightImageDOM.src = rightImage.image;
  rightImageDOM.alt = rightImage.image;
  rightImage.timesShown++;

}

//variable randomIndex is generated from function generateRandomProducts
var randomIndex = generateRandomProducts();
renderImages(randomIndex[0], randomIndex[1], randomIndex[2]);

//define eventListener to know when an image is clicked
productContainer.addEventListener('click', addClickCount);

function addClickCount(event) { 
  console.log(event); //the actual item was clicked

  for (var i = 0; i < ProductImage.allImages.length; i++) {
    console.log(event.target.image)
    if (event.target.alt === ProductImage.allImages[i].image) {
      ProductImage.allImages[i].timesClicked++;
      TotalClicks++;
      console.log(ProductImage.allImages[i], TotalClicks);
    }
  }

  console.log(TotalClicks)
  if(TotalClicks === 25){
    productContainer.removeEventListener('click', addClickCount);
    generateData();
    generateChart();
    let productsToBeStored = JSON.stringify(ProductImage.allImages)
    localStorage.setItem('productArray', productsToBeStored);
  }

  var newProducts = generateRandomProducts();
  renderImages(newProducts [0], newProducts [1], newProducts[2]);
};


function resultList(){
  var myList = document.getElementById('listResults');
  for(var i=0; i < ProductImage.allImages.length; i++){
    var liEl = document.createElement('li');
    liEl.innerText = ProductImage.allImages[i].name + ProductImage.allImages[i].timesClicked;
    console.log(ProductImage.allImages[i])
    myList.appendChild(liEl)

  // console.log(liEl.innerText)
  }
}

var buttonClicked = document.getElementById('addButton');
buttonClicked.addEventListener('click', resultList);

//chart element
var ctx = document.getElementById('myChart').getContext('2d');
var timesClicked = [];
var timesShown = [];
var productName = [];

function generateData(){
  for (var i = 0; i < ProductImage.allImages.length; i++) {
    timesClicked.push(ProductImage.allImages[i].timesClicked);
    timesShown.push(ProductImage.allImages[i].timesShown);
    productName.push(ProductImage.allImages[i].name);
  }
}
console.log(productName, 'product name array');
console.log(timesShown, 'times shown array');
console.log(timesClicked, 'times clicked array');

function generateChart() {
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productName,
        datasets: [{
            label: 'Times Clicked',
            data: timesClicked,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        },
        {
          label: 'Times Shown',
          data: timesShown,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}


//started 1/27/2021


// user visits webpage- do I currently have products in local storage? If local storage is emtpy return value of variable is null 
//if no, then create all products array--- no, returned null
//do stuff with product array

//if yes, we have product array, then let product array be what you have in local storage

//1. generate results
//2. generate charts
//3. store current product array in local storage


// ////Below is setting local storage
// let string = JSON.stringify(someArray)
// localStorage.setItem('anyKey', string)
// //Below is getting it out of local storage
// let stringReturn = localStorage.getItem('anyKey')
// let parsedSomeArray = JSON.parse(stringReturn)

// function storeObject(obj) {
//   var stringify = JSON.stringify(obj);
//   localStorage.setItem('productArray', stringify);

// }

// function fetchObject(key) {
//   var stringify = localStorage.getItem(key);
//   return JSON.parse(stringify);
// }

