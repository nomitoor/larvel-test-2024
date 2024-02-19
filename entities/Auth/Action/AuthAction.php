<?php

declare(strict_types=1);

namespace Entities\Auth\Action;

use App\Http\Resources\UserResource;
use App\Models\User;
use DomainException;
use Entities\Auth\Data\AuthData;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\{Auth, Hash};
use Symfony\Component\HttpFoundation\Response;

final readonly class AuthAction
{
    public static function auth(AuthData $data): JsonResponse
    {
        $user = User::where('email', $data->email)->first();

        if (! $user || ! Auth::attempt($data->only('email', 'password')->toArray())) {
            throw new DomainException(
                'Invalid Credentials, please check email and password and retry again!',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        $token = auth()->user()->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24);

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ])->withCookie($cookie);
    }
}
