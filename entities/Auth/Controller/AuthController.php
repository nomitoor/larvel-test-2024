<?php

declare(strict_types=1);

namespace Entities\Auth\Controller;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use DomainException;
use Entities\Auth\Action\AuthAction;
use Entities\Auth\Data\AuthData;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function __invoke(AuthData $data, AuthAction $action): JsonResponse
    {
        abort_if(
            Auth::check(),
            Response::HTTP_FORBIDDEN,
            'You are already logged in.'
        );

        try {
            $action::auth($data);
        } catch (DomainException|ModelNotFoundException $e) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ], Response::HTTP_NOT_FOUND);
        }

        $token = auth()->user()->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24);

        return response()->json([
            'user' => new UserResource(auth()->user()),
            'token' => $token
        ])->withCookie($cookie);
    }
}
