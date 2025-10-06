<?php
namespace App\Http\Controllers;

use App\Models\Credential;
use Illuminate\Http\Request;
use App\Http\Resources\CredentialResource;

class CredentialController extends Controller
{
    // 4.6 Pregled svih kredencijala (moderator)
    public function moderatorIndex(Request $request)
    {
        if (auth()->user()->role !== 'moderator') {
            return response()->json(['message' => 'Access denied. Moderators only.'], 403);
        }

        $query = Credential::with(['user', 'skill', 'reviewer']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        $credentials = $query->paginate(10);

        return CredentialResource::collection($credentials);
    }

    // 4.7 Ažuriranje statusa kredencijala i postavljanje reviewed_by (moderator)
    public function moderatorUpdateStatus(Request $request, $id)
    {
        if (auth()->user()->role !== 'moderator') {
            return response()->json(['message' => 'Access denied. Moderators only.'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $credential = Credential::findOrFail($id);
        $credential->status = $validated['status'];
        $credential->reviewed_by = auth()->id();
        $credential->save();

        $credential->load(['user', 'skill', 'reviewer']);

        return new CredentialResource($credential);
    }
}
