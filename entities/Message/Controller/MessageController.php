<?php

namespace Entities\Message\Controller;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use DomainException;
use Entities\Message\Actions\MessageAction;
use Entities\Message\Data\MessageData;
use Entities\Message\Message;
use Exception;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
class MessageController extends Controller
{
    public function store(User $user, MessageData $messageData, MessageAction $messageAction): JsonResponse
    {
        try{
            $messageAction::handle($messageData, $user);
        }catch (Exception $exception) {
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

    public function getMessages(User $user): JsonResponse
    {
        return response()->json([
            'messages' => MessageResource::collection(
                        Message::where(function($query) use ($user) {
                            $query->where('sender_id', auth()->user()->id)
                                ->where('receiver_id', $user->id);
                        })
                        ->orWhere(function($query) use ($user) {
                            $query->where('sender_id', $user->id)
                                ->where('receiver_id', auth()->user()->id);
                        })
                            ->orderBy('id', 'desc')
                        ->take(10)
                        ->select('sender_id', 'receiver_id', 'message', 'created_at')
                        ->get()
            ),
            'receiver' => UserResource::make($user),
            'status' => Response::HTTP_CREATED,
        ]);
    }

}