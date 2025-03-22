import { db } from "@/db";
import { redirect } from "next/navigation";

interface DeleteExpensePageProps {
  params: {
    id: string;
  };
}

export default async function DeleteExpensePage({ params }: DeleteExpensePageProps) {
  const { id } = params;

  
  const expenseItem = await db.expenseItem.findUnique({
    where: { id: Number(id) },
  });

  
  if (!expenseItem) {
    redirect("/");
  }

  
  async function handleNo() {
    "use server";
    redirect("/");
  }

  
  async function handleYes() {
    "use server";
    await db.expenseItem.delete({
      where: { id: Number(id) },
    });
    redirect("/");
  }

  return (
    <div>
      <h1>
        Are you sure you want to delete{" "}
        <strong>{expenseItem.item}</strong>?
      </h1>
      <p>This action cannot be undone.</p>

      {/* NO button */}
      <form action={handleNo}>
        <button type="submit">No</button>
      </form>

      {/* YES button */}
      <form action={handleYes}>
        <button type="submit">Yes</button>
      </form>
    </div>
  );
}
