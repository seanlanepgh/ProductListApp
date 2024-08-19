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
		<title>ProductList.com</title>
	</head>
	<body>
		<header>
			<h1>Office Essentials</h1>
		</header>
        <!-- Wrap to contain all page content-->
        <div id="content"> 	
			<div class="filterContainer">
				<button class="filterButton">
					Sort By Price
				</button>   
				<button class="filterButton">
					Sort By Review
				</button> 
				<button class="filterButton">
					Sort By Name
				</button> 
				<button class="filterButton">
					Sort By Saving
				</button> 
			</div> 	
			<!--Use an unordered list to structure the items -->
			<div class="products" id="products">
		
			</div>
		</div>
	</body>
</html>