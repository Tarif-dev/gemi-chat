import Image from "next/image";
import ChatInput from "@/components/ChatInput";
import SidePanel from "@/components/SidePanel";
import User from "@/components/User";

export default function Home() {
  return (
    <div className="h-screen w-screen flex">
      <SidePanel />
      <div className="flex flex-col px-4 py-8 h-full w-full ">
        <User/>
        <section className="flex items-center justify-center h-full">
          <h1 className="font-bold text-4xl">Hello, Tarif</h1>
        </section>
        <section className="w-full lg:px-16">
          <ChatInput />
        </section>
      </div>
      
    </div>
  );
}
