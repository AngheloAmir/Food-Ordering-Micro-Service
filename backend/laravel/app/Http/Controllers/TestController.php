<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestController extends Controller
{
    /**
     * Return a simple test message.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'message' => 'test here',
            'status' => 'success'
        ]);
    }
}
