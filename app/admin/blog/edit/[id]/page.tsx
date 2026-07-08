// Blog module not yet in schema — redirect to main blog stub
import { redirect } from "next/navigation"

export default function EditBlogPage() {
  redirect("/admin/blog")
}