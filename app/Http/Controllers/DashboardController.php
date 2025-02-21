<?php
namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\User;
use Illuminate\Http\Request; // Sesuaikan dengan model aktivitas yang kamu pakai
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Ambil total user
        $totalUsers = User::count();
        // dd($totalUsers);

        // Ambil total user online (contoh: jika ada kolom "is_online")
        // $totalOnlineUsers = User::where('is_online', true)->count();
        $totalOnlineUsers = DB::table('sessions')
            ->whereNotNull('user_id')
            ->count();
        // dd($totalOnlineUsers);

        $activitiesPerMonth = Kegiatan::where('user_id', Auth::id())
            ->selectRaw("strftime('%m', tanggal) as month, COUNT(*) as total")
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($activity) {
                return [
                    'month'      => date("M Y", mktime(0, 0, 0, $activity->month, 1)), // Ubah angka bulan jadi nama bulan
                    'activities' => $activity->total,
                ];
            })->values();

        $activitiesPerMonth = collect($activitiesPerMonth);

        // dd($activitiesPerMonth);

        return Inertia::render('Dashboard', [
            'totalUsers'         => $totalUsers,
            'totalOnlineUsers'   => $totalOnlineUsers,
            'activitiesPerMonth' => $activitiesPerMonth,
        ]);
    }
}
