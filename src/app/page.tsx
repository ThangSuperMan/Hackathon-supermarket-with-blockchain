import { Poppins } from "@next/font/google";

const poppins = Poppins({ weight: ["300"], subsets: ["latin"] });

export default function Home() {
  return <main className={poppins.className}></main>;
}
