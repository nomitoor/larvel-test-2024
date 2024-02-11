<?php

declare(strict_types=1);

namespace Entities\Auth\Action;

use App\Http\Resources\UserResource;
use App\Models\User;
use Entities\Auth\Data\AuthData;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

final readonly class AuthAction
{
    public static function auth(AuthData $data): JsonResponse
    {
        $user = User::where('email', $data->email)->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password is incorrect!',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24); // 1 day

        return response()->json([
            'user' => new UserResource($user),
        ])->withCookie($cookie);
    }
}
