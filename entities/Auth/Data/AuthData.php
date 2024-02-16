<?php

declare(strict_types=1);

namespace Entities\Auth\Data;

use Spatie\LaravelData\Attributes\Validation\{Email, Max, Min, Unique};
use Spatie\LaravelData\Data;

final class AuthData extends Data
{
    public function __construct(
        #[Email, Min(12), Max(50)]
        public readonly string $email,
        #[Min(3), Max(50)]
        public readonly string $password,
    ) {
    }
}
