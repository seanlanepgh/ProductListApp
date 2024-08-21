<template>
    <div id="content"> 	
        <header>
            <p>Office Essentials</p>
        </header>
        <div class="filterContainer">
            <button @click="sortProducts('price')" class="filterButton" id="priceFilterButton">
                Sort By Price
            </button>   
            <button @click="sortProducts('reviews')" class="filterButton" id="reviewFilterButton">
                Sort By Review
            </button> 
            <button @click="sortProducts('title')" class="filterButton" id="nameFilterButton">
                Sort By Name
            </button> 
            <button @click="sortProducts('was_price')"  class="filterButton" id="savingFilterButton">
                Sort By Saving
            </button> 
        </div>
        <!--Use an unordered list to structure the items -->
        <div v-if="products.loading || !products.data.length">
            <Spinner v-if="products.loading"/>
            <p v-else class="text-center py-8 text-gray-700">
            There are no products
            </p>
            <div class="products" id="products" v-for="(product, index) of products.data">
                <div class="item" style="display: inline-block;">
                    <div class="product-image">
                        <img style="object-fit: contain;" :src="product.image_url" :alt="product.title">
                    </div>
                    <h3 class="name"> {{product.title}}</h3>
                    <p class="price"> {{ $filters.currencyUSD(product.price) }}</p>
                    <p class="was_price"> {{ $filters.currencyUSD(product.was_price) }}</p>
                    <p class="reviewScore"> {{product.reviews}} % Review Score</p>
                    <button class="button"> Add To Basket</button>
                </div>
            </div>
        </div>
        <div v-if="!products.loading" class="flex justify-between items-center mt-5">
        <div v-if="products.data.length">
            Showing from {{ products.from }} to {{ products.to }}
        </div>
            <nav
                v-if="products.total > products.limit"
                class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
            >
            <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
            <a
            v-for="(link, i) of products.links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
                link.active
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                i === 0 ? 'rounded-l-md' : '',
                i === products.links.length - 1 ? 'rounded-r-md' : '',
                !link.url ? ' bg-gray-100 text-gray-700': ''
                ]"
            v-html="link.label"
            >
                </a>
            </nav>
        </div>
    </div>
</template>
<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import Spinner from "../../components/core/Spinner.vue";
import {PRODUCTS_PER_PAGE} from "../../constants";

const products = computed(() => store.state.products);
console.log(products)
const search = ref('');
const perPage = ref(PRODUCTS_PER_PAGE);
const sortField = ref('updated_at');
const sortDirection = ref('desc')

onMounted(() => {
    console.log("test")
  getProducts();
})

// function getForPage(ev, link) {
//   ev.preventDefault();
//   if (!link.url || link.active) {
//     return;
//   }

//   getProducts(link.url)
// }

function getProducts(url = null) {
 
  store.dispatch("getProducts", {
    url,
    search: search.value,
    per_page: perPage.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  })
  console.log(store)
}

function sortProducts(field) {
  if (field === sortField.value) {
    if (sortDirection.value === 'desc') {
      sortDirection.value = 'asc'
    } else {
      sortDirection.value = 'desc'
    }
  } else {
    sortField.value = field;
    sortDirection.value = 'asc'
  }

  getProducts()
}

</script>

<style scoped>
/*Header Style*/
header{
	height:auto;
	width:auto;
    display: inline-block;
	text-align:center;
    /* Tried image searching from the font to find correct font to match design
    but normal process would be to ask UX Designer 
    */ 
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

header p {
    font-weight: normal;
	float:left;
	font-size:30px;
	text-decoration:none;
}
/* End Header Style*/
/*Body Styles*/
body{
    width:100%;
	margin: 0;
    padding: 10px;
}

#content{
	width:90%;
	z-index:0;
    padding-left:30px;
    padding-right: 30px;
}

/*Styles the list of products/items*/
.products{
    display: grid;                          /* Use grid type layout to get columns */
    grid-template-columns: 1fr 1fr 1fr 1fr; /* Proportions of the columns */
    gap: 0.5rem;   
}

.products:after {
    content: "";
    display: table;
    clear: both;
}

.item {
    border: 2px solid lightgray;
    padding: 0.5em;
    float: left;
    width: auto;
}

.product-image{
    width:auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.product-image >img {
   width: 100%;
   height: auto;
}

.item h3{
    margin-block-start: 0em;
    margin-block-end: 0.25em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
	text-decoration:none;
    text-align: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.item br{
    padding-top: 0.1em;
    padding-bottom: 0.1em;
}
.item p{
	margin:0;
    padding-top: 0.1em;
    padding-bottom: 0.1em;
    font-weight:normal;
	text-decoration:none;
    text-align: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.wasPrice {
    color:rgba(255,31,31,255);
}

.reviewScore {
    color:rgba(0,102,0,255);  
}

.filterButton {
	text-decoration:none;
    font-weight: normal;
    font-size:20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	display:inline-block;
    border: 2px solid lightgray;
    background-color: white;
    color: black;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    width: auto;
}

.filterContainer {
    display: grid;                          /* Use grid type layout to get columns */
    grid-template-columns: 1fr 1fr 1fr 1fr; /* Proportions of the columns */
    gap: 0.5em;   
}

.filterContainer:after {
    content: "";
    display: table;
    clear: both;
}

.button{
	width:100%;
	background:rgba(255,102,0,255);
	border:0;
	padding:4%;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
	font-size:100%;
	color:white;
	cursor:pointer;
	outline:none;
}
.button:hover{
	background:rgba(15,159,180,1);
	outline:none;
}

/* End Styles the list of products/items*/


@media(max-width:900px){
    .products{
        display: grid;                          /* Use grid type layout to get columns */
        grid-template-columns: 1fr 1fr; /* Proportions of the columns */
        gap: 1rem;   
    }
    
    .filterContainer {

        display: grid;                          /* Use grid type layout to get columns */
        grid-template-columns: 1fr 1fr; /* Proportions of the columns */
        gap: 0.5em;   
        /* margin-bottom: 2.5px; */
    
      }
}

@media(max-width:800px){
    .products{
        display: grid;                          /* Use grid type layout to get columns */
        grid-template-columns: 1fr 1fr; /* Proportions of the columns */
        gap: 1rem;   
    }

    .filterContainer {

        display: grid;                          /* Use grid type layout to get columns */
        grid-template-columns: 1fr 1fr ; /* Proportions of the columns */
        gap: 0.5em;   
        /* margin-bottom: 2.5px; */
    
    }
}

@media (max-width:500px){

    .products{
        display: grid;                          /* Use grid type layout to get columns */
        grid-template-columns: 1fr; /* Proportions of the columns */
        gap: 1rem;   
    }

    .filterContainer {

        display: grid;                          /* Use grid type layout to get columns */
        grid-template-columns: 1fr; /* Proportions of the columns */
        gap: 0.5em;   
        /* margin-bottom: 2.5px; */
    
    }

    .item {
        float: left;
        width: auto;
        /* width: 100%;    Use 100% of each column */
    }

    .product-image{
        /* display: flex; */
        width:300px;
        height:300px;
        overflow: hidden;
        justify-content: center;
        align-items: center;
    }

    .product-image >img {
        max-width: 100%;
        width: 400px;
    }

}

@media (max-width:250px){

    .products{
        display: grid;                          /* Use grid type layout to get columns */
        grid-template-columns: 1fr; /* Proportions of the columns */
        gap: 1rem;   
    }

    .filterContainer {

        display: grid;                          /* Use grid type layout to get columns */
        grid-template-columns: 1fr; /* Proportions of the columns */
        gap: 0.5em;   
        /* margin-bottom: 2.5px; */
    
    }

    .item {
        float: left;
        width: auto;
        /* width: 100%;    Use 100% of each column */
    }

    .product-image{
        /* display: flex; */
        width:200px;
        height:200px;
        overflow: hidden;
        justify-content: center;
        align-items: center;
    }

    .product-image >img {
        max-width: 100%;
        width: 400px;
    }
}

</style>