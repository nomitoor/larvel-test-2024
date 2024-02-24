<?php

declare(strict_types=1);

namespace App\Models;

use Entities\Message\Message;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

class Room extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = ['title', 'user_id', 'slug'];

    /**
     * @var string[]
     */
    protected $appends = [
        'timeAgo',
        'path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    /**
     * relation with user model
     */
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * relation with message model
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'room_id');
    }

    /**
     * return url room
     *
     * @return string
     */
    public function getPathAttribute()
    {
        return route('room.message.view', $this->slug);
    }

    /**
     * return time ago created
     *
     * @return string
     */
    protected function getTimeAgoAttribute()
    {
        return Carbon::parse($this->created_at)->ago();
    }
}
