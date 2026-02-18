<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $contact = Contact::create($request->all());

        return response()->json([
            "success" => true,
            "message" => "Message saved",
            "data" => $contact
        ]);
    }

    public function index()
    {
        return Contact::latest()->get();
    }

    // NOUVELLE MÉTHODE POUR LES MESSAGES RÉCENTS
    public function recent()
    {
        $recentMessages = Contact::latest()
            ->take(10)
            
            ->get();

        return response()->json([
            'success' => true,
            'data' => $recentMessages
        ]);
    }

    // NOUVELLE MÉTHODE POUR SUPPRIMER UN MESSAGE
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message supprimé avec succès'
        ]);
    }

    // NOUVELLE MÉTHODE POUR MARQUER COMME LU
    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->status = 'lu';
        $contact->save();

        return response()->json([
            'success' => true,
            'message' => 'Message marqué comme lu'
        ]);
    }
}