import React, { useState, useEffect } from 'react';
import '../style/interview.scss';
import '../../../style/button.scss'
import useInterview from '../hook/useInterview';
import { useParams } from 'react-router-dom';


// ── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'technical',  label: 'Technical questions',  icon: '💡' },
  { id: 'behavioral', label: 'Behavioral questions', icon: '🧠' },
  { id: 'roadmap',    label: 'Road Map',              icon: '🗺️' },
];

// ── Severity badge ────────────────────────────────────────────────────────────
const SeverityBadge = ({ severity }) => (
  <span className={`severity-badge severity-${severity}`}>
    {severity.toUpperCase()}
  </span>
);

// ── Expandable question card ──────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`q-card${open ? ' q-card--open' : ''}`}>
      <button className="q-card__header" onClick={() => setOpen((p) => !p)}>
        <span className="q-card__num">{String(index + 1).padStart(2, '0')}</span>
        <p className="q-card__question">{item.question}</p>
        <span className="q-card__chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="q-card__body">
          <div className="q-card__block q-card__block--intention">
            <span className="q-card__block-label">🎯 Intention</span>
            <p>{item.intention}</p>
          </div>
          <div className="q-card__block q-card__block--answer">
            <span className="q-card__block-label">✅ Ideal Answer</span>
            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Road map day card ─────────────────────────────────────────────────────────
const DayCard = ({ plan }) => (
  <div className="day-card">
    <div className="day-card__header">
      <span className="day-card__num">Day {plan.day}</span>
      <span className="day-card__focus">{plan.focus}</span>
    </div>
    <ul className="day-card__tasks">
      {plan.tasks.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  </div>
);

// ── Main content renderer ─────────────────────────────────────────────────────
const MainContent = ({ activeNav, data }) => {
  if (activeNav === 'technical') {
    return (
      <div className="content-section">
        <h2 className="section-title"><span>💡</span> Technical Questions</h2>
        <p className="section-subtitle">
          {data.technicalQuestions.length} questions tailored to the JD &amp; your profile.
        </p>
        <div className="questions-list">
          {data.technicalQuestions.map((q, i) => (
            <QuestionCard key={i} item={q} index={i} />
          ))}
        </div>
      </div>
    );
  }

  if (activeNav === 'behavioral') {
    return (
      <div className="content-section">
        <h2 className="section-title"><span>🧠</span> Behavioral Questions</h2>
        <p className="section-subtitle">
          {data.behavioralQuestions.length} questions to evaluate soft skills &amp; culture fit.
        </p>
        <div className="questions-list">
          {data.behavioralQuestions.map((q, i) => (
            <QuestionCard key={i} item={q} index={i} />
          ))}
        </div>
      </div>
    );
  }

  if (activeNav === 'roadmap') {
    return (
      <div className="content-section">
        <h2 className="section-title"><span>🗺️</span> Preparation Road Map</h2>
        <p className="section-subtitle">
          {data.preparationPlan.length}-day structured study plan.
        </p>
        <div className="roadmap-list">
          {data.preparationPlan.map((plan) => (
            <DayCard key={plan.day} plan={plan} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// ── Interview Page ────────────────────────────────────────────────────────────
const Interview = () => {
  const [activeNav, setActiveNav] = useState('technical');
  const { interviewID } = useParams();
  const { report: data, loading, handleGetInterviewReportById , getResumePdf} = useInterview();

  useEffect(() => {
    if (interviewID) {
      handleGetInterviewReportById(interviewID);
    }
  }, [interviewID]);

  if (loading) {
    return (
      <div className="interview-loading">
        <div className="spinner"></div>
        <p>Analyzing and loading your interview strategy...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="interview-error">
        <h2>Report Not Found</h2>
        <p>We couldn't retrieve the requested interview report. Please check the URL or try generating a new report.</p>
      </div>
    );
  }

  return (
    <div className="interview-wrapper">

      {/* ── Page Header ── */}
      <header className="interview-page-header">
        <div className="interview-page-header__left">
          <h1>{data.title}</h1>
          <p className="interview-page-header__date">
            Generated on{' '}
            {new Date(data.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </header>

      {/* ── Three-column layout ── */}
      <div className="interview-container">

        {/* LEFT — Nav sidebar */}
        <aside className="iv-sidebar">
        {/* Nav items */}
          <nav className="iv-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`iv-nav__item${activeNav === item.id ? ' iv-nav__item--active' : ''}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="iv-nav__icon">{item.icon}</span>
                <span className="iv-nav__label">{item.label}</span>
                {activeNav === item.id && <span className="iv-nav__indicator" />}
              </button>
            ))}
          </nav>

          <button
            onClick={() => getResumePdf(interviewID)}
            className="button primary-button download-resume-button "
          >
            <svg height={"0.9rem"} style={{marginRight : "0.4rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
            Download Resume 
          </button>
        </aside>

        <div className="iv-divider" />

        {/* CENTER — Main content */}
        <main className="iv-main">
          <MainContent activeNav={activeNav} data={data} />
        </main>

        <div className="iv-divider" />

        {/* RIGHT — Skill gaps */}
        <aside className="iv-sidebar iv-sidebar--right">

          {/* Match score ring — top of sidebar */}
          <div className="match-score">
            <svg className="match-score__ring" viewBox="0 0 36 36">
              <circle className="match-score__track" cx="18" cy="18" r="15.9" />
              <circle
                className="match-score__fill"
                cx="18" cy="18" r="15.9"
                strokeDasharray={`${data.matchScore} ${100 - data.matchScore}`}
                strokeDashoffset="25"
              />
            </svg>
            <div className="match-score__text">
              <span className="match-score__value">{data.matchScore}%</span>
              <span className="match-score__label">Match</span>
            </div>
          </div>

          <div className="skill-gaps">
            <h3 className="skill-gaps__title">Skill Gaps</h3>
            <div className="skill-gaps__list">
              {data.skillGaps.map((gap, i) => (
                <div key={i} className="skill-gap-chip">
                  <span className="skill-gap-chip__name">{gap.skill}</span>
                  <SeverityBadge severity={gap.severity} />
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>

      {/* ── Bottom nav ── */}
      <nav className="bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </nav>
    </div>
  );

};

export default Interview;
