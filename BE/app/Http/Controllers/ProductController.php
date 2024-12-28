<?php

namespace App\Http\Controllers;

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
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product->find($product->id);
        // return view('', compact('product'));
        return $product;
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

        $path = '';

        if ($request->hasFile('product_thumbnail')) {

            $path = $request->files('product_thumbnail')->store('product_thumbnails');
            $data['product_thumbnail'] = $path;

            Storage::delete($product->product_thumbnail);

        } else {
            $data['product_thumbnail'] = $product->product_thumbnail;
        }

        $product->update($data);

        // return redirect()->back()->with('messageUpdate', 'Cập nhật dữ liệu thành công');

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
