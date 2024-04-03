import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full mx-auto max-w-5xl p-5">
      <h1 className="font-bold text-4xl mt-10">Typing Mate &nbsp;🚀</h1>
      <p className="mt-5 text-gray-400 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptas
        atque, nostrum nobis alias voluptatum quos possimus facilis eveniet
        inventore dignissimos ab quasi architecto aspernatur rerum consectetur
        magnam sapiente illo dicta, amet ipsum suscipit tempora exercitationem
        laudantium? Iste quidem ipsam laboriosam quia.
      </p>
      <Card className="p-5 mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 bg-card">
        <div className="p-5 flex flex-col justify-between">
          <div>
            <h2 className="font-medium text-2xl">Create Game</h2>
            <p className="text-gray-400 mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              dolor perferendis recusandae explicabo. Assumenda reiciendis
              dolore deleniti vel animi sequi.
            </p>
          </div>
          <div>
            <Button className="mt-5 w-full">
              Create Game As Host
            </Button>
          </div>
        </div>
        <div className="p-5 flex flex-col justify-between">
          <div>
            <h2 className="font-medium text-2xl">Create Game</h2>
            <p className="text-gray-400 mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              dolor perferendis recusandae explicabo. Assumenda reiciendis
              dolore deleniti vel animi sequi.
            </p>
          </div>
          <div className="mt-5">
            <form >
              <Input className="bg-custom-bg" type="text" placeholder="Invite Code" name="inviteCode"></Input>
              <Button className="mt-3 w-full">
              Join Game
            </Button>
            </form>
          </div>
        </div>
      </Card>
    </main>
  );
}
