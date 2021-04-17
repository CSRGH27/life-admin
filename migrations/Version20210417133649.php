<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210417133649 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE media_object (id INT AUTO_INCREMENT NOT NULL, content_url VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE wage_slip ADD pdf_file_id INT DEFAULT NULL, DROP pdf_file');
        $this->addSql('ALTER TABLE wage_slip ADD CONSTRAINT FK_1E9C32EBE071F843 FOREIGN KEY (pdf_file_id) REFERENCES media_object (id)');
        $this->addSql('CREATE INDEX IDX_1E9C32EBE071F843 ON wage_slip (pdf_file_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE wage_slip DROP FOREIGN KEY FK_1E9C32EBE071F843');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP INDEX IDX_1E9C32EBE071F843 ON wage_slip');
        $this->addSql('ALTER TABLE wage_slip ADD pdf_file VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, DROP pdf_file_id');
    }
}
