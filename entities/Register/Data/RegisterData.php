<?php

declare(strict_types=1);

namespace Entities\Register\Data;

use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Data;

class RegisterData extends Data
{
    public function __construct(
        #[Min(3), Max(50)]
        public readonly string $first_name,
        #[Min(3), Max(50)]
        public readonly string $last_name,
        #[Email, Unique('users', 'email'), Min(12), Max(50)]
        public readonly string $email,
        #[Unique('users', 'username'), Min(12), Max(50)]
        public readonly string $username,
        #[Password(min: 8, mixedCase: true, numbers: true, symbols: true)]
        public readonly string $password,
    )
    {
    }
}
