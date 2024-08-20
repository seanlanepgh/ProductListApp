getData();

function showData(productData) {
    var productList = document.getElementById('products');

    productData.forEach((item) => {
    var productItem = document.createElement("div");
    productItem.setAttribute('class', 'item');
    productItem.setAttribute('display', 'inline-block');
    var img = document.createElement("img");
    img.setAttribute('src', '/img/'+item.img+'.jpg');
    img.setAttribute('object-fit','contain');
    productItem.appendChild(img);
    var imgDiv = document.createElement("div");
    imgDiv.setAttribute('class', 'product-image')
    imgDiv.appendChild(img)
    productItem.appendChild(imgDiv);

    var name = document.createElement("h3");
    name.setAttribute('class', 'name');
    name.innerText = item.product_name
    productItem.appendChild(name);

    var price = document.createElement("p");
    price.setAttribute('class', 'price');
    var priceValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(
        item.price,
      );
    price.innerText = priceValue;
    productItem.appendChild(price);

   if(((typeof(item.was_price) == "number" && item.was_price !== 0 ))){
        var wasPrice = document.createElement("p");
        wasPrice.setAttribute('class', 'wasPrice');
        var wasPriceValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(
            item.was_price,
          );
        wasPrice.innerHTML += 'Was <s>'+wasPriceValue+'</s>';
        productItem.appendChild(wasPrice);
    } else {
        var wasPrice = document.createElement("br");
        wasPrice.setAttribute('class', 'wasPrice');
        productItem.appendChild(wasPrice);

    }
    if((typeof(item.reviews) == "number" && item.reviews !== 0)){
        var reviewScore = document.createElement("p");
        reviewScore.setAttribute('class', 'reviewScore');
        reviewScore.innerText = item.reviews+'% Review Score';
        productItem.appendChild(reviewScore);
    }
    else {
        var reviewScore = document.createElement("br");
        reviewScore.setAttribute('class', 'reviewScore');
        productItem.appendChild(reviewScore);
    }

    var button = document.createElement("button");
    button.setAttribute('class','button');
    button.innerText= "Add To Basket";
    productItem.appendChild(button);
    productList.appendChild(productItem);
    });
};
function getData() {
    fetch("http://127.0.0.1:8000/api/products")
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        showData(json)
    });
}
