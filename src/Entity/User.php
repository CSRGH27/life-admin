<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;



/**
 * @ApiResource
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity("email",
 *      message="l'email {{ value }} est deja utilise")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer", unique=true)
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\Email(message="{{ value }} n'est pas un email valide")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Le mot de passe doit être renseigné")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Votre prénom doit être renseigné")
     * @Assert\Length(min=2,
     *                minMessage="Votre prénom ne doit faire au moins {{ limit }} caractères" ,
     *                max=20,
     *                maxMessage="Votre prénom ne doit faire au maximum {{ limit }} caractères" 
     *                )
     *                  
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Votre nom doit être renseigné")
     * @Assert\Length(min=2,
     *                minMessage="Votre nom ne doit faire au moins {{ limit }} caractères" ,
     *                max=20,
     *                maxMessage="Votre nom ne doit faire au maximum {{ limit }} caractères" 
     *                )
     */
    private $name;

    /**
     * @ORM\Column(type="date")
     * @Assert\NotNull(message="Votre date de naissance doit être renseigné")
     */
    private $birthdate;

    /**
     * @ORM\OneToMany(targetEntity=WageSlip::class, mappedBy="user", orphanRemoval=true)
     */
    private $wageSlips;

    public function __construct()
    {
        $this->wageSlips = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(\DateTimeInterface $birthdate): self
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    /**
     * @return Collection|WageSlip[]
     */
    public function getWageSlips(): Collection
    {
        return $this->wageSlips;
    }

    public function addWageSlip(WageSlip $wageSlip): self
    {
        if (!$this->wageSlips->contains($wageSlip)) {
            $this->wageSlips[] = $wageSlip;
            $wageSlip->setUser($this);
        }

        return $this;
    }

    public function removeWageSlip(WageSlip $wageSlip): self
    {
        if ($this->wageSlips->removeElement($wageSlip)) {
            // set the owning side to null (unless already changed)
            if ($wageSlip->getUser() === $this) {
                $wageSlip->setUser(null);
            }
        }

        return $this;
    }
}
