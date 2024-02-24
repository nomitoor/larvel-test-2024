<?php

declare(strict_types=1);

namespace Entities\Message\Controller;

use App\Http\Controllers\Controller;
use App\Http\Resources\{MessageResource, UserResource};
use App\Models\{Room, User};
use DomainException;
use Entities\Message\Actions\MessageAction;
use Entities\Message\Data\MessageData;
use Entities\Message\Message;
use Exception;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class MessageController extends Controller
{
    public function store(Room $user, MessageData $messageData, MessageAction $messageAction): JsonResponse
    {
        try {
            $messageAction::handle($messageData, $user);
        } catch (Exception $exception) {
            throw new DomainException(
                $exception->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return response()->json([
            'status' => Response::HTTP_CREATED,
            'message' => 'Message sent!',
        ], Response::HTTP_CREATED);
    }

    public function getMessages(Room $room): JsonResponse
    {
        $user = auth()->user();

        return response()->json([
            'messages' => MessageResource::collection(
                Message::where('room_id', $room->id)->get()
            ),
            'receiver' => UserResource::make($user),
            'status' => Response::HTTP_CREATED,
        ]);
    }
}
