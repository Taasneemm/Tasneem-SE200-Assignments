import { notFound } from "next/navigation";

export default async function CharacterDetail({ params }: { params: { id: string } }) {
  // Extract the character ID from the URL parameters
  const characterId = params.id;

  // Construct the API URL
  const apiUrl = `https://anapioficeandfire.com/api/characters/${characterId}`;

  // Fetch the character data AFTER extracting params.id
  const res = await fetch(apiUrl);

  // Handle API errors
  if (!res.ok) {
    throw new Error(`Failed to fetch character data for ID: ${characterId}`);
  }

  const character = await res.json();

  // If character data is empty or invalid, return 404
  if (!character || Object.keys(character).length === 0) {
    return notFound();
  }

  // Determine the character title:
  // - If `name` exists, use it.
  // - If using alias, append " (Alias)".
  const title = character.name 
    ? character.name 
    : character.aliases.length > 0 
      ? `${character.aliases[0]} (Alias)`
      : "Unknown Character";

  return (
    <>
      <h1>{title}</h1>
      <p><strong>Name:</strong> {character.name || "Unknown"}</p>
      <p><strong>Gender:</strong> {character.gender || "Unknown"}</p>
      <p><strong>Culture:</strong> {character.culture || "Unknown"}</p>
      <p><strong>Born:</strong> {character.born || "Unknown"}</p>
      <p><strong>Died:</strong> {character.died || "Unknown"}</p>

      {/* Titles Section */}
      <h2>Titles</h2>
      {character.titles.length > 0 ? (
        <ul>
          {character.titles.map((title: string, index: number) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}

      {/* Aliases Section */}
      <h2>Aliases</h2>
      {character.aliases.length > 0 ? (
        <ul>
          {character.aliases.map((alias: string, index: number) => (
            <li key={index}>{alias}</li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}
    </>
  );
}
