<?php

namespace App\Controller;

use App\Repository\PokemonRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

final class PokemonController extends AbstractController
{
    #[Route('/custom-api/pokemon', name: 'custom_api_pokemon', methods: ['GET'])]
    public function getPokemons(PokemonRepository $pokemonRepository): JsonResponse
    {
        $pokemons = $pokemonRepository->findAll();

        $data = [
            '@context' => '/api/contexts/Pokemon',
            '@id' => '/api/pokemon',
            '@type' => 'Collection',
            'totalItems' => count($pokemons),
            'member' => array_map(function ($pokemon) {
                return [
                    '@id' => '/api/pokemon/' . $pokemon->getId(),
                    '@type' => 'Pokemon',
                    'id' => $pokemon->getId(),
                    'pokeID' => $pokemon->getPokeID(),
                    'name' => $pokemon->getName(),
                    'image' => $pokemon->getImage(),
                    'types' => $pokemon->getTypes(), // array comme ["grass", "poison"]
                ];
            }, $pokemons),
        ];

        return $this->json($data);
    }
}
