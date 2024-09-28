<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AttachApiToken
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Attach the token to the request
        if ($request->session()->has('api_token')) {
            $request->headers->set('Authorization', 'Bearer ' . $request->session()->get('api_token'));
        }

        return $next($request);
    }
}
