<?php

namespace App\Controller;

use App\Entity\WageSlip;

class WageDisplayController
{

    public function __invoke(WageSlip $data): WageSlip
    {

        $data->setIsDisplay(!$data->getIsDisplay());
        return $data;
    }
}
