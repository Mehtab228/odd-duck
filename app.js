let image1 = document.getElementById('product1');
image1.addEventListener('click', onClick);

let image2 = document.getElementById('product2');
image2.addEventListener('click', onClick);

let image3 = document.getElementById('product3');
image3.addEventListener('click', onClick);

let image = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let allProducts = [];
let currentRound = 0;


function Product(title, src, click = 0, shownImage = 0) {
  this.title = title;
  this.src = src;
  this.shownImage = shownImage;
  this.click = click;
  allProducts.push(this);
}

for (let i = 0; i < image.length; i++){
  new Product(`${image[i]}`, `assets/${image[i]}.jpeg`);
}
console.log(allProducts);

function getRandomItem() {
  let imgLen = image.length;
  let rand = Math.floor(Math.random() * imgLen);
  return rand;
}
function uniqueImageChecker (){
  let imageArray = [];
  while (imageArray.length < 3) {
    let item = getRandomItem();
    if (!imageArray.includes(item)) {
      imageArray.push(item);
    }
  }
  return imageArray;
}


function getImages() {
  let newImage = uniqueImageChecker();
  let product1 = allProducts[newImage[0]];
  let product2 = allProducts[newImage[1]];
  let product3 = allProducts[newImage[2]];
  let image1 = document.getElementById('product1');
  image1.src = product1.src;
  image1.title = product1.title;
  image1.alt = product1.alt;
  product1.shownImage++;
  let image2 = document.getElementById('product2');
  image2.src = product2.src;
  image2.title = product2.title;
  image2.alt = product2.alt;
  product2.shownImage++;
  let image3 = document.getElementById('product3');
  image3.src = product3.src;
  image3.title = product3.title;
  image3.alt = product3.alt;
  product3.shownImage++;
}
getImages();



function onClick(event) {
  let clickImages = event.target.title;
  for (let i = 0; i < allProducts.length; i++) {
    if (clickImages === allProducts[i].title){
      allProducts[i].click++;
      break;
    }
  }
  currentRound++;
  if (currentRound === 4){
    image1.removeEventListener('click', onClick, getImages);
    image2.removeEventListener('click', onClick, getImages);
    image3.removeEventListener('click', onClick, getImages);
    renderChart();
  }
  else {
    getImages();
  }
}

let productNames = [];
let productLikes = [];
let productViews = [];
function renderChart() {
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].title);
    productLikes.push(allProducts[i].click);
    productViews.push(allProducts[i].shownImage);
  }
  console.log(productLikes);
}


const data = {
  labels: productNames,
  datasets: [{
    label: 'Times Clicked',
    data: productLikes,
    backgroundColor: ['red'],
    borderColor: ['red'],
    borderWidth: 2
  },
  {
    label: 'Times Viewed',
    data: productViews,
    backgroundColor: ['blue'],
    borderColor: ['blue'],
    borderWidth: 2

  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};
let canvasChart = document.getElementById('myChart');
const myChart = new Chart(canvasChart, config);
