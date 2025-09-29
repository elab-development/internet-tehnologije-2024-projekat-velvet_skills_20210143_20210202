<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CredentialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'user'        => new UserResource($this->whenLoaded('user')),
            'skill'       => new SkillResource($this->whenLoaded('skill')),
            'type'        => $this->type,
            'title'       => $this->title,
            'issue_date'  => $this->issue_date,
            'expiry_date' => $this->expiry_date,
            'file'        => $this->file,
            'status'      => $this->status,
            'reviewed_by' => new UserResource($this->whenLoaded('reviewer'))
        ];
    }
}
