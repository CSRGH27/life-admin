<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\WageDisplayControlle;
use App\Repository\WageSlipRepository;
use Doctrine\DBAL\Types\DecimalType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ApiResource(
 *      attributes={
 *          "order"={"year" : "DESC", "month": "DESC"}
 *      },
 *      collectionOperations={
 *      "get",
 *      "post"
 *      },
 *      itemOperations={
 *          "delete",
 *          "put",
 *          "patch",
 *          "get"={},
 *          "pdf"={
 *              "method" = "POST",
 *              "path" = "wage_slips/{id}/pdf",
 *              "deserialize" = false,
 *              "controller" = App\Controller\PostPdfController::class,
 *          }
 *      }
 *  )
 * @Vich\Uploadable()
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
     * @ORM\Column(type="decimal")
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
     * @ORM\Column(type="decimal")
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
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="wageSlips", cascade="persist")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;


    /**
     * @ORM\Column(type="decimal")
     * @Assert\Type(type="numeric", message="{{ value }} doit être un chiffre !")
     * @Assert\Range(
     *      min = 1,
     *      max = 12,
     *      notInRangeMessage = "Entrez un chiffre compris entre {{ min }} et {{ max }}.",
     * )
     */
    private $month;

    /**
     * @ORM\Column(type="decimal")
     * @Assert\Type(type="numeric", message="{{ value }} doit être un chiffre !")
     * @Assert\NotNull(message="L'année doit être renseignée.")
     * @Assert\Range(
     *      min = 1950,
     *      max = 3000,
     *      notInRangeMessage = "Entrez une année cohérente (1950 - 2021).",
     * )
     */
    private $year;



    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $filePath;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping = "pdf_wageSlip", fileNameProperty = "filePath")
     */
    private $file;


    /**
     * @var string|null
     */
    private $fileUrl;

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getAmount()
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


    public function getContributions()
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

    public function getMonth()
    {
        return $this->month;
    }

    public function setMonth($month): self
    {
        $this->month = $month;

        return $this;
    }

    public function getYear()
    {
        return $this->year;
    }

    public function setYear($year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }

    /**
     * Get the value of file
     *
     * @return  File|null
     */
    public function getFile(): ?File
    {
        return $this->file;
    }

    /**
     * Set the value of file
     *
     * @param  File|null  $file
     *
     * @return  self
     */
    public function setFile($file): self
    {
        $this->file = $file;

        return $this;
    }

    /**
     * Get the value of fileUrl
     *
     * @return  string|null
     */
    public function getFileUrl(): ?string
    {
        return $this->fileUrl;
    }

    /**
     * Set the value of fileUrl
     *
     * @param  string|null  $fileUrl
     *
     * @return  self
     */
    public function setFileUrl($fileUrl): self
    {
        $this->fileUrl = $fileUrl;

        return $this;
    }
}
