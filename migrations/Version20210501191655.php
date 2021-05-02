<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210501191655 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE wage_slip CHANGE amount amount DOUBLE PRECISION NOT NULL, CHANGE contributions contributions DOUBLE PRECISION NOT NULL, CHANGE month month DOUBLE PRECISION NOT NULL, CHANGE year year NUMERIC(10, 0) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE wage_slip CHANGE amount amount NUMERIC(10, 0) NOT NULL, CHANGE contributions contributions NUMERIC(10, 0) NOT NULL, CHANGE month month INT NOT NULL, CHANGE year year INT NOT NULL');
    }
}
