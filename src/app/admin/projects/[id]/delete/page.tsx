// app/admin/projects/[id]/delete/page.tsx
import { deleteProjectAction } from "@/../action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteRoute({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="min-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            project and remove all data from our servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/admin/projects">Cancel</Link>
          </Button>
          <form action={deleteProjectAction}>
            <input type="hidden" name="projecttId" value={id} />
            <Button variant="destructive" type="submit">
              Delete Project
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
