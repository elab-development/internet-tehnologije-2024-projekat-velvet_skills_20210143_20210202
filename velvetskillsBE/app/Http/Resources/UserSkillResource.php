<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserSkillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'user'        => new UserResource($this->whenLoaded('user')),
            'skill'       => new SkillResource($this->whenLoaded('skill')),
            'level'       => $this->level,
            'is_selected' => $this->is_selected,
            'status'      => $this->status,
        ];
    }
}
