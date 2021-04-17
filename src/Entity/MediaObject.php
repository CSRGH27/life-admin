<?php



namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CreateMediaObjectAction;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity
 * @ApiResource(iri="http://schema.org/MediaObject", collectionOperations={
 *     "get",
 *     "post"={
 *         "method"="POST",
 *         "path"="/media_objects",
 *         "controller"=CreateMediaObjectAction::class,
 *         "defaults"={"_api_receive"=false},
 *     },
 * })
 * @Vich\Uploadable
 */
class MediaObject

{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    public $id;


    /**
     * @var File|null
     * @Assert\NotNull()
     * @Vich\UploadableField(mapping="media_object", fileNameProperty="contentUrl")
     */
    public $file;

    /**
     * @var string|null
     * @ORM\Column(nullable=true)
     * @ApiProperty(iri="http://schema.org/contentUrl")
     */
    public $contentUrl;

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of file
     *
     * @return  File|null
     */
    public function getFile()
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
    public function setFile($file)
    {
        $this->file = $file;

        return $this;
    }

    /**
     * Get the value of contentUrl
     *
     * @return  string|null
     */
    public function getContentUrl()
    {
        return $this->contentUrl;
    }

    /**
     * Set the value of contentUrl
     *
     * @param  string|null  $contentUrl
     *
     * @return  self
     */
    public function setContentUrl($contentUrl)
    {
        $this->contentUrl = $contentUrl;

        return $this;
    }
}
