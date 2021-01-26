'use strict'

var Images = [];
var Indexes = [];

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
new ProductImage('assests/boots.jpg', 'boots');
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

  // var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  // var centerIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  // var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  


//renders the images to the HTML
function renderImages(leftImage, centerImage, rightImage) {
  leftImageDOM.src = leftImage.image;
  // leftProductImage.alt =;
  leftImage.timesShown++;
  // leftProductImage.setAttribute('product-container', 'left-image');

  centerImageDOM.src = centerImage.image;
  // centrProductImage.alt =;
  centerImage.timesShown++;
  // centerProductImage.setAttribute('product-container', 'left-image');

  rightImageDOM.src = rightImage.image;
  // rightProductImage.alt =;
  rightImage.timesShown++;
  // rightProductImage.setAttribute('product-container', 'left-image');

}

//variable randomIndex is generated from function generateRandomProducts
var randomIndex = generateRandomProducts();
renderImages(randomIndex[0], randomIndex[1], randomIndex[2]);

//define eventListener to know when an image is clicked
productContainer.addEventListener('click', function(event ){ //annonymous function
  console.log(event.target.id); //the actual item was clicked

  for (var i = 0; i < ProductImage.allImages.length; i++) {
    if (event.target.src.includes(ProductImage.allImages[i].image)) {
      ProductImage.allImages[i].timesClicked++;
      console.log(ProductImage.allImages[i]);
    }
  }

  var newProducts = generateRandomProducts();
  renderImages(newProducts [0], newProducts [1], newProducts[2]);
});