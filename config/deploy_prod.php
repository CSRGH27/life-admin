<?php



use EasyCorp\Bundle\EasyDeployBundle\Deployer\DefaultDeployer;

return new class extends DefaultDeployer
{
    public function configure()
    {
        return $this->getConfigBuilder()
            ->server('debian@51.178.50.201')
            ->deployDir('/var/www/systemeX')
            ->repositoryUrl('git@github.com:CSRGH27/systemeX.git')
            ->repositoryBranch('develop')
            ->symfonyEnvironment('prod');
    }
};
