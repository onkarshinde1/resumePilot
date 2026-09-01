import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import '../style/landing.scss';
import { useAuth } from '../../auth/hooks/useAuth';

const Landing = () => {
  const { user } = useAuth();
  const primaryCtaLink = user ? '/dashboard' : '/register';

  return (
    <div className="landing-wrapper">
      {/* ── Top Navbar ── */}
      <LandingNavbar />

      {/* ── Hero Section ── */}
      <section className="hero-section">
        <div className="hero-badge">
          <span>🚀</span> AI-Powered Interview Preparation & Resume Copilot
        </div>

        <h1 className="hero-title">
          Crush Your Next Interview with <br />
          <span className="accent-text">Precision AI</span> Strategy
        </h1>

        <p className="hero-subtitle">
          Upload your resume and paste any target job description. ResumePilot instantly calculates your match score, pinpoints critical skill gaps, creates curated technical & behavioral interview questions, and gives you a structured day-by-day roadmap to get hired.
        </p>

        <div className="hero-cta-group">
          <Link to={primaryCtaLink} className="btn-hero btn-hero--primary">
            {user ? 'Go to Dashboard' : 'Start Free Preparation'} <span>→</span>
          </Link>
          <a href="#how-it-works" className="btn-hero btn-hero--outline">
            See How It Works
          </a>
        </div>

        {/* ── Interactive Preview Mockup ── */}
        <div id="preview" className="preview-showcase">
          <div className="preview-showcase__header">
            <div className="window-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="window-title">Senior Full Stack Engineer Strategy Report</div>
            <div className="window-badge">AI Analysis Complete</div>
          </div>

          <div className="preview-showcase__grid">
            {/* Left Score Card */}
            <div className="score-card">
              <div className="circle-wrap">
                <span className="num">88%</span>
                <span className="lbl">Match Score</span>
              </div>
              <div className="score-details">
                <h4>Strong Candidate Match</h4>
                <p>High alignment with core architecture & API design requirements.</p>
              </div>
              <div className="skill-pills">
                <span className="pill">React / TypeScript</span>
                <span className="pill">Node.js / Express</span>
                <span className="pill pill--warn">Microservices</span>
                <span className="pill pill--gap">Kafka / Redis</span>
              </div>
            </div>

            {/* Right Question Preview */}
            <div className="questions-preview">
              <div className="q-preview-item">
                <div className="q-preview-top">
                  <span className="tag tag--tech">Technical</span>
                  <span className="q-title">Explain database indexing strategy for high-throughput queries</span>
                </div>
                <div className="q-preview-body">
                  <strong>🎯 Intention:</strong> Assess real-world database optimization & indexing tradeoffs in PostgreSQL/MongoDB.
                </div>
              </div>

              <div className="q-preview-item">
                <div className="q-preview-top">
                  <span className="tag tag--behavior">Behavioral</span>
                  <span className="q-title">Describe a time you resolved a major production incident under pressure</span>
                </div>
                <div className="q-preview-body">
                  <strong>✅ Ideal Response:</strong> Structure using the STAR method: triage, isolation, blameless post-mortem, and automated safeguards.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section id="how-it-works" className="workflow-section">
        <div className="section-header">
          <div className="section-eyebrow">Seamless 3-Step Workflow</div>
          <h2>From Job Posting to Interview Ready</h2>
          <p>Everything you need to master your interview in minutes, not days.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon-box">📄</div>
            <h3>Provide Resume & Role</h3>
            <p>Upload your current resume PDF and paste the target job description or company role.</p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon-box">⚡</div>
            <h3>Deep AI Analysis</h3>
            <p>Advanced AI models cross-reference your experience against role criteria, identifying strengths and skill gaps.</p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon-box">🎯</div>
            <h3>Execute & Export</h3>
            <p>Study targeted technical/behavioral Q&As, follow a structured preparation roadmap, and download a tailored resume PDF.</p>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="features-section">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-eyebrow" style={{ color: '#e1034d', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Core Capabilities
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
            Built to Give You an Unfair Advantage
          </h2>
        </div>

        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon-wrap">🎯</div>
            <div className="feature-content">
              <h3>Role Match Scoring & Gap Detection</h3>
              <p>Instant metric scoring highlighting missing competencies, required tools, and severity ratings so you focus on what matters.</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrap">💡</div>
            <div className="feature-content">
              <h3>Targeted Interview Q&A with Answers</h3>
              <p>Curated technical and behavioral questions tailored directly to the job description, complete with recruiter intentions and model answers.</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrap">🗺️</div>
            <div className="feature-content">
              <h3>Day-by-Day Preparation Roadmap</h3>
              <p>Actionable study plan breaking down your review tasks across multiple days to ensure complete confidence on interview day.</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrap">📄</div>
            <div className="feature-content">
              <h3>ATS Tailored Resume Export</h3>
              <p>Generate clean, recruiter-friendly PDF resumes tailored specifically to emphasize keywords and strengths matched to the position.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <h2>Ready to Master Your Next Interview?</h2>
        <p>
          Start preparing smarter today with AI-powered questions, customized roadmaps, and tailored resumes.
        </p>
        <Link to={primaryCtaLink} className="btn-hero btn-hero--primary" style={{ padding: '1rem 2.5rem' }}>
          {user ? 'Open Dashboard' : 'Get Started for Free'} <span>→</span>
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="footer-brand">
          Resume<span>Pilot</span>
        </div>
        <p className="footer-tagline">
          AI Career Copilot for Technical & Professional Interview Preparation
        </p>
        <p className="footer-copyright">
          © {new Date().getFullYear()} ResumePilot. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
