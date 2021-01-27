'use strict'

var Images = [];
var Indexes = [];
var TotalClicks = 0;

function ProductImage(image, name) {
  this.timesClicked = 0;
  this.timesShown= 0;
  this.image = image;
  this.name = name; 

ProductImage.allImages.push(this);

}

ProductImage.allImages = [];

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
new ProductImage('assets/wine-glass.jpg');
console.log(ProductImage.allImages);

var productContainer = document.getElementById('product-container');
var leftImageDOM = document.getElementById('left-image');
var centerImageDOM = document.getElementById('center-image');
var rightImageDOM = document.getElementById('right-image');

function generateRandomProducts() {

  for (var i = 0; i < 3; i++) {
    var randomNumber = Math.floor(Math.random() * ProductImage.allImages.length);
    while (Indexes.includes(randomNumber)){
      randomNumber = Math.floor(Math.random() * ProductImage.allImages.length);
    }
    Images[i] = ProductImage.allImages[randomNumber]
    // console.log(randomNumber)
  }
  return Images; 
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