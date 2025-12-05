<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Services\ProductCacheService;

class ProxyController extends Controller
{
    private $baseUrl = 'https://api.al-style.kz/api';
    private $accessToken = 'rFiVYZdpyz7201yhF8rCM0Yk4Ikv6Ypo';
    private $cacheService;

    public function __construct(ProductCacheService $cacheService)
    {
        $this->cacheService = $cacheService;
    }

    public function getCategories()
    {
        try {
            $response = Http::get("{$this->baseUrl}/categories", [
                'access-token' => $this->accessToken,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch categories'], 500);
        }
    }

    public function getProducts()
    {
        try {
            $response = Http::get("{$this->baseUrl}/elements", [
                'access-token' => $this->accessToken,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch products'], 500);
        }
    }

    public function getImages(Request $request)
    {
        try {
            $article = $request->query('article');
            
            if (!$article) {
                return response()->json(['error' => 'Article is required'], 400);
            }

            $response = Http::get("{$this->baseUrl}/images", [
                'access-token' => $this->accessToken,
                'article' => $article,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch images'], 500);
        }
    }

    public function getElementInfo(Request $request)
    {
        try {
            $article = $request->query('article');
            
            if (!$article) {
                return response()->json(['error' => 'Article is required'], 400);
            }

            $response = Http::get("{$this->baseUrl}/element-info", [
                'access-token' => $this->accessToken,
                'article' => $article,
                'additional_fields' => 'description,brand,warranty,images,barcode,expectedArrivalDate,detailText,properties'
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch element info'], 500);
        }
    }

    public function getProperties(Request $request)
    {
        try {
            $article = $request->query('article');
            
            if (!$article) {
                return response()->json(['error' => 'Article is required'], 400);
            }

            $response = Http::get("{$this->baseUrl}/properties", [
                'access-token' => $this->accessToken,
                'article' => $article,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch properties'], 500);
        }
    }

    public function getQuantityPrice(Request $request)
    {
        try {
            $article = $request->query('article');
            
            if (!$article) {
                return response()->json(['error' => 'Article is required'], 400);
            }

            $response = Http::get("{$this->baseUrl}/quantity-price", [
                'access-token' => $this->accessToken,
                'article' => $article,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch quantity and price'], 500);
        }
    }

    public function getBrands()
    {
        try {
            $response = Http::get("{$this->baseUrl}/brands", [
                'access-token' => $this->accessToken,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch brands'], 500);
        }
    }

    /**
     * Get products with images from cache
     */
    public function getProductsWithImages()
    {
        try {
            $products = $this->cacheService->getProductsWithImages();
            return response()->json($products);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch products with images'], 500);
        }
    }

    /**
     * Force refresh cache (for manual refresh if needed)
     */
    public function refreshProductsCache()
    {
        try {
            $products = $this->cacheService->refreshCache();
            return response()->json([
                'success' => true,
                'message' => 'Cache refreshed successfully',
                'products_count' => count($products)
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to refresh cache'], 500);
        }
    }

    /**
     * Get cache status
     */
    public function getCacheStatus()
    {
        return response()->json($this->cacheService->getCacheStatus());
    }
}
