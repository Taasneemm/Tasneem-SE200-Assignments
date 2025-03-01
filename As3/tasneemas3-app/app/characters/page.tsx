import Link from "next/link";

async function getData() {
  const res = await fetch("https://anapioficeandfire.com/api/characters?page=1&pageSize=10");

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return res.json();
}

export default async function Page() {
  const characters = await getData();

  return (
    <>
      <h1>Characters</h1>
      <ul>
        {characters.map((character: any) => {
          let name = "Unknown Character";
          let characterId = character.url.split("/").pop(); // Extracts the ID from API URL

          if (character.name) {
            name = character.name;
          } else if (character.aliases.length > 0) {
            name = `${character.aliases[0]} (Alias)`;
          }

          return (
            <li key={characterId}>
              <Link href={`/characters/${characterId}`}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
