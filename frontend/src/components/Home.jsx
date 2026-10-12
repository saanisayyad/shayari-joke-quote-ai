import { useState } from "react";
import axios from "axios";
import { FaRegCopy, FaArrowsRotate } from "react-icons/fa6";

const Home = () => {
  const [thought, setThought] = useState("");
  const [thinker, setThinker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateThought = async () => {
    try {
      setLoading(true);
      setError("");
      setCopied(false);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/thought`);
      setThought(response.data.thought || "");
      setThinker(response.data.thinker || "The Unquiet Mind");
    } catch (err) {
      console.error("Thought generation failed:", err);
      setError(err.response?.data?.error || "The universe is ignoring us. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyThought = async () => {
    if (!thought) return;
    try {
      await navigator.clipboard.writeText(thinker ? `${thought}\n— ${thinker}` : thought);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Could not copy thought:", err);
      setError("Clipboard access failed. Try selecting the text and copying it manually.");
    }
  };

  return (
    <main className="relative flex w-full flex-1 flex-col items-center justify-center px-5 py-14 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="relative z-10 mb-8 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rose-300">
          A thought for your overthinking hours
        </p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-stone-100 sm:text-6xl md:text-7xl">
          Existential <span className="text-rose-300">Damage.</span>
        </h1>
      </div>

      <section className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-stone-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <div className="mb-7 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
            The unquiet mind
          </span>
          <span className="h-2 w-2 rounded-full bg-rose-300 shadow-[0_0_14px_rgba(253,164,175,0.8)]" />
        </div>

        <div className="flex min-h-44 flex-col justify-center">
          {thought ? (
            <>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-rose-300">
                {thinker}
              </p>
              <p className="whitespace-pre-wrap text-xl leading-relaxed text-stone-100 sm:text-2xl">
                {thought}
              </p>
            </>
          ) : (
            <p className="text-lg leading-8 text-stone-500 sm:text-xl">
              Your next existential crisis is one click away.
            </p>
          )}
          {error && <p role="alert" className="mt-5 text-sm text-rose-300">{error}</p>}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={generateThought}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-3 rounded-full bg-rose-300 px-6 py-4 font-bold text-stone-950 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaArrowsRotate className={loading ? "animate-spin" : ""} />
            {loading ? "Consulting the void..." : "Give Me a Thought"}
          </button>
          {thought && (
            <button
              type="button"
              onClick={copyThought}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-4 text-sm font-semibold text-stone-300 transition hover:bg-white/5 disabled:opacity-50"
            >
              <FaRegCopy />
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
