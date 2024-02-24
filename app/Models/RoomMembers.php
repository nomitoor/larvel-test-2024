<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\{Factories\HasFactory, Model, Relations\BelongsTo};
use Illuminate\Support\Carbon;

class RoomMembers extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'room_id'];

    protected $appends = [
        'timeAgoJoin',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected function getTimeAgoJoinAttribute()
    {
        return Carbon::parse($this->created_at)->ago();
    }
}
