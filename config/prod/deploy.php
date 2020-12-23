<?php

use EasyCorp\Bundle\EasyDeployBundle\Deployer\DefaultDeployer;

return new class extends DefaultDeployer
{
    public function configure()
    {
        return $this->getConfigBuilder()
            ->server('debian@51.178.50.201')
            ->deployDir('/var/www/life-admin')
            ->repositoryUrl('git@github.com:CSRGH27/life-admin.git')
            ->sharedFilesAndDirs(['.env', 'config/jwt'])
            ->repositoryBranch('master')
            ->symfonyEnvironment('prod');
    }

    // run some local or remote commands before the deployment is started
    public function beforeStartingDeploy()
    {
        // $this->runLocal('./vendor/bin/simple-phpunit');
    }
    public function beforePreparing()
    {
        //$this->runRemote('cp {{ deploy_dir }}/repo/.env {{ project_dir }}/.env');
    }


    // run some local or remote commands after the deployment is finished
    public function beforeFinishingDeploy()
    {
        $this->runRemote('cd {{ project_dir }}');
        $this->runRemote('yarn install');
        $this->runRemote('yarn build');
        // $this->runLocal('say "The deployment has finished."');
    }
};
