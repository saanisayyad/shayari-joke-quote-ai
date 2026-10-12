import { useState } from "react";
import axios from "axios";
import { FaRegCopy, FaArrowsRotate, FaArrowUpRightFromSquare } from "react-icons/fa6";

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
      setError(
        err.response?.data?.error ||
          "The universe is ignoring us. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyThought = async () => {
    if (!thought) return;
    try {
      await navigator.clipboard.writeText(thinker ? `${thought}\n— ${thinker}` : thought);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Could not copy thought:", err);
      setError("Clipboard access failed. Try selecting the text and copying it manually.");
    }
  };

  return (
    <main className="editorial-main relative w-full flex-1 overflow-hidden">
      <div aria-hidden="true" className="editorial-grain" />
      <div className="editorial-wrap relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-10 pt-9 sm:px-8 sm:pt-14 lg:px-14 lg:pb-16 lg:pt-16">
        <div className="editorial-kicker mb-7 flex items-center justify-between gap-4 sm:mb-10">
          <span className="flex items-center gap-2.5">
            <span className="editorial-live-dot" />
            An exercise in overthinking
          </span>
          <span className="hidden sm:inline">Vol. 001 / Unfinished thoughts</span>
        </div>

        <div className="editorial-grid grid grid-cols-1 gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 xl:gap-20">
          <section className="editorial-hero relative">
            <div className="editorial-index" aria-hidden="true">01</div>
            <p className="editorial-eyebrow mb-4 sm:mb-6">Welcome to your own head.</p>
            <h1 className="editorial-title">
              EXISTENTIAL
              <span className="editorial-title-second block">DAMAGE<span className="editorial-period">.</span></span>
            </h1>
            <div className="editorial-bottomline mt-6 flex items-end justify-between gap-5 sm:mt-8">
              <p className="max-w-[18rem] text-sm leading-6 text-stone-400 sm:text-base sm:leading-7">
                Some thoughts don't leave when you ask them to.
              </p>
              <span className="editorial-scribble hidden sm:block" aria-hidden="true">∿</span>
            </div>
            <div className="editorial-rule mt-8 sm:mt-10" />
          </section>

          <section aria-label="Thought generator" className="editorial-panel relative">
            <div className="editorial-panel-top flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="editorial-symbol" aria-hidden="true">∴</span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#f2f0e8]">The Unquiet Mind</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#85877b]">Thought generator</p>
                </div>
              </div>
              <span className="editorial-status">LIVE THOUGHTS</span>
            </div>

            <div className="editorial-paper mt-5 sm:mt-7">
              <div className="editorial-paper-meta flex items-center justify-between">
                <span>{thought ? "A MOMENT TO KEEP" : "A MOMENT OF CLARITY"}</span>
                <span>✳</span>
              </div>
              <div aria-live="polite" aria-busy={loading} className="editorial-thought flex min-h-[230px] flex-col justify-center sm:min-h-[280px]">
                {thought ? (
                  <div key={thought} className="editorial-reveal">
                    <span className="editorial-quote-mark" aria-hidden="true">“</span>
                    <p className="editorial-quote">{thought}</p>
                    <div className="editorial-attribution mt-7 flex items-center gap-3">
                      <span className="editorial-attribution-line" />
                      <p>{thinker}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="editorial-quote-mark" aria-hidden="true">“</span>
                    <p className="editorial-quote editorial-placeholder">
                      Your mind called. It has a few things to say.
                    </p>
                    <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77796f]">
                      Take a breath. Then don't.
                    </p>
                  </div>
                )}
                {loading && (
                  <p className="mt-5 flex items-center gap-2 text-xs font-medium text-[#67695e]">
                    <FaArrowsRotate className="animate-spin" />
                    Asking the difficult questions…
                  </p>
                )}
                {error && <p role="alert" className="mt-5 border-l-2 border-[#c7f36b] pl-3 text-sm leading-6 text-[#55574d]">{error}</p>}
              </div>
              <div className="editorial-paper-footer flex items-center justify-between">
                <span>READ THAT AGAIN.</span>
                <span>— TUM</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={generateThought}
                disabled={loading}
                className="editorial-generate group flex min-h-[56px] flex-1 items-center justify-between gap-4 px-5 py-4 text-sm font-bold transition duration-200 disabled:cursor-wait disabled:opacity-60 sm:px-6"
              >
                <span className="flex items-center gap-3">
                  <FaArrowsRotate className={loading ? "animate-spin" : "transition-transform duration-500 group-hover:rotate-180"} />
                  {loading ? "Consulting the void…" : thought ? "Give me another" : "Hit me with a thought"}
                </span>
                <FaArrowUpRightFromSquare className="text-xs opacity-60" />
              </button>
              {thought && (
                <button
                  type="button"
                  onClick={copyThought}
                  disabled={loading}
                  className="editorial-copy flex min-h-[56px] items-center justify-center gap-2.5 px-5 py-4 text-sm font-semibold transition disabled:opacity-50"
                >
                  <FaRegCopy />
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
          </section>
        </div>

        <div className="editorial-endline mt-12 flex items-center justify-between gap-4 sm:mt-16">
          <span>FOR THE BEAUTIFULLY OVERTHOUGHT.</span>
          <span className="hidden sm:inline">SCROLL LESS. THINK MORE.</span>
          <span aria-hidden="true" className="text-lg text-[#c7f36b]">↘</span>
        </div>
      </div>
    </main>
  );
};

export default Home;
