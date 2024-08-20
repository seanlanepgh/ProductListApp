
function sortPrice() {
    removeProducts();
    fetch("http://127.0.0.1:8000/api/products")
    .then((response) => response.json())
    .then((json) => {
        let indexedArray = json.map((item, index) => (
            { index, value: item }
        ));
        indexedArray.sort((a, b) => comparePrice(a,b));
        
        let sortedPrice = indexedArray.map((item) => item.value);
        showData(sortedPrice);
    }); 
};

function sortSavings() {
    removeProducts();
    fetch("http://127.0.0.1:8000/api/products")
    .then((response) => response.json())
    .then((json) => {
        let indexedArray = json.map((item, index) => (
            { index, value: item }
        ));
        indexedArray.sort((a, b) => compareWasPrice(a,b));
        
        let sortedSavings = indexedArray.map((item) => item.value);
        showData(sortedSavings);
    });
};

function sortReviews() {
    removeProducts();
    fetch("http://127.0.0.1:8000/api/products")
    .then((response) => response.json())
    .then((json) => {
        let indexedArray = json.map((item, index) => (
            { index, value: item }
        ));
        indexedArray.sort((a, b) => compareReview(a,b));
        
        let sortedReviews = indexedArray.map((item) => item.value);
        showData(sortedReviews);

    });
};

function sortName() {
    removeProducts();
    fetch("http://127.0.0.1:8000/api/products")
    .then((response) => response.json())
    .then((json) => {
        let indexedArray = json.map((item, index) => (
            { index, value: item }
        ));
            indexedArray.sort((a, b) => compareName(a,b));

        let sortedName = indexedArray.map((item) => item.value);
        console.log(sortedName)
        showData(sortedName);
    });
};

function getData() {
    var data = $.getJSON("/data/product.json", function(json) {
        return data;
    });
}

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
    let nameA = a.value.product_name.replace(/[^A-Za-z]+/g, "").toUpperCase(); // ignore upper and lowercase
    let nameB = b.value.product_name.replace(/[^A-Za-z]+/g, "").toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
    return 1;
    }
    // names must be equal
    return 0;
}

