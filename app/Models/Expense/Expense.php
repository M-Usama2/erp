<?php

namespace App\Models\Expense;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'expense_type_id', 'amount', 'status', 'user_id', 'note', 'created_at'];

    protected function expenseType()
    {
        return $this->belongsTo(ExpenseType::class);
    }
    protected function user()
    {
        return $this->belongsTo(User::class);
    }

}
