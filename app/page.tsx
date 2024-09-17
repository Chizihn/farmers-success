import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function Home() {
  return (
    <section>
      <nav>
        <Navbar />
        <Products />
      </nav>
      <h1>Body</h1>
    </section>
  );
}
