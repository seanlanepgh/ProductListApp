function intitalData() {
    $.getJSON("/data/product.json", function(json) {
        var productList = document.getElementById('products');
        var li = document.createElement("div");
        li.setAttribute('class', 'item')
        li.setAttribute('display', 'inline-block')
    
        for (var i = 0; i < json.product_arr.length; i++) {
            var li = document.createElement("div");
            li.setAttribute('class', 'item');
            li.setAttribute('display', 'inline-block');
            var img = document.createElement("img");
            img.setAttribute('src', '/img/'+json.product_arr[i].img+'.jpg');
            img.setAttribute('object-fit','contain');
            li.appendChild(img);
            var imgDiv = document.createElement("div");
            imgDiv.setAttribute('class', 'product-image')
            imgDiv.appendChild(img)
            li.appendChild(imgDiv);
    
            // var priceHolder = document.createElement("div");
            // priceHolder.setAttribute('class', 'priceHolder');
    
            var name = document.createElement("p");
            name.setAttribute('class', 'name');
            name.innerText = json.product_arr[i].name
            li.appendChild(name);
    
            var price = document.createElement("p");
            price.setAttribute('class', 'price');
            var priceValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(
                json.product_arr[i].price/100,
            );
            price.innerText = priceValue;
            li.appendChild(price);
    
           if(((typeof(json.product_arr[i].was_price) == "number"))){
                var wasPrice = document.createElement("p");
                wasPrice.setAttribute('class', 'wasPrice');
                var wasPriceValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(
                    json.product_arr[i].was_price/100,
                );
                wasPrice.innerHTML += 'Was <s>'+wasPriceValue+'</s>';
                li.appendChild(wasPrice);
            } else {
                var wasPrice = document.createElement("br");
                wasPrice.setAttribute('class', 'wasPrice');
                li.appendChild(wasPrice);
    
            }
    
            if(!((typeof(json.product_arr[i].reviews) == "boolean"))){
                var reviewScore = document.createElement("p");
                reviewScore.setAttribute('class', 'reviewScore');
                reviewScore.innerText = json.product_arr[i].reviews+'% Review Score';
                li.appendChild(reviewScore);
            }
            else {
                var reviewScore = document.createElement("br");
                reviewScore.setAttribute('class', 'reviewScore');
                li.appendChild(reviewScore);
            }
    
            var button = document.createElement("button");
            button.setAttribute('class','button');
            button.innerText= "Add To Basket";
            li.appendChild(button);
            // li.appendChild(priceHolder);
            productList.appendChild(li);
    
        }
    });

}
