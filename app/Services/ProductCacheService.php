<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProductCacheService
{
    private $baseUrl = 'https://api.al-style.kz/api';
    private $accessToken = 'rFiVYZdpyz7201yhF8rCM0Yk4Ikv6Ypo';
    private $cacheKey = 'products_with_images';
    private $cacheTTL = 600;

    public function getProductsWithImages()
    {
        return Cache::remember($this->cacheKey, $this->cacheTTL, function () {
            return $this->fetchProductsWithImages();
        });
    }

    public function refreshCache()
    {
        Cache::forget($this->cacheKey);
        return $this->getProductsWithImages();
    }

    private function fetchProductsWithImages()
    {
        try {
            Log::info('Starting to fetch products with images from API');
            
            $productsResponse = Http::timeout(30)->get("{$this->baseUrl}/elements", [
                'access-token' => $this->accessToken,
            ]);

            if (!$productsResponse->successful()) {
                Log::error('Failed to fetch products', ['status' => $productsResponse->status()]);
                return [];
            }

            $products = $productsResponse->json();
            
            if (!is_array($products)) {
                Log::warning('Products response is not an array', ['response' => $products]);
                return [];
            }

            $flatProducts = is_array($products[0] ?? null) ? array_merge(...$products) : $products;
            
            Log::info('Fetched products', ['count' => count($flatProducts)]);

            $productsWithImages = $this->attachImagesToProducts($flatProducts);

            Log::info('Completed fetching products with images', ['count' => count($productsWithImages)]);

            return $productsWithImages;

        } catch (\Exception $e) {
            Log::error('Error fetching products with images', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return [];
        }
    }

    private function attachImagesToProducts($products)
    {
        $productsWithImages = [];
        $totalProducts = count($products);
        
        foreach ($products as $index => $product) {
            $productWithImage = $product;
            $productWithImage['images'] = [];

            try {
                $imagesResponse = Http::timeout(10)->get("{$this->baseUrl}/images", [
                    'access-token' => $this->accessToken,
                    'article' => $product['article'],
                ]);

                if ($imagesResponse->successful()) {
                    $imagesData = $imagesResponse->json();
                    $productImages = $imagesData[$product['article']] ?? [];
                    
                    if (is_array($productImages) && count($productImages) > 0) {
                        $productWithImage['images'] = $productImages;
                    }
                }

                if ($index < $totalProducts - 1) {
                    usleep(5100000);
                }

            } catch (\Exception $e) {
                Log::warning('Failed to fetch image for product', [
                    'article' => $product['article'],
                    'error' => $e->getMessage()
                ]);
            }

            $productsWithImages[] = $productWithImage;

            if (($index + 1) % 10 === 0) {
                Log::info("Processed " . ($index + 1) . "/" . $totalProducts . " products");
            }
        }

        return $productsWithImages;
    }

    public function getCacheStatus()
    {
        $hasCache = Cache::has($this->cacheKey);
        $data = Cache::get($this->cacheKey);
        
        return [
            'cached' => $hasCache,
            'products_count' => $hasCache ? count($data) : 0,
            'ttl_seconds' => $this->cacheTTL,
        ];
    }
}
