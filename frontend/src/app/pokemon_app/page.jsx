"use client";

import React, { useEffect, useState } from "react";

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const res = await fetch("https://127.0.0.1:8080/api/pokemon");
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();
        console.log("Data reçue :", data);
        setPokemonList(data.member);
      } catch (error) {
        console.error("Erreur de fetch:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonList();
  }, []);

  if (loading) return <div style={styles.loading}>Chargement...</div>;
  if (!pokemonList || pokemonList.length === 0)
    return <div style={styles.message}>Aucun Pokémon trouvé.</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pokédex</h1>
      <ul style={styles.pokemonList}>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id} style={styles.pokemonItem}>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              style={styles.pokemonImage}
            />
            <h2 style={styles.pokemonName}>
              #{pokemon.pokeID} {pokemon.name}
            </h2>
            <ul style={styles.typesList}>
              {pokemon.types.map((type, index) => (
                <li key={index} style={styles.typeItem}>
                  {type}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  pokemonList: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  pokemonItem: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  pokemonImage: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  pokemonName: {
    fontSize: "1.2rem",
    margin: "0.5rem 0",
  },
 typesList: {
  listStyle: "none",
  padding: 0,
  display: "flex", // ✅ ici on définit bien la valeur
  justifyContent: "center",
  gap: "0.5rem",
  flexWrap: "wrap",
}
}
