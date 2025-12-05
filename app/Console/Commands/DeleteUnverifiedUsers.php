<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Carbon\Carbon;

class DeleteUnverifiedUsers extends Command
{
  protected $signature = 'users:delete-unverified';
    protected $description = 'Elimina usuarios que no verificaron su correo';

    public function handle()
    {
    $minutes = 1;
    $limitDate = Carbon::now()->subMinutes($minutes);

    $deleted = User::whereNull('email_verified_at')
        ->where('created_at', '<', $limitDate)
        ->delete();

    $this->info("Usuarios eliminados: {$deleted}");
    }
}
