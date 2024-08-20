<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Product
 * 
 * @property int $product_id
 * @property string|null $product_name
 * @property string|null $category
 * @property float|null $price
 * @property float|null $was_price
 * @property int|null $reviews
 * @property int|null $img
 *
 * @package App\Models
 */
class Product extends Model
{
	protected $table = 'products';
	protected $primaryKey = 'product_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'product_id' => 'int',
		'price' => 'float',
		'was_price' => 'float',
		'reviews' => 'int',
		'img' => 'int'
	];

	protected $fillable = [
		'product_name',
		'category',
		'price',
		'was_price',
		'reviews',
		'img'
	];
}
