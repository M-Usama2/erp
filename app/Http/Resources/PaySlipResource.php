<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaySlipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $salaryStruct =  $this->salarySlipStructures;
        #employee = $this->employee,=;
        return array(
            'id' => $this->id,
            'employee' => $this->employee,
            'designation' => !empty($this->employee->employeeDesignation) ? $this->employee->employeeDesignation->designation : null,
            'salarySlipStructures' => $salaryStruct,
            'earning' => $this->earning($salaryStruct),
            'deduction' => $this->deduction($salaryStruct),
            'dated' => date('d M Y', strtotime($this->dated)),
        );
    }

    private function deduction($salaryStruct)
    {
        $total = 0;
        foreach ($salaryStruct as $key => $ss) {
            if ($ss->deduction == 1)
                $total += $ss->amount;
        }
        return $total;
    }
    private function earning($salaryStruct)
    {
        $total = 0;
        foreach ($salaryStruct as $key => $ss) {
            if ($ss->deduction == 0)
                $total += $ss->amount;
        }
        return $total;
    }
}
