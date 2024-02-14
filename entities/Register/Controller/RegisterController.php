<?php

declare(strict_types=1);

namespace Entities\Register\Controller;

use App\Http\Controllers\Controller;
use DomainException;
use Entities\Register\Action\RegisterAction;
use Entities\Register\Data\RegisterData;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends Controller
{
    public function __invoke(RegisterData $data, RegisterAction $action): JsonResponse
    {
        try {
            $action::register($data);
        } catch (DomainException|ModelNotFoundException $e) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ], Response::HTTP_NOT_FOUND);
        } catch (Exception $exception) {
            throw new DomainException(
                $exception->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return response()->json([
            'status' => Response::HTTP_CREATED,
            'message' => 'User Registration Successful',
        ], Response::HTTP_CREATED);
    }
}
