var data = $.getJSON("/data/product.json", function(json) {
    var productList = document.getElementById('products');
    for (var i = 0; i < json.product_arr.length; i++) {
        var productItem = document.createElement("div");
        productItem.setAttribute('class', 'item');
        productItem.setAttribute('display', 'inline-block');
        var img = document.createElement("img");
        img.setAttribute('src', '/img/'+json.product_arr[i].img+'.jpg');
        img.setAttribute('object-fit','contain');
        productItem.appendChild(img);
        var imgDiv = document.createElement("div");
        imgDiv.setAttribute('class', 'product-image')
        imgDiv.appendChild(img)
        productItem.appendChild(imgDiv);

        var name = document.createElement("h3");
        name.setAttribute('class', 'name');
        name.setAttribute('fontWeight', 'bold');
        name.innerText = json.product_arr[i].name
        productItem.appendChild(name);

        var price = document.createElement("p");
        price.setAttribute('class', 'price');
        var priceValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(
            json.product_arr[i].price/100,
        );
        price.innerText = priceValue;
        productItem.appendChild(price);

        if(((typeof(json.product_arr[i].was_price) == "number"))){
            var wasPrice = document.createElement("p");
            wasPrice.setAttribute('class', 'wasPrice');
            var wasPriceValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(
                json.product_arr[i].was_price/100,
            );
            wasPrice.innerHTML += 'Was <s>'+wasPriceValue+'</s>';
            productItem.appendChild(wasPrice);
        } else {
            var wasPrice = document.createElement("br");
            wasPrice.setAttribute('class', 'wasPrice');
            productItem.appendChild(wasPrice);

        }

        if(!((typeof(json.product_arr[i].reviews) == "boolean"))){
            var reviewScore = document.createElement("p");
            reviewScore.setAttribute('class', 'reviewScore');
            reviewScore.innerText = json.product_arr[i].reviews+'% Review Score';
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

    }
});
