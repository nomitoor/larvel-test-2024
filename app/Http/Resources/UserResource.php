<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'initial' => strtoupper(substr($this->username, 0, 1)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
