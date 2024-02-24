<?php

declare(strict_types=1);

namespace Entities\Message\Data;

use Spatie\LaravelData\Data;

class MessageData extends Data
{
    public function __construct(
        public readonly string $message,
    ) {
    }
}
