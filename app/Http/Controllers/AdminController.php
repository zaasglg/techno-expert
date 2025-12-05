<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function login()
    {
        return Inertia::render('Admin/Login');
    }

    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function categories()
    {
        return Inertia::render('Admin/Categories', [
            'categories' => \App\Models\Category::orderBy('left')->paginate(20)
        ]);
    }

    public function storeCategory(Request $request)
    {
        $request->validate(['name' => 'required']);
        
        $maxRight = \App\Models\Category::max('right') ?? 0;
        
        \App\Models\Category::create([
            'name' => $request->name,
            'left' => $maxRight + 1,
            'right' => $maxRight + 2,
            'level' => 1,
            'elements' => 0
        ]);
        
        return redirect()->back();
    }

    public function importCategories()
    {
        $cacheKey = 'categories_api_data';
        $data = \Illuminate\Support\Facades\Cache::remember($cacheKey, 300, function () {
            sleep(5);
            $response = \Illuminate\Support\Facades\Http::get('https://api.al-style.kz/api/categories?access-token=rFiVYZdpyz7201yhF8rCM0Yk4Ikv6Ypo');
            return $response->successful() ? $response->json() : [];
        });
        
        if (!empty($data)) {
            \App\Models\Category::truncate();
            
            foreach ($data as $cat) {
                \App\Models\Category::create([
                    'id' => $cat['id'],
                    'name' => $cat['name'],
                    'left' => $cat['left'],
                    'right' => $cat['right'],
                    'level' => $cat['level'],
                    'elements' => $cat['elements']
                ]);
            }
        }
        
        return redirect()->back();
    }

    public function brands()
    {
        return Inertia::render('Admin/Brands', [
            'brands' => \App\Models\Brand::orderBy('name')->paginate(20)
        ]);
    }

    public function storeBrand(Request $request)
    {
        $request->validate(['name' => 'required']);
        
        \App\Models\Brand::create([
            'id' => \Illuminate\Support\Str::uuid(),
            'name' => $request->name,
            'count' => 0
        ]);
        
        return redirect()->back();
    }

    public function importBrands()
    {
        $cacheKey = 'brands_api_data';
        $data = \Illuminate\Support\Facades\Cache::remember($cacheKey, 300, function () {
            sleep(5);
            $response = \Illuminate\Support\Facades\Http::get('https://api.al-style.kz/api/brands?access-token=rFiVYZdpyz7201yhF8rCM0Yk4Ikv6Ypo');
            return $response->successful() ? $response->json()['data'] : [];
        });
        
        if (!empty($data)) {
            \App\Models\Brand::truncate();
            
            foreach ($data as $brand) {
                \App\Models\Brand::create([
                    'id' => $brand['id'],
                    'name' => $brand['name'],
                    'count' => $brand['count']
                ]);
            }
        }
        
        return redirect()->back();
    }

    public function products()
    {
        return Inertia::render('Admin/Products', [
            'products' => \App\Models\Product::orderBy('article')->paginate(20)
        ]);
    }

    public function importProducts()
    {
        set_time_limit(300);
        
        \Illuminate\Support\Facades\Cache::forget('products_api_data');
        
        sleep(5);
        $response = \Illuminate\Support\Facades\Http::timeout(60)->get('https://api.al-style.kz/api/elements?access-token=rFiVYZdpyz7201yhF8rCM0Yk4Ikv6Ypo');
        
        if (!$response->successful()) {
            return redirect()->back()->with('error', 'Ошибка API');
        }
        
        $data = $response->json();
        
        if (empty($data) || !is_array($data)) {
            return redirect()->back()->with('error', 'Нет данных');
        }
        
        \App\Models\Product::truncate();
        
        foreach ($data as $product) {
            if (is_array($product) && isset($product['article'])) {
                \App\Models\Product::create([
                    'article' => $product['article'],
                    'article_pn' => $product['article_pn'] ?? null,
                    'name' => $product['name'],
                    'full_name' => $product['full_name'] ?? null,
                    'category' => $product['category'],
                    'sort' => $product['sort'] ?? 0,
                    'price1' => $product['price1'],
                    'price2' => $product['price2'],
                    'quantity' => $product['quantity'],
                    'isnew' => $product['isnew'] ?? 0,
                    'quantityMarkdown' => $product['quantityMarkdown'] ?? null,
                    'priceMarkdown' => $product['priceMarkdown'] ?? null
                ]);
            }
        }
        
        return redirect()->back();
    }
}
