import Link from "next/link";

async function getData() {
  const res = await fetch("https://anapioficeandfire.com/api/books");

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
}

export default async function Page() {
  const books = await getData();

  return (
    <>
      <h1>Books</h1>
      <ul>
        {books.map((book: any) => {
          const bookId = book.url.split("/").pop(); // Extract ID from API URL

          return (
            <li key={bookId}>
              <Link href={`/books/${bookId}`}>{book.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
