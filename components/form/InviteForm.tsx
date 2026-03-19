"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";

/* ─────────────────────────────────────────────
   Multi-choice helpers
───────────────────────────────────────────── */
function toggleMulti(current: string | undefined, opt: string): string {
  const arr = current ? current.split("||") : [];
  return arr.includes(opt)
    ? arr.filter((v) => v !== opt).join("||")
    : [...arr, opt].join("||");
}

function isMultiSelected(current: string | undefined, opt: string): boolean {
  return current ? current.split("||").includes(opt) : false;
}

/* ─────────────────────────────────────────────
   Step dots
───────────────────────────────────────────── */
function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: i === current ? "24px" : "6px",
            height: "6px",
            borderRadius: "99px",
            backgroundColor:
              i < current
                ? "var(--ochre)"
                : i === current
                ? "var(--navy)"
                : "rgba(42,77,106,0.18)",
            transition: "all 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function InviteForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);

  const question = questions[step];
  const isLast = step === questions.length - 1;
  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleMulti = (key: string, opt: string) => {
    setAnswers((prev) => ({ ...prev, [key]: toggleMulti(prev[key], opt) }));
  };

  const canProceed = !!answers[question.key]?.trim();

  const animateStep = (fn: () => void, dir: "forward" | "back") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      fn();
      setAnimating(false);
    }, 320);
  };

  const next = () => {
    if (!canProceed) return;
    if (isLast) {
      setSubmitted(true);
      return;
    }
    animateStep(() => setStep((s) => s + 1), "forward");
  };

  const back = () => {
    if (step === 0) {
      router.push("/");
      return;
    }
    animateStep(() => setStep((s) => s - 1), "back");
  };

  /* ── Submitted screen ── */
  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <div
          className="text-center flex flex-col items-center gap-6 w-full"
          style={{ maxWidth: "520px" }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "1.5px solid var(--ochre)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              flexShrink: 0,
            }}
          >
            ✦
          </div>

          <span
            className="font-heading text-[9px] tracking-[0.4em] uppercase"
            style={{ color: "var(--sage)" }}
          >
            Application Received
          </span>

          <h2
            className="font-serif italic leading-[1.06]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              color: "var(--navy)",
            }}
          >
            We&apos;ll be in<br />
            <span style={{ color: "var(--ochre)" }}>touch soon.</span>
          </h2>

          <p
            className="font-heading text-sm md:text-base leading-relaxed"
            style={{ color: "rgba(61,61,61,0.65)", fontWeight: 300 }}
          >
            Thank you, {answers.name || "friend"}. We review every application
            personally. If the fit feels right, you&apos;ll hear from us within a few
            days.
          </p>

          <div className="flex items-center gap-5 opacity-25 my-1">
            <div className="h-px w-12" style={{ backgroundColor: "var(--sand)" }} />
            <span
              className="font-serif italic text-lg"
              style={{ color: "var(--sand)" }}
            >
              ✦
            </span>
            <div className="h-px w-12" style={{ backgroundColor: "var(--sand)" }} />
          </div>

          <button
            onClick={() => router.push("/")}
            className="font-heading text-[11px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-50"
            style={{
              background: "none",
              border: "none",
              borderBottom: "1px solid rgba(201,139,45,0.4)",
              color: "var(--navy)",
              cursor: "pointer",
              paddingBottom: "4px",
            }}
          >
            ← Back to JUNO
          </button>
        </div>
      </div>
    );
  }

  /* ── Slide animation style ── */
  const slideStyle: React.CSSProperties = {
    opacity: animating ? 0 : 1,
    transform: animating
      ? direction === "forward"
        ? "translateX(32px)"
        : "translateX(-32px)"
      : "translateX(0)",
    transition: "opacity 0.32s ease, transform 0.32s ease",
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* ── Progress bar flush under navbar ── */}
      <div
        style={{
          position: "fixed",
          top: "80px",
          left: 0,
          right: 0,
          height: "2px",
          zIndex: 50,
          backgroundColor: "rgba(42,77,106,0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "var(--ochre)",
            transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>

      {/* ── Step counter — fixed top-right, below navbar + progress bar ──
          Uses safe right padding so it never bleeds off-screen on mobile. */}
      <div
        style={{
          position: "fixed",
          top: "88px",
          right: "1.5rem",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "6px",
          paddingTop: "0.75rem",
        }}
      >
        <span
          className="font-heading text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "var(--sage)" }}
        >
          {step + 1} / {questions.length}
        </span>
        <StepDots total={questions.length} current={step} />
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-1 items-center justify-center">
        <div
          className="juno-container w-full"
          style={{
            maxWidth: "680px",
            paddingTop: "6rem",
            paddingBottom: "5rem",
          }}
        >
          <div style={slideStyle}>
            {/* Label */}
            <span
              className="font-heading text-[9px] tracking-[0.4em] uppercase block mb-5"
              style={{ color: "var(--sage)" }}
            >
              The Invitation · Question {step + 1}
            </span>

            {/* Question */}
            <h2
              className="font-serif italic leading-[1.06]"
              style={{
                fontSize: "clamp(1.6rem, 4.5vw, 3.2rem)",
                color: "var(--navy)",
                marginBottom: "2.5rem",
              }}
            >
              {question.label}
            </h2>

            {/* ── Text input ── */}
            {question.type === "text" && (
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={answers[question.key] || ""}
                  onChange={(e) => handleAnswer(question.key, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && next()}
                  placeholder={question.placeholder}
                  autoFocus
                  className="font-heading w-full bg-transparent outline-none"
                  style={{
                    fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
                    fontWeight: 300,
                    color: "var(--charcoal)",
                    borderBottom: "1.5px solid rgba(42,77,106,0.25)",
                    paddingBottom: "14px",
                    caretColor: "var(--ochre)",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderBottomColor =
                      "var(--ochre)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderBottomColor =
                      "rgba(42,77,106,0.25)")
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "1.5px",
                    width: answers[question.key] ? "100%" : "0%",
                    backgroundColor: "var(--ochre)",
                    opacity: 0.4,
                    transition: "width 0.5s ease",
                    pointerEvents: "none",
                  }}
                />
              </div>
            )}

            {/* ── Textarea ── */}
            {question.type === "textarea" && (
              <textarea
                value={answers[question.key] || ""}
                onChange={(e) => handleAnswer(question.key, e.target.value)}
                placeholder={question.placeholder}
                autoFocus
                rows={0}
                className="font-heading w-full bg-transparent outline-none resize-none"
                style={{
                  fontSize: "1rem",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  border: "none",
                  borderBottom: "1.5px solid rgba(42,77,106,0.25)",
                  paddingTop: "2px",
                  paddingBottom: "12px",
                  lineHeight: 1.8,
                  caretColor: "var(--ochre)",
                  display: "block",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) =>
                  ((
                    e.target as HTMLTextAreaElement
                  ).style.borderBottomColor = "var(--ochre)")
                }
                onBlur={(e) =>
                  ((
                    e.target as HTMLTextAreaElement
                  ).style.borderBottomColor = "rgba(42,77,106,0.25)")
                }
              />
            )}

            {/* ── Single choice ── */}
            {question.type === "choice" && (
              <div className="flex flex-col gap-3">
                {question.options!.map((opt) => {
                  const selected = answers[question.key] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(question.key, opt)}
                      className="font-heading text-left w-full"
                      style={{
                        padding: "1rem 1.25rem",
                        border: `1px solid ${
                          selected ? "var(--ochre)" : "rgba(42,77,106,0.16)"
                        }`,
                        borderRadius: "var(--card-radius)",
                        background: selected
                          ? "rgba(201,139,45,0.07)"
                          : "transparent",
                        color: selected
                          ? "var(--navy)"
                          : "rgba(61,61,61,0.8)",
                        fontSize: "0.9rem",
                        fontWeight: selected ? 500 : 300,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: `1.5px solid ${
                            selected ? "var(--ochre)" : "rgba(42,77,106,0.25)"
                          }`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "border-color 0.25s ease",
                        }}
                      >
                        {selected && (
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "var(--ochre)",
                              display: "block",
                            }}
                          />
                        )}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Multi-choice ── */}
            {question.type === "multi-choice" && (
              <div className="flex flex-col gap-3">
                <p
                  className="font-heading text-[10px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: "var(--sage)" }}
                >
                  Select all that apply
                </p>
                {question.options!.map((opt) => {
                  const selected = isMultiSelected(answers[question.key], opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => handleMulti(question.key, opt)}
                      className="font-heading text-left w-full"
                      style={{
                        padding: "1rem 1.25rem",
                        border: `1px solid ${
                          selected ? "var(--ochre)" : "rgba(42,77,106,0.16)"
                        }`,
                        borderRadius: "var(--card-radius)",
                        background: selected
                          ? "rgba(201,139,45,0.07)"
                          : "transparent",
                        color: selected
                          ? "var(--navy)"
                          : "rgba(61,61,61,0.8)",
                        fontSize: "0.9rem",
                        fontWeight: selected ? 500 : 300,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "4px",
                          border: `1.5px solid ${
                            selected ? "var(--ochre)" : "rgba(42,77,106,0.25)"
                          }`,
                          background: selected ? "var(--ochre)" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.2s ease",
                        }}
                      >
                        {selected && (
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="var(--cream)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Navigation ──
              On mobile: stack Back above Continue so the Continue button
              is never clipped by the right edge or viewport overflow.    */}
          <div style={slideStyle}>
            <div
              style={{
                marginTop: "3.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(42,77,106,0.08)",
              }}
            >
              {/* Mobile: stacked layout */}
              <div className="flex flex-col gap-3 sm:hidden">
                <button
                  onClick={next}
                  disabled={!canProceed}
                  className="font-heading text-[11px] tracking-[0.22em] uppercase w-full py-4 transition-all duration-300"
                  style={{
                    backgroundColor: canProceed
                      ? "var(--navy)"
                      : "rgba(42,77,106,0.15)",
                    color: canProceed
                      ? "var(--cream)"
                      : "rgba(42,77,106,0.35)",
                    cursor: canProceed ? "pointer" : "not-allowed",
                    border: "none",
                  }}
                >
                  {isLast ? "Submit Application →" : "Continue →"}
                </button>
                <button
                  onClick={back}
                  className="font-heading text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 py-3 transition-opacity duration-300 hover:opacity-50"
                  style={{
                    background: "none",
                    border: "1px solid rgba(42,77,106,0.15)",
                    color: "rgba(61,61,61,0.5)",
                    cursor: "pointer",
                  }}
                >
                  ← {step === 0 ? "Home" : "Back"}
                </button>
              </div>

              {/* Desktop: side-by-side layout */}
              <div className="hidden sm:flex items-center justify-between">
                <button
                  onClick={back}
                  className="font-heading text-[11px] tracking-[0.2em] uppercase flex items-center gap-2 transition-opacity duration-300 hover:opacity-50"
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(61,61,61,0.5)",
                    cursor: "pointer",
                  }}
                >
                  ← {step === 0 ? "Home" : "Back"}
                </button>

                <button
                  onClick={next}
                  disabled={!canProceed}
                  className="font-heading text-[11px] tracking-[0.22em] uppercase px-10 py-4 transition-all duration-300"
                  style={{
                    backgroundColor: canProceed
                      ? "var(--navy)"
                      : "rgba(42,77,106,0.15)",
                    color: canProceed
                      ? "var(--cream)"
                      : "rgba(42,77,106,0.35)",
                    cursor: canProceed ? "pointer" : "not-allowed",
                    border: "none",
                  }}
                >
                  {isLast ? "Submit Application →" : "Continue →"}
                </button>
              </div>
            </div>
          </div>

          {/* Enter hint */}
          {question.type === "text" && (
            <p
              className="font-heading text-[10px] tracking-[0.15em] uppercase mt-4 text-right"
              style={{ color: "rgba(61,61,61,0.3)" }}
            >
              Press Enter to continue
            </p>
          )}
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="fixed bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "3px",
          background:
            "linear-gradient(to right, transparent, var(--ochre), transparent)",
          opacity: 0.25,
        }}
      />
    </div>
  );
}