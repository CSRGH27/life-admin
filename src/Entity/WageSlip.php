<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\WageSlipRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ApiResource(
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 *  
 * 
 * @ORM\Entity(repositoryClass=WageSlipRepository::class)
 */
class WageSlip
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotNull(message="Le salaire doit être renseigné")
     * @Assert\Type(
     *     type="numeric",
     *     message="{{ value }} doit être numérique."
     * )
     */
    private $Amount;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="L'entreprise doit être renseignée.")
     */
    private $company;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotNull(message="Les taxes doivent être renseignées.")
     * @Assert\Type(
     *     type="numeric",
     *     message="{{ value }} doit être numérique."
     * )
     */
    private $contributions;

    /**
     * @ORM\Column(type="date")
     */
    private $dateAdd;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $dateUpd;


    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="wageSlips")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * Assert\File(
     *     mimeTypes = {"application/pdf", "application/x-pdf"},
     *     mimeTypesMessage = "Format autorisé PDF"
     * )
     */
    private $pdfFile;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Type(type="numeric", message="{{ value }} doit être un chiffre !")
     * @Assert\Range(
     *      min = 1,
     *      max = 12,
     *      notInRangeMessage = "Entrez un chiffre compris entre {{ min }} et {{ max }}.",
     * )
     */
    private $month;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Type(type="numeric", message="{{ value }} doit être un chiffre !")
     * @Assert\NotNull(message="L'année doit être renseignée.")
     * @Assert\Range(
     *      min = 1950,
     *      max = 3000,
     *      notInRangeMessage = "Entrez une année cohérente (1950 - 2021).",
     * )
     */
    private $year;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->Amount;
    }

    public function setAmount($Amount): self
    {
        $this->Amount = $Amount;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getContributions(): ?float
    {
        return $this->contributions;
    }

    public function setContributions($contributions): self
    {
        $this->contributions = $contributions;

        return $this;
    }

    public function getDateAdd(): ?\DateTimeInterface
    {
        return $this->dateAdd;
    }

    public function setDateAdd(\DateTimeInterface $dateAdd): self
    {
        $this->dateAdd = $dateAdd;

        return $this;
    }

    public function getDateUpd(): ?\DateTimeInterface
    {
        return $this->dateUpd;
    }

    public function setDateUpd(?\DateTimeInterface $dateUpd): self
    {
        $this->dateUpd = $dateUpd;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getPdfFile(): ?string
    {
        return $this->pdfFile;
    }

    public function setPdfFile(string $pdfFile): self
    {
        $this->pdfFile = $pdfFile;

        return $this;
    }

    public function getMonth(): ?int
    {
        return $this->month;
    }

    public function setMonth($month): self
    {
        $this->month = $month;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear($year): self
    {
        $this->year = $year;

        return $this;
    }
}
