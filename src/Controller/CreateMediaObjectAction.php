<?php

namespace App\Controller;

use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use App\Entity\MediaObject;
use Symfony\Component\HttpFoundation\Request;
use App\Form\MediaObjectType;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class CreateMediaObjectAction
{
    private $validator;
    private $doctrine;
    private $factory;

    public function __construct(ManagerRegistry $doctrine, FormFactoryInterface $factory, ValidatorInterface $validator)
    {
        $this->doctrine = $doctrine;
        $this->factory = $factory;
        $this->validator = $validator;
    }

    public function __invoke(Request $request): MediaObject
    {
        $mediaObject = new MediaObject();
        $form = $this->factory->create(MediaObjectType::class, $mediaObject);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->doctrine->getManager();
            $em->persist($mediaObject);
            $em->flush();

            // Prevent the serialization of the file property
            $mediaObject->file = null;

            return $mediaObject;
        }

        throw new ValidationException($this->validator->validate($mediaObject));
    }
}
