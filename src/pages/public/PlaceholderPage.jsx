import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 pt-[92px] flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="font-poppins font-semibold text-5xl lg:text-6xl text-[#1E293B] mb-6">
            {title}
          </h1>

          <p className="font-inter text-2xl text-[#475569] mb-8">
            This page is coming soon. Please continue exploring or return to the
            homepage.
          </p>

          <Link
            to="/"
            className="inline-block bg-[#0A2463] text-white font-inter font-bold text-xl px-8 py-4 rounded-xl hover:bg-[#1E3A8A] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
