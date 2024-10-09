import Form from "@/components/organisms/Form";
import List from "@/components/organisms/List";
import { UserUpdateProvider } from "@/contexts/UserUpdateContext";

export default function Home() {
  return (
    <main className="bg-[#141414] min-h-screen w-full">
      <UserUpdateProvider>
        <Form />
        <List />
      </UserUpdateProvider>
    </main>
  );
}
