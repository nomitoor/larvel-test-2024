<?php

declare(strict_types=1);

namespace Entities\Message\Actions;

use App\Events\MessageEvent;
use App\Models\{Room, User};
use DomainException;
use Entities\Message\Data\MessageData;
use Entities\Message\Message;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class MessageAction
{
    public static function handle(MessageData $messageData, Room $room): void
    {
        try {
            DB::beginTransaction();

            $user = auth()->user();
            Message::create([
                'room_id' => 1,
                'user_id' => $user->id,
                'message' => $messageData->message,
            ]);

            // auth()->user()->sentMessages()->create([
            //     'message' => $messageData->message,
            //     'receiver_id' => $user->id,
            // ]);

            broadcast(new MessageEvent($room->id))->toOthers();
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
