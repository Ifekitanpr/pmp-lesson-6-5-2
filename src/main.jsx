import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Volume2,
  VolumeX,
  X,
  ShieldCheck,
  BarChart2,
  Lightbulb,
  CheckCircle2,
  CalendarCheck,
  Search,
  RefreshCw,
  Sparkles,
  Layers,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { useLessonAudio } from "../../shared/useLessonAudio";
import "./styles.css";

const illustrationFiles = import.meta.glob("./assets/illustrations/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});
const img = (n) => illustrationFiles[`./assets/illustrations/${n}.png`];

const tabs = [
  "Resolutions trap",
  "Heartbeat rhythm",
  "Five stages",
  "One-improvement rule",
  "Predictive engines",
  "Exam lens",
];

const stages = [
  {
    title: "1. Set the Stage",
    description:
      "Psychological safety made explicit — the prime directive that everyone did the best they could with what they knew. This is the psychological safety deposit paying its dividend.",
    image: "stage-set-the-stage",
    icon: ShieldCheck,
  },
  {
    title: "2. Gather Data",
    description:
      "What actually happened — metrics before memories: blocked-days, escape counts, cycle times, plus the human reading of how it felt.",
    image: "stage-gather-data",
    icon: BarChart2,
  },
  {
    title: "3. Generate Insight",
    description:
      "Making sense of the data together — what it actually means, not just what it shows.",
    image: "stage-generate-insight",
    icon: Lightbulb,
  },
  {
    title: "4. Decide",
    description:
      "Pick ONE improvement — owned, sized, testable. Not a wish list.",
    image: "stage-decide",
    icon: CheckCircle2,
  },
  {
    title: "5. Close",
    description:
      "Commit it into the next cycle's capacity, visibly. Not just discussed — scheduled.",
    image: "stage-close",
    icon: CalendarCheck,
  },
];

const engines = [
  {
    title: "1. Process Audits & Quality Reviews",
    description:
      "Cousins of the risk audit, these examine whether the project's processes are followed and effective — and their findings are improvement fuel, not policing. An owner-update SLA, trigger quantification, and fallback drafting can all be process improvements delivered by an audit, not just a compliance checklist.",
    image: "engine-process-audits",
    icon: Search,
  },
  {
    title: "2. PDCA — The Universal Engine",
    description:
      "Plan a small change as a hypothesis with a measure. Do it small and reversible. Check the measure against baseline — measured, not felt. Act: adopt and standardize the win (routing it into the organizational process assets pipeline), adjust, or abandon without embarrassment.",
    image: "engine-pdca-wheel",
    icon: RefreshCw,
  },
];

const quizzes = [
  {
    q: "At the end of a retrospective, a team generates a list of nine potential improvements they'd like to make. All nine are written on a whiteboard and photographed, but none are formally assigned an owner, sized, or scheduled into the next sprint's capacity. What is the most likely outcome, according to the one-improvement rule?",
    a: [
      "All nine improvements will likely be implemented gradually over the coming weeks",
      "Most or all of the nine improvements will likely not survive contact with the next sprint, since none were owned, sized, or scheduled",
      "The team should have generated even more improvement ideas to increase the odds that some would stick",
      "Photographing the whiteboard is sufficient to ensure the improvements are tracked and implemented",
    ],
    correct: 1,
    explain:
      "Correct! A list of intentions — however well-documented in a photo — isn't the same as one owned, sized, scheduled improvement. The one-improvement rule exists precisely because volume without ownership rarely survives the first busy Monday.",
    fail:
      "Reconsider — more ideas doesn't improve the odds, and a photograph of a whiteboard isn't tracking; without ownership, sizing, and a scheduled slot, this list is very unlikely to survive past discussion.",
  },
  {
    q: "A project manager runs a small experiment: shortening the daily stand-up format to reduce time spent, with a specific measure (average stand-up duration) tracked against a baseline before the change. After two weeks, the measured duration hasn't meaningfully improved, so the team reverts to the original format without any negative consequences attached to the decision. What does this best illustrate?",
    a: [
      "A failed experiment that reflects poorly on the project manager's judgment",
      "PDCA working correctly — the change was checked against a measured baseline, and abandoning it without embarrassment is a legitimate outcome, not a failure",
      "A violation of the one-improvement rule, since the change wasn't sized correctly",
      "A process audit finding, since the format change was examined for effectiveness",
    ],
    correct: 1,
    explain:
      "Correct! This is exactly what PDCA is supposed to look like — a small, reversible change, measured honestly against baseline, and abandoned without embarrassment when it doesn't pan out. That's a successful use of the cycle, not a failure.",
    fail:
      "Reconsider — abandoning a measured experiment that didn't work is the system functioning correctly, not a reflection of poor judgment; this isn't about improvement sizing (one-improvement rule) or an audit finding — it's a PDCA cycle running as intended.",
  },
];

function App() {
  const [tab, setTab] = useState(0);
  const [sound, setSound] = useState(true);
  const [revealed, setRevealed] = useState({});
  const [openAccordion, setOpenAccordion] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});

  useLessonAudio(sound);

  const toggleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  const handleQuizAnswer = (quizIdx, optionIdx) => {
    setQuizAnswers((prev) => ({ ...prev, [quizIdx]: optionIdx }));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="badge-wrapper">
            <span className="badge">Lesson 6.5.2</span>
            <span className="badge-meta">CertSprints PMP · Module 6</span>
          </div>
          <h1 className="main-title">Help Ensure Continuous Improvement Processes Are Updated</h1>
          <p className="subtitle">
            Establishing the disciplines, rhythms, and engines that turn improvement from a good intention into an inevitable outcome.
          </p>
        </div>
        <div className="audio-toggle">
          <button
            onClick={() => setSound(!sound)}
            className="icon-button"
            title={sound ? "Mute audio feedback" : "Enable audio feedback"}
          >
            {sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="tabs-nav" aria-label="Lesson screens">
        {tabs.map((name, i) => (
          <button
            key={name}
            onClick={() => setTab(i)}
            className={`tab-btn ${tab === i ? "tab-btn-active" : ""}`}
          >
            <span className="tab-number">{i + 1}</span>
            <span className="tab-name">{name}</span>
          </button>
        ))}
      </nav>

      {/* Screen Content */}
      <main className="content-area">
        {/* SCREEN 1: HOOK */}
        {tab === 0 && (
          <div className="screen-card">
            <div className="card-badge">Screen 1 · Hook</div>
            <h2 className="screen-heading">January resolutions fade; small habits stick.</h2>
            <div className="intro-prose">
              <p>
                Every January, people write down a list of ten resolutions. By February, none of them stick. But the person who picks just one resolution — small, specific, and scheduled — is usually still doing it in June.
              </p>
            </div>

            {!revealed.hook ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("hook")}
                  className="primary-btn"
                >
                  <Sparkles size={18} />
                  <span>Reveal the Project Connection</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">The Improvement Machinery</h3>
                    <p>
                      Improvement works the same way in a project. Enabler 6.2's wording is precise: <strong>help ensure improvement processes are updated</strong> — the improvement machinery itself has to get improved, on a rhythm, not left to good intentions.
                    </p>
                    <div className="highlight-pill">
                      <span>Key Takeaway:</span> An unmanaged process degrades; continuous improvement must be built into operational cadences.
                    </div>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("hook-resolutions")}
                      alt="Resolutions list in a wastebasket next to a single scheduled habit on a calendar"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "The Power of a Single Scheduled Habit",
                          image: "hook-resolutions",
                          text: "Ten resolutions without ownership or capacity are quickly discarded. A single, owned, scheduled habit survives because it commands real calendar space.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>
              </div>
            )}

            <div className="screen-footer">
              <div></div>
              <button onClick={() => setTab(1)} className="nav-btn next-btn">
                <span>Next: Heartbeat rhythm</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: THE RETROSPECTIVE */}
        {tab === 1 && (
          <div className="screen-card">
            <div className="card-badge">Screen 2 · Adaptive Cadence</div>
            <h2 className="screen-heading">The Retrospective: Improvement's Heartbeat</h2>
            <div className="intro-prose">
              <p>
                On adaptive tracks, one institution makes improvement inevitable rather than aspirational.
              </p>
            </div>

            {!revealed.retro ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("retro")}
                  className="primary-btn"
                >
                  <Sparkles size={18} />
                  <span>Explore the Retrospective Rhythm</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">Examining the Way of Working</h3>
                    <p>
                      The retrospective is a <strong>recurring, time-boxed, whole-team session</strong> held at each cadence boundary. Its mandate is strictly examining the <em>way of working</em> — not the product, which is the sprint review's job.
                    </p>
                    <p>
                      It acts as the continuous operational heartbeat that keeps improvement from becoming a once-in-a-while good intention that gets postponed when delivery gets busy.
                    </p>
                    <div className="info-card-accent">
                      <strong>Distinct Mandates:</strong>
                      <ul>
                        <li><strong>Sprint Review:</strong> Inspects the product increment with stakeholders.</li>
                        <li><strong>Retrospective:</strong> Inspects team dynamics, processes, tools, and relationships.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("retrospective-heartbeat")}
                      alt="Continuous circular retrospective cadence above sprint boundaries"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "Retrospective: The Operational Heartbeat",
                          image: "retrospective-heartbeat",
                          text: "Held faithfully at every cadence boundary, the retrospective protects dedicated time to fine-tune the team's processes and environment.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>
              </div>
            )}

            <div className="screen-footer">
              <button onClick={() => setTab(0)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(2)} className="nav-btn next-btn">
                <span>Next: Five stages</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: FIVE-STAGE STRUCTURE */}
        {tab === 2 && (
          <div className="screen-card">
            <div className="card-badge">Screen 3 · Retrospective Structure</div>
            <h2 className="screen-heading">The Five-Stage Retrospective Framework</h2>
            <div className="intro-prose">
              <p>
                A retrospective isn't just "let's talk about how it went." A structured five-stage framework keeps the conversation honest, evidence-based, and actionable. Click each stage to explore.
              </p>
            </div>

            <div className="accordion-list">
              {stages.map((stg, index) => {
                const IconComponent = stg.icon;
                const isOpen = openAccordion === index;
                return (
                  <div
                    key={stg.title}
                    className={`accordion-card ${isOpen ? "accordion-open" : ""}`}
                  >
                    <button
                      className="accordion-header"
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : index)
                      }
                    >
                      <div className="accordion-title-group">
                        <span className="accordion-icon-box">
                          <IconComponent size={20} />
                        </span>
                        <span className="accordion-title">{stg.title}</span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`chevron ${isOpen ? "chevron-rotated" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="accordion-body animate-fade-in">
                        <div className="accordion-grid">
                          <div className="accordion-desc">
                            <p>{stg.description}</p>
                          </div>
                          <div className="accordion-img-wrap">
                            <img
                              src={img(stg.image)}
                              alt={stg.title}
                              className="accordion-thumb"
                              onClick={() =>
                                setModalData({
                                  title: stg.title,
                                  image: stg.image,
                                  text: stg.description,
                                })
                              }
                            />
                            <span className="image-caption">Enlarge</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="screen-footer">
              <button onClick={() => setTab(1)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(3)} className="nav-btn next-btn">
                <span>Next: One-improvement rule</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: ONE-IMPROVEMENT RULE & KNOWLEDGE CHECK */}
        {tab === 3 && (
          <div className="screen-card">
            <div className="card-badge">Screen 4 · Discipline & Backlog</div>
            <h2 className="screen-heading">The One-Improvement Rule & Improvement Backlog</h2>
            <div className="intro-prose">
              <p>
                Back to that resolutions list one more time — because this is exactly the discipline that separates a team that retrospects from a team that actually improves.
              </p>
            </div>

            {!revealed.rule ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("rule")}
                  className="primary-btn"
                >
                  <Sparkles size={18} />
                  <span>Reveal the One-Improvement Rule</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">One Owned Item Beats Nine Good Intentions</h3>
                    <p>
                      A list of nine intentions survives contact with Monday for about an hour; <strong>one owned, scheduled item ships</strong>. That's the one-improvement rule.
                    </p>
                    <p>
                      Improvements then queue in an <strong>improvement backlog</strong> — prioritized, statused, and reviewed like any other backlog — because improvement unmanaged is improvement abandoned. The improvement doesn't get to just live in someone's memory of a good meeting; it has to live somewhere trackable.
                    </p>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("one-improvement-backlog")}
                      alt="One owned item flowing into an improvement backlog while vague ideas dissolve"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "The One-Improvement Rule",
                          image: "one-improvement-backlog",
                          text: "Vague wishlists dissipate under delivery pressure. One single improvement item with a named owner and allocated sprint capacity actually reaches completion.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>

                {/* Micro Knowledge Check 1 */}
                <div className="quiz-section">
                  <div className="quiz-header">
                    <HelpCircle className="quiz-badge-icon" size={20} />
                    <span>Micro Knowledge Check</span>
                  </div>
                  <p className="quiz-scenario">{quizzes[0].q}</p>
                  <div className="quiz-options">
                    {quizzes[0].a.map((opt, optIdx) => {
                      const isSelected = quizAnswers[0] === optIdx;
                      const isCorrect = optIdx === quizzes[0].correct;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizAnswer(0, optIdx)}
                          className={`quiz-option ${
                            isSelected
                              ? isCorrect
                                ? "quiz-option-correct"
                                : "quiz-option-wrong"
                              : ""
                          }`}
                        >
                          <span className="option-letter">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="option-text">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                  {quizAnswers[0] !== undefined && (
                    <div
                      className={`quiz-feedback ${
                        quizAnswers[0] === quizzes[0].correct
                          ? "feedback-correct"
                          : "feedback-wrong"
                      } animate-fade-in`}
                    >
                      {quizAnswers[0] === quizzes[0].correct
                        ? quizzes[0].explain
                        : quizzes[0].fail}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="screen-footer">
              <button onClick={() => setTab(2)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(4)} className="nav-btn next-btn">
                <span>Next: Predictive engines</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: PREDICTIVE ENGINES (AUDITS & PDCA) */}
        {tab === 4 && (
          <div className="screen-card">
            <div className="card-badge">Screen 5 · Predictive & Universal Engines</div>
            <h2 className="screen-heading">Process Audits, PDCA & The Meta-Level</h2>
            <div className="intro-prose">
              <p>
                Outside sprint cadences, the same continuous improvement muscle exists in different clothes. Click each engine to explore.
              </p>
            </div>

            <div className="accordion-list">
              {engines.map((eng, index) => {
                const IconComponent = eng.icon;
                const isOpen = openAccordion === `eng-${index}`;
                return (
                  <div
                    key={eng.title}
                    className={`accordion-card ${isOpen ? "accordion-open" : ""}`}
                  >
                    <button
                      className="accordion-header"
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : `eng-${index}`)
                      }
                    >
                      <div className="accordion-title-group">
                        <span className="accordion-icon-box">
                          <IconComponent size={20} />
                        </span>
                        <span className="accordion-title">{eng.title}</span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`chevron ${isOpen ? "chevron-rotated" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="accordion-body animate-fade-in">
                        <div className="accordion-grid">
                          <div className="accordion-desc">
                            <p>{eng.description}</p>
                          </div>
                          <div className="accordion-img-wrap">
                            <img
                              src={img(eng.image)}
                              alt={eng.title}
                              className="accordion-thumb"
                              onClick={() =>
                                setModalData({
                                  title: eng.title,
                                  image: eng.image,
                                  text: eng.description,
                                })
                              }
                            />
                            <span className="image-caption">Enlarge</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* The Meta-Level Reveal */}
            <div className="meta-box">
              <div className="meta-header">
                <TrendingUp size={22} className="meta-icon" />
                <h3>The Meta-Level of Enabler 6.2</h3>
              </div>
              <p>
                Enabler 6.2's wording adds one more layer: <strong>help ensure improvement processes are updated</strong>. It isn't just about running retrospectives and audits — it's making sure the improvement machinery itself gets improved over time, rather than calcifying into its own stale ritual.
              </p>
            </div>

            {/* Micro Knowledge Check 2 */}
            <div className="quiz-section">
              <div className="quiz-header">
                <HelpCircle className="quiz-badge-icon" size={20} />
                <span>Micro Knowledge Check</span>
              </div>
              <p className="quiz-scenario">{quizzes[1].q}</p>
              <div className="quiz-options">
                {quizzes[1].a.map((opt, optIdx) => {
                  const isSelected = quizAnswers[1] === optIdx;
                  const isCorrect = optIdx === quizzes[1].correct;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleQuizAnswer(1, optIdx)}
                      className={`quiz-option ${
                        isSelected
                          ? isCorrect
                            ? "quiz-option-correct"
                            : "quiz-option-wrong"
                          : ""
                      }`}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="option-text">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {quizAnswers[1] !== undefined && (
                <div
                  className={`quiz-feedback ${
                    quizAnswers[1] === quizzes[1].correct
                      ? "feedback-correct"
                      : "feedback-wrong"
                  } animate-fade-in`}
                >
                  {quizAnswers[1] === quizzes[1].correct
                    ? quizzes[1].explain
                    : quizzes[1].fail}
                </div>
              )}
            </div>

            <div className="screen-footer">
              <button onClick={() => setTab(3)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(5)} className="nav-btn next-btn">
                <span>Next: Exam lens</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 6: SYNTHESIS (EXAM LENS) */}
        {tab === 5 && (
          <div className="screen-card">
            <div className="card-badge">Screen 6 · Synthesis & Exam Lens</div>
            <h2 className="screen-heading">Continuous Improvement Machinery</h2>
            <div className="intro-prose">
              <p>
                Back to that resolutions list one final time — because the discipline was never about wanting to improve. It was about building the machinery that makes improvement actually happen.
              </p>
            </div>

            {!revealed.exam ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("exam")}
                  className="primary-btn"
                >
                  <Award size={18} />
                  <span>Reveal Key Exam Takeaways</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">Exam-Relevant Takeaways</h3>
                    <ul className="bullet-list">
                      <li>
                        <strong>Five-stage retrospective structure:</strong> Set the Stage, Gather Data, Generate Insight, Decide (ONE improvement), Close (scheduled into next cycle).
                      </li>
                      <li>
                        <strong>The one-improvement rule:</strong> One owned, sized, scheduled item beats a list of good intentions.
                      </li>
                      <li>
                        <strong>Tracked improvement backlog:</strong> Improvements must be prioritized and monitored — unmanaged improvement is abandoned improvement.
                      </li>
                      <li>
                        <strong>PDCA Universal Cycle:</strong> Plan a small measured hypothesis, do it small and reversible, check against baseline, act by adopting, adjusting, or abandoning without embarrassment.
                      </li>
                      <li>
                        <strong>Enabler 6.2's meta-level:</strong> The improvement processes themselves must be updated over time, not just blindly repeated.
                      </li>
                    </ul>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("exam-continuous-improvement")}
                      alt="Verified improvement feeding into continuous PDCA improvement engine"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "Continuous Improvement Architecture",
                          image: "exam-continuous-improvement",
                          text: "Sustainable project excellence relies on an iterative improvement engine that continuously refines both team practices and the improvement machinery itself.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>

                <div className="completion-card">
                  <Award size={32} className="completion-icon" />
                  <div>
                    <h4>Lesson 6.5.2 Completed</h4>
                    <p>You have mastered the principles and mechanics of updating continuous improvement processes.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="screen-footer">
              <button onClick={() => setTab(4)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <div></div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Lightbox Portal */}
      {modalData &&
        createPortal(
          <div className="modal-backdrop" onClick={() => setModalData(null)}>
            <div
              className="modal-content animate-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{modalData.title}</h3>
                <button
                  className="close-btn"
                  onClick={() => setModalData(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={img(modalData.image)}
                  alt={modalData.title}
                  className="modal-image"
                />
                <p className="modal-caption">{modalData.text}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
