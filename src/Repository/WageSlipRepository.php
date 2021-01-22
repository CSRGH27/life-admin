<?php

namespace App\Repository;

use App\Entity\WageSlip;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method WageSlip|null find($id, $lockMode = null, $lockVersion = null)
 * @method WageSlip|null findOneBy(array $criteria, array $orderBy = null)
 * @method WageSlip[]    findAll()
 * @method WageSlip[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WageSlipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WageSlip::class);
    }

    // /**
    //  * @return WageSlip[] Returns an array of WageSlip objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WageSlip
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
