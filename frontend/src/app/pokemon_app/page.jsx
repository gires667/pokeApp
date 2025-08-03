"use client";

import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const typeColors = {
  fire: "#f57c00",
  water: "#0288d1",
  grass: "#66bb6a",
  electric: "#fbc02d",
  psychic: "#ab47bc",
  ice: "#4dd0e1",
  dragon: "#673ab7",
  dark: "#455a64",
  fairy: "#f06292",
  normal: "#bdbdbd",
  poison: "#9c27b0",
  ground: "#a1887f",
  bug: "#8bc34a",
  ghost: "#7e57c2",
  fighting: "#e57373",
  rock: "#795548",
  steel: "#90a4ae",
  flying: "#81d4fa",
};

export default function Pokemon_app() {
  const [pokemonList, setPokemonList] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const res = await fetch("https://127.0.0.1:8080/custom-api/pokemon");
        const data = await res.json();
        setPokemonList(data.member);
      } catch (err) {
        console.error("Erreur de fetch:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonList();
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => (prev + 1) % pokemonList.length),
    onSwipedRight: () =>
      setIndex((prev) => (prev - 1 + pokemonList.length) % pokemonList.length),
    trackMouse: true,
  });

  if (loading) return <div style={styles.loading}>Chargement...</div>;
  if (!pokemonList || pokemonList.length === 0)
    return <div style={styles.message}>Aucun Pokémon trouvé.</div>;

  const pokemon = pokemonList[index];
  const backgroundColor = typeColors[pokemon.types[0]] || "#e0e0e0";

  const handleSearchChange = (e) => {
  const value = e.target.value.toLowerCase();
  setSearch(value);

  const filtered = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(value)
  );
  setSuggestions(value ? filtered.slice(0, 5) : []);
};

const handleSuggestionClick = (pokemonName) => {
  const idx = pokemonList.findIndex(
    (p) => p.name.toLowerCase() === pokemonName.toLowerCase()
  );
  if (idx !== -1) {
    setIndex(idx);
    setSearch("");
    setSuggestions([]);
  }
};

  return (
    <div
      {...handlers}
      style={{
        ...styles.container,
        backgroundColor,
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    >
      <h1 style={styles.title}>Pokédex</h1>
    
<div style={styles.searchWrapper}>
  <input
    type="text"
    placeholder="Rechercher un Pokémon..."
    value={search}
    onChange={handleSearchChange}
    style={styles.searchInput}
  />
  {search && (
    <ul style={styles.suggestionsList}>
      {suggestions.length > 0 ? (
        suggestions.map((p) => (
          <li
            key={p.id}
            onClick={() => handleSuggestionClick(p.name)}
            style={styles.suggestionItem}
          >
            {p.name}
          </li>
        ))
      ) : (
        <li style={styles.noResult}>Aucun Pokémon trouvé</li>
      )}
    </ul>
  )}
</div>


      <div style={styles.sliderWrapper}>
        <button onClick={() => setIndex((index - 1 + pokemonList.length) % pokemonList.length)} style={styles.arrow}>
          ⬅
        </button>

        <div style={styles.card}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={styles.pokemonImage}
          />
          <h2 style={styles.pokemonName}>
            #{pokemon.pokeID} {pokemon.name}
          </h2>
          <ul style={styles.typesList}>
            {pokemon.types.map((type, i) => (
              <li key={i} style={styles.typeItem}>
                {type}
              </li>
            ))}
          </ul>
        </div>

        <button onClick={() => setIndex((index + 1) % pokemonList.length)} style={styles.arrow}>
          ➡
        </button>
      </div>

      <p style={styles.instructions}>Swipe ou clique sur les flèches ← →</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    padding: "2rem",
    fontFamily: "sans-serif",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.5s ease",
  },
  title: {
fontSize: "2.5rem",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  sliderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
  },
  arrow: {
    fontSize: "2rem",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    padding: "0.5rem",
    transition: "transform 0.2s",
  },
  card: {
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "24px",
    padding: "2.5rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    backdropFilter: "blur(6px)",
    textAlign: "center",
    maxWidth: "350px",
    width: "100%",
  },
  pokemonImage: {
    width: "180px",
    height: "180px",
    objectFit: "contain",
  },
  pokemonName: {
    fontSize: "1.8rem",
    margin: "1rem 0 0.5rem",
    textTransform: "capitalize",
  },
  typesList: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  typeItem: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: "9999px",
    padding: "0.35rem 0.9rem",
    fontSize: "0.95rem",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  instructions: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.8)",
  },
  loading: {
    fontSize: "1.5rem",
    textAlign: "center",
    marginTop: "4rem",
  },
  message: {
    fontSize: "1.2rem",
    textAlign: "center",
    marginTop: "4rem",
  },
};