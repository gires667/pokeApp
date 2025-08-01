<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use App\Entity\Pokemon;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'app:import-pokemon',
    description: 'import pokemon from pokeAPi',    //importe les pokemon depuis pokeAPI//
)]
class ImportPokemonCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private HttpClientInterface $httpClient
    )   
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        for ($i = 1; $i <= 151; $i++) {
            $response = $this->httpClient->request(
                'GET',
                'https://pokeapi.co/api/v2/pokemon/' . $i
            );

            $data = $response->toArray();

            $pokemon = new Pokemon();
            $pokemon->setPokeID($data['id']);
            $pokemon->setName($data['name']);
            $pokemon->setImage($data['sprites']['front_default']);

            $types = array_map(fn($type) => $type['type']['name'], $data['types']);
            $pokemon->setTypes($types);

            $this->entityManager->persist($pokemon);
            $output->writeln("✅ " . $data['name'] . " importé !");
        }

        $this->entityManager->flush();
        $output->writeln("🎉 Tous les Pokémon ont été importés !");
            return Command::SUCCESS;
    }
}

    