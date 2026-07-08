import EditCategory from "./editClient";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { categories } from "@/server/modules/category/category.schema";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const categoryInfo = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id));

  const category = categoryInfo[0] ?? null;

  if (!category) notFound();

  return (
    <>
      <EditCategory categoryInfo={category} />
    </>
  );
};

export default Page;
