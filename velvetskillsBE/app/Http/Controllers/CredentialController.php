<?php
namespace App\Http\Controllers;

use App\Models\Credential;
use Illuminate\Http\Request;
use App\Http\Resources\CredentialResource;
use Illuminate\Support\Facades\Validator;
use App\Models\Skill;

class CredentialController extends Controller
{
    // Pregled svih kredencijala (moderator)
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

    // Ažuriranje statusa kredencijala i postavljanje reviewed_by (moderator)
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

    /**
     *  Vrati moje kredencijale
     */
    public function myCredentials()
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $credentials = Credential::with(['skill', 'reviewer'])
            ->where('user_id', $user->id)
            ->get();

        return CredentialResource::collection($credentials);
    }

    /**
     * Dodaj novi kredencijal
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'skill_name'   => 'required|string',
            'type'         => 'required|string|max:100',
            'title'        => 'required|string|max:100',
            'issue_date'   => 'nullable|date',
            'expiry_date'  => 'nullable|date|after_or_equal:issue_date',
            'file'         => 'required|url', 
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Pronađi skill po imenu
        $skill = Skill::where('name', $request->skill_name)->first();

        if (!$skill) {
            return response()->json(['message' => 'Skill not found.'], 404);
        }

        // Proveri da li korisnik ima tu veštinu u pivot tabeli
        $hasSkill = $user->skills()->where('skill_id', $skill->id)->exists();

        if (!$hasSkill) {
            return response()->json(['message' => 'You can only add credentials for your own skills.'], 403);
        }

        // Kreiraj credential
        $credential = Credential::create([
            'user_id'     => $user->id,
            'skill_id'    => $skill->id,
            'type'        => $request->type,
            'title'       => $request->title,
            'issue_date'  => $request->issue_date,
            'expiry_date' => $request->expiry_date,
            'file'        => $request->file,
            'status'      => 'pending',
            'reviewed_by' => null,
        ]);

        return new CredentialResource($credential->load(['skill', 'user', 'reviewer']));
    }


    /**
     *  Obriši kredencijal
     */
    public function destroy($id)
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $credential = Credential::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$credential) {
            return response()->json(['message' => 'Credential not found.'], 404);
        }

        $credential->delete();

        return response()->json(['message' => 'Credential deleted successfully.']);
    }
}
