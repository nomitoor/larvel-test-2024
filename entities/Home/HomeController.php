<?php

declare(strict_types=1);

namespace Entities\Home;

use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function __invoke(): true
    {
        return true;
    }
}
