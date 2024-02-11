<?php

declare(strict_types=1);

namespace Entities\Auth\Controller;

use App\Http\Controllers\Controller;
use Entities\Auth\Action\AuthAction;
use Entities\Auth\Data\AuthData;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function __invoke(AuthData $data, AuthAction $action): RedirectResponse
    {
        abort_if(
            Auth::check(),
            Response::HTTP_FORBIDDEN,
            'You are already logged in.'
        );

        $action::auth($data);

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
