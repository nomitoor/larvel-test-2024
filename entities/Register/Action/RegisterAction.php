<?php

declare(strict_types=1);

namespace Entities\Register\Action;

use App\Models\User;
use DomainException;
use Entities\Register\Data\RegisterData;
use Exception;
use Illuminate\Support\Facades\DB;
use OO\Auth\Actions\AssignToACommandAction;
use OO\Sponsor\Actions\CreateSponsorAction;
use OO\Sponsor\Actions\CreateSponsorEnrollmentDetailsAction;
use Symfony\Component\HttpFoundation\Response;

final class RegisterAction
{
    public static function register(RegisterData $data): void
    {
        try {
            DB::beginTransaction();

            User::create($data->toArray());
        } catch (Exception $exception) {
            DB::rollBack();
            throw new DomainException(
                $exception->getMessage(),
                $exception->getCode() ?? Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        DB::commit();
    }
}
