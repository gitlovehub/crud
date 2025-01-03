<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $products = Product::all();

            return response()->json([
                'message' => 'Success',
                'data' => $products
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed'
            ]);
        }


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try {
            // $product = Product::findOrFail($product);

            return response()->json([
                'message' => 'success',
                'data' => $product
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'failed',
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->except('product_thumbnail');

        $validator = Validator::make($data, [
            'product_name' => ['required', 'string', 'max:255'],
            'product_thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'product_price' => ['required', 'numeric', 'min:0']
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Failed',
                    'errors' => $validator->errors()
                ],
                422
            );
        }

        try {

            $product = Product::query()->findOrFail($product->id);

            $path = '';

            if ($request->hasFile('product_thumbnail')) {

                $path = $request->file('product_thumbnail')->store('product_thumbnails');
                $data['product_thumbnail'] = $path;
                Storage::delete($product->product_thumbnail);

            } else {
                $data['product_thumbnail'] = $product->product_thumbnail;
            }

            $product->update($data);

            return response()->json([
                'message' => 'Cập nhật dữ liệu thành công',
                'products' => $product
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Cập nhật dữ liệu thất bại',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
