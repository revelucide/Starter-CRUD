<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'description' => $product->description,
                'image' => $product->picture, // <-- This is what your dashboard expects
            ];
        });
        return Inertia::render('Products/Index', compact('products'));
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric',
            'description' => 'nullable|string',
            'picture'     => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'price', 'description']);

        if ($request->hasFile('picture')) {
            $data['picture'] = $request->file('picture')->store('products', 'public');
        }

        Product::create($data);

        return redirect()->route('products.index')->with('message', 'Product created Successfully!');
    }

    public function edit(Product $product)
    {
        return inertia::render('Products/Edit', [
            'product' => $product,
            'image_url' => $product->picture ? asset('storage/' . $product->picture) : null,
        ]);
    }
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric',
            'description' => 'nullable|string',
            'picture'     => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'price', 'description']);

        if ($request->hasFile('picture')) {
            $data['picture'] = $request->file('picture')->store('products', 'public');
        }

        $product->update($data);

        return redirect()->route('products.index')->with('message', 'Product updated Successfully!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product deleted Successfully!');
    }
}
