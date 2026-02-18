// export default function Home() {
//   return (
//     <main className="flex min-h-screen items-center justify-center">
//       <h1 className="text-2xl font-semibold text-yellow-300 ">
//         Smart Bookmark App
//       </h1>
//     </main>
//   );
// }


import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
