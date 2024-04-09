
import Game from "@/components/game";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function GameJoin({
  searchParams,
  params,
}: {
  searchParams: { name?: string };
  params: { gameId: string };
}) {
  async function appendName(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;

    // if (!name) {
    //   toast.error('Name is required'); // Display error toast if name is empty
    //   return;
    // }
    redirect(`/game/${params.gameId}?name=${name}`);
  }

  if (!searchParams.name)
    return (
      <main className="mx-auto max-w-5xl w-full mt-10 p-5">
        <Card className="w-full flex flex-col p-10">
          <h2 className="font-bold text-4xl md:text-5xl">Enter your name</h2>
          <p className="text-gray-400 mt-5 text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
            sequi repudiandae placeat ea veniam itaque perspiciatis soluta
            pariatur voluptas ratione harum, deleniti eum sunt tenetur autem,
            culpa totam. Expedita quasi quidem labore.
          </p>

          <form action={appendName} className="mt-10">
            <Input
              type="text"
              placeholder="name"
              name="name"
              className="text-xl px-5 py-7"
            />
            <Button type="submit" className="text-xl w-full mt-5 px-5 py-7">
              Join Game
            </Button>
          </form>
        </Card>
      </main>
    );

  return <Game />;
}
