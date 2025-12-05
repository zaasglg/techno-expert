<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ProductCacheService;

class RefreshProductsCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:refresh-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Refresh products cache by fetching data from API';

    private $cacheService;

    /**
     * Create a new command instance.
     */
    public function __construct(ProductCacheService $cacheService)
    {
        parent::__construct();
        $this->cacheService = $cacheService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to refresh products cache...');
        
        try {
            $products = $this->cacheService->refreshCache();
            $this->info('Cache refreshed successfully!');
            $this->info('Total products cached: ' . count($products));
            
            return 0;
        } catch (\Exception $e) {
            $this->error('Failed to refresh cache: ' . $e->getMessage());
            return 1;
        }
    }
}
