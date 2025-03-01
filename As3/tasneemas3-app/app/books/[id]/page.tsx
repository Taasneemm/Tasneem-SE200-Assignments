import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BookDetail({ params }: { params: { id: string } }) {
  // Extract the Book ID from the URL parameters
  const bookId = params.id;

  // Construct the API URL
  const apiUrl = `https://anapioficeandfire.com/api/books/${bookId}`;

  // Fetch the book data AFTER extracting params.id
  const res = await fetch(apiUrl);

  // Handle API errors
  if (!res.ok) {
    throw new Error(`Failed to fetch book data for book ID: ${bookId}`);
  }

  const book = await res.json();

  // If book data is empty or invalid, return 404
  if (!book || Object.keys(book).length === 0) {
    return notFound();
  }

  return (
    <>
      <h1>{book.name}</h1>
      <p><strong>ISBN:</strong> {book.isbn || "Unknown"}</p>
      <p><strong>Authors:</strong> {book.authors.length > 0 ? book.authors.join(", ") : "Unknown"}</p>
      <p><strong>Number of Pages:</strong> {book.numberOfPages || "Unknown"}</p>
      <p><strong>Publisher:</strong> {book.publisher || "Unknown"}</p>
      <p><strong>Country:</strong> {book.country || "Unknown"}</p>
      <p><strong>Released:</strong> {book.released ? new Date(book.released).toLocaleDateString() : "Unknown"}</p>

      {/* POV Characters Section */}
      <h2>POV Characters</h2>
      {book.povCharacters.length > 0 ? (
        <ul>
          {book.povCharacters.map((characterUrl: string) => {
            const characterId = characterUrl.split("/").pop(); // Extracts ID from URL
            return (
              <li key={characterId}>
                <Link href={`/characters/${characterId}`}>Character {characterId}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>None</p>
      )}
    </>
  );
}
