<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return array(
            'id' => $this->id,
            'title' => $this->title,
            'designations' => $this->designations,
            'numberOfEmployees' => $this->numOfEmployees($this->designations),
            'hired' => $this->numOfHired($this->designations),
            'waiting' => $this->numOfEmployees($this->designations) - $this->numOfHired($this->designations),
        );
    }
    function numOfEmployees($designations)
    {
        $count = 0;
        foreach ($designations as $designation) {
            $count += count($designation->employees);
        }
        return $count;
    }
    function numOfHired($designations)
    {
        $count = 0;
        foreach ($designations as $designation) {
            if ($designation->employees) {
                foreach ($designation->employees as $employeesDesign) {
                    if ($employeesDesign->employee->hired)
                        $count += 1;
                }
            }
        }
        return $count;
    }
}
