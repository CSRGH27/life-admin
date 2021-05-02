<?php

namespace App\Controller;

use App\Entity\WageSlip;
use Symfony\Component\HttpFoundation\Request;

class PostPdfController
{
    public function __invoke(WageSlip $wageslip, Request $request)
    {
        $wageSlip = $request->attributes->get('data');
        if (!($wageSlip instanceof WageSlip)) {
            throw new \RuntimeException('Erreur');
        }



        $wageSlip->setFile($request->files->get('pdf'));
        /**
         * Il faut absolument modifier un autre champs pour activer vich
         */
        $wageSlip->setDateUpd(new \DateTime());
        return $wageSlip;
    }
}
