import { useState } from "react";
import axios from "axios";
import { FaRegCopy, FaArrowsRotate, FaArrowDownLong } from "react-icons/fa6";

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/thought`
      );
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
      await navigator.clipboard.writeText(
        thinker ? `${thought}\n— ${thinker}` : thought
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Could not copy thought:", err);
      setError("Clipboard access failed. Try selecting the text and copying it manually.");
    }
  };

  return (
    <main className="quiet-main relative flex w-full flex-1 flex-col items-center justify-center px-4 pb-10 pt-9 sm:px-6 sm:py-16">
      <div aria-hidden="true" className="quiet-orb quiet-orb-one pointer-events-none absolute" />
      <div aria-hidden="true" className="quiet-orb quiet-orb-two pointer-events-none absolute" />

      <div className="relative z-10 mb-7 w-full max-w-3xl text-center sm:mb-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400 sm:mb-6 sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-300 shadow-[0_0_12px_rgba(253,164,175,0.85)]" />
          A thought for your overthinking hours
        </div>
        <h1 className="quiet-title text-[clamp(2.8rem,10vw,6.7rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-stone-100">
          Existential
          <span className="quiet-title-accent block">Damage.</span>
        </h1>
      </div>

      <section
        aria-label="Thought generator"
        className="quiet-card relative z-10 w-full max-w-2xl rounded-[1.65rem] p-px sm:rounded-[2rem]"
      >
        <div className="quiet-card-inner rounded-[calc(1.65rem-1px)] px-5 pb-5 pt-5 sm:rounded-[calc(2rem-1px)] sm:px-9 sm:pb-8 sm:pt-7">
          <div className="mb-8 flex items-center justify-between sm:mb-10">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200/15 bg-rose-200/[0.07] font-serif text-lg text-rose-200">
                ∴
              </span>
              <div className="text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-200">
                  The Unquiet Mind
                </p>
              </div>
            </div>
            <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-stone-500">
              No. {thought ? "∞" : "001"}
            </span>
          </div>

          <div aria-live="polite" aria-busy={loading} className="quiet-thought flex min-h-[13rem] flex-col justify-center sm:min-h-[15rem]">
            {thought ? (
              <div key={thought} className="thought-enter">
                <p className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-200 sm:text-[11px]">
                  <span className="h-px w-5 bg-rose-300/60" />
                  {thinker}
                </p>
                <p className="whitespace-pre-wrap font-serif text-[1.45rem] leading-[1.48] tracking-[-0.025em] text-stone-100 sm:text-[2rem] sm:leading-[1.45]">
                  {thought}
                </p>
              </div>
            ) : (
              <div className="py-5">
                <span aria-hidden="true" className="mb-5 block font-serif text-5xl leading-none text-rose-200/70">“</span>
                <p className="max-w-md font-serif text-[1.4rem] leading-[1.5] tracking-[-0.025em] text-stone-300 sm:text-[1.8rem]">
                  Your next existential crisis is one click away.
                </p>
                <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-stone-600">
                  Ready when you are
                </p>
              </div>
            )}
            {loading && (
              <p className="mt-5 flex items-center gap-2 text-xs text-stone-500">
                <FaArrowsRotate className="animate-spin text-rose-200" />
                Consulting the void…
              </p>
            )}
            {error && <p role="alert" className="mt-5 rounded-xl border border-rose-300/15 bg-rose-300/[0.06] px-3.5 py-3 text-sm leading-6 text-rose-200">{error}</p>}
          </div>

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent sm:my-7" />

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={generateThought}
              disabled={loading}
              className="quiet-primary flex min-h-[54px] flex-1 items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-[#1b1013] transition duration-200 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-65 sm:rounded-full"
            >
              <FaArrowsRotate className={loading ? "animate-spin" : ""} />
              {loading ? "Consulting the void…" : thought ? "Another thought" : "Give me a thought"}
              {!loading && <FaArrowDownLong className="ml-auto text-xs opacity-60 sm:ml-1" />}
            </button>
            {thought && (
              <button
                type="button"
                onClick={copyThought}
                disabled={loading}
                className="quiet-secondary flex min-h-[54px] items-center justify-center gap-2.5 rounded-2xl border border-white/[0.1] px-5 py-4 text-sm font-medium text-stone-300 transition hover:border-rose-200/25 hover:bg-white/[0.04] disabled:opacity-50 sm:rounded-full"
              >
                <FaRegCopy />
                {copied ? "Copied" : "Copy thought"}
              </button>
            )}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
