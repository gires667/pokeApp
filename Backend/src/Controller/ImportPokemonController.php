<?php

namespace App\Controller;

use App\Entity\Pokemon;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ImportPokemonController extends AbstractController
{
    #[Route('/api/import-pokemon', name: 'api_import_pokemon', methods: ['POST'])]
    public function import(EntityManagerInterface $em): JsonResponse
    {
        $httpClient = HttpClient::create();

        try {
            $response = $httpClient->request('GET', 'https://pokeapi.co/api/v2/pokemon?limit=151');
            $results = $response->toArray()['results'];

            $imported = 0;

            foreach ($results as $pokemonData) {
                $details = $httpClient->request('GET', $pokemonData['url'])->toArray();

                $pokeID = $details['id'];
                $name = $details['name'];
                $image = $details['sprites']['front_default'];
                $types = array_map(fn($t) => $t['type']['name'], $details['types']);

                // Vérifie si le Pokémon existe déjà
                $existing = $em->getRepository(Pokemon::class)->findOneBy(['pokeID' => $pokeID]);
                if ($existing) {
                    continue;
                }

                $pokemon = new Pokemon();
                $pokemon->setPokeID($pokeID);
                $pokemon->setName($name);
                $pokemon->setImage($image);
                $pokemon->setTypes($types);

                $em->persist($pokemon);
                $imported++;
            }

            $em->flush();

            return $this->json([
                'status' => 'success',
                'imported' => $imported,
                'message' => "$imported Pokémon importés depuis PokéAPI"
            ]);
        } catch (\Throwable $e) {
            return $this->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

