import { db } from "@/db";
import { redirect } from "next/navigation";

export default async function Page({params}) {
    const { id } = await params;
    const expenseItem = await db.expenseItem.findUnique({
        where: {
        id: Number(id),
        },
    });
    
    async function updateExpenseItem(formData: FormData) {
        "use server";
        const item = formData.get("updateItem") as string;
        const description = formData.get("updateDescription") as string;
    
        await db.expenseItem.update({
          where: {
            id: Number(id),
          },
          data: {
            item,
            description,
          },
        });

        redirect("/");
      }

    return (
        <>
            
            <form action={updateExpenseItem}>
                <h1>Update an Expense Item</h1>
                <label>Item:</label>
                <input name="updateItem" id="updateItem" defaultValue={expenseItem.item} />
                <br />
                <label>Description:</label>
                <textarea name="updateDescription" id="updateDescription" defaultValue={expenseItem.description} />
                <br />
                <button type="submit">Update Expense Item</button>
            </form>
        </>
    )
}