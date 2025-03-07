import { GrammarPreview } from "../components/GrammarPreview";
import Header from "../components/Header";
import { useGrammar } from "../hooks/useGrammar";

export default function Home() {
  const { text, setText, mistakes, loading } = useGrammar();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="max-w-7xl mx-auto p-4 w-full flex-1 flex flex-col justify-center gap-4">
        <div className=" h-36 rounded-lg border bg-gray-100 border-gray-100 text-gray-800 p-2 relative">
          <GrammarPreview mistakes={mistakes} value={text} />
          {loading && (
            <div className="absolute bottom-2 flex">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        <textarea
          className="w-full bg-white rounded-lg border border-gray-300 p-2 h-36"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Let's start writing..."
        />
      </section>
    </main>
  );
}
