<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\WageSlipRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ApiResource()
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
     *     type="float",
     *     message="{{ value }} doit être numérique."
     * )
     */
    private $Amount;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="L'entreprise doit être renseigné")
     */
    private $company;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotNull(message="Les taxes doivent être renseigné")
     * @Assert\Type(
     *     type="float",
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
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="wageSlips")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $pdfFile;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->Amount;
    }

    public function setAmount(float $Amount): self
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

    public function setContributions(float $contributions): self
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

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

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
}
