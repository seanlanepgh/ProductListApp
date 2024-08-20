<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta charset="UTF-8">
		<!-- Style Sheets -->
		<!-- Google Font Style-->
		<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu">
		<!-- ProductPagesStyle Sheet -->
		<link rel="stylesheet" type="text/css" href="../CSS/productPageStyle.css">
		<!-- Get jquery library -->
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.6.1.min.js"></script>
        <script type="text/javascript" src="/Javascript/data.js"></script>
		<script type="text/javascript" src="/Javascript/filterButtons.js"></script>
		<title>ProductList.com</title>
	</head>
	<body>
        <!-- Wrap to contain all page content-->
        <div id="content"> 	
		<header>
			<h1>Office Essentials</h1>
		</header>
			<div class="filterContainer">
				<button onclick="sortPrice()"class="filterButton" id="priceFilterButton">
					Sort By Price
				</button>   
				<button onclick="sortReviews()"class="filterButton" id="reviewFilterButton">
					Sort By Review
				</button> 
				<button onclick="sortName()" class="filterButton" id="nameFilterButton">
					Sort By Name
				</button> 
				<button onclick="sortSavings()" class="filterButton" id="savingFilterButton">
					Sort By Saving
				</button> 
			</div> 	
			<!--Use an unordered list to structure the items -->
			<div class="products" id="products">
		
			</div>
		</div>
	</body>
</html>