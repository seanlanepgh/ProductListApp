
function sortPrice() {
    removeProducts();
    $.getJSON("/data/product.json", function(json) {
        let indexedArray = json.product_arr.map((item, index) => (
            { index, value: item }
        ));
        indexedArray.sort((a, b) => comparePrice(a,b));
        
        let sortedPrice = indexedArray.map((item) => item.value);
        showData(sortedPrice);
    });    
};

function sortSavings() {
    removeProducts();
    $.getJSON("/data/product.json", function(json) {
        replaceBooleans(json);

        let indexedArray = json.product_arr.map((item, index) => ({ index, value: item }));

        indexedArray.sort((a, b) => compareWasPrice(a,b));
        
        let sortedSavings = indexedArray.map((item) => item.value);
        showData(sortedSavings);
    });
};

function sortReviews() {
    removeProducts();
    $.getJSON("/data/product.json", function(json) {
        replaceBooleans(json);

        let indexedArray = json.product_arr.map((item, index) => ({ index, value: item }));
        indexedArray.sort((a, b) => compareReview(a,b));
        
        let sortedReviews = indexedArray.map((item) => item.value);
        showData(sortedReviews);

    });
};

function sortName() {
    removeProducts();
    $.getJSON("/data/product.json", function(json) {
            replaceBooleans(json);
            console.log(json)
            let indexedArray = json.product_arr.map((item, index) => ({ index, value: item }));
            indexedArray.sort((a, b) => compareName(a,b));

        let sortedName = indexedArray.map((item) => item.value);
        console.log(sortedName)
        showData(sortedName);
    });
};

function getData() {
    var data = $.getJSON("/data/product.json", function(json) {
        console.log(json); // this will show the info it in firebug console
        return data;
    });
}

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
    name.innerText = item.name
    productItem.appendChild(name);

    var price = document.createElement("p");
    price.setAttribute('class', 'price');
    var priceValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(
        item.price/100,
      );
    price.innerText = priceValue;
    productItem.appendChild(price);

   if(((typeof(item.was_price) == "number" && item.was_price !== 0 ))){
        var wasPrice = document.createElement("p");
        wasPrice.setAttribute('class', 'wasPrice');
        var wasPriceValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(
            item.was_price/100,
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

function removeProducts(){
    const parent = document.getElementById("products");
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
}

function replaceBooleans(json) {
    json.product_arr.map(product => {

        Object.keys(product).forEach(function(properties) {
            if (typeof product[properties] == "boolean") {
                product[properties] = 0;
            }
        })

    })
}
//Refactor needed to reduce number of compare functions
function comparePrice(a, b) {
    if (a.value.price < b.value.price) return -1;
    if (a.value.price == 0) return -1;
    if (a.value.price > b.value.price) return 1;
    return 0;
}
function compareWasPrice(a, b) {
    if (a.value.was_price < b.value.was_price) return -1;
    if (a.value.was_price == 0) return -1;
    if (a.value.was_price > b.value.was_price) return 1;
    return 0;
}
function compareReview(a, b) {
    if (a.value.reviews < b.value.reviews) return -1;
    if (a.value.reviews == 0) return -1;
    if (a.value.reviews > b.value.reviews) return 1;
    return 0;
}
function compareName(a, b) {
    //Remove digits and symbols as they affect the sort
    let nameA = a.value.name.replace(/[^A-Za-z]+/g, "").toUpperCase(); // ignore upper and lowercase
    let nameB = b.value.name.replace(/[^A-Za-z]+/g, "").toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
    return 1;
    }
    // names must be equal
    return 0;
}

