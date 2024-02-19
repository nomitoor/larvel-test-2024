<?php

namespace Entities\Message\Data;

use App\Models\User;
use Spatie\LaravelData\Data;

class MessageData extends Data
{
    public function __construct(
        public readonly string $message,
    )
    {
    }
}