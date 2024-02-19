<?php

namespace Entities\Message\Actions;

use App\Events\SendMessage;
use App\Models\User;
use DomainException;
use Entities\Message\Data\MessageData;
use Entities\Message\Message;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class MessageAction
{
    public static function handle(MessageData $messageData, User $user): void
    {
        try {
            DB::beginTransaction();

            auth()->user()->sentMessages()->create([
                'message' => $messageData->message,
                'receiver_id' => $user->id,
            ]);

        } catch (Exception $exception) {
            DB::rollBack();
            throw new DomainException(
                $exception->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        DB::commit();
    }
}