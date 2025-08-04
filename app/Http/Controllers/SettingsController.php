<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display the settings page.
     */
    public function index()
    {
        $settings = SiteSetting::all()->keyBy('key');
        
        return Inertia::render('admin/settings', [
            'settings' => $settings
        ]);
    }

    /**
     * Update the site settings.
     */
    public function store(Request $request)
    {
        $settings = $request->all();
        
        foreach ($settings as $key => $value) {
            SiteSetting::set($key, $value);
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}