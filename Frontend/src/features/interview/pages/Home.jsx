import React, {useState , useRef, useEffect} from 'react'
import "../style/home.scss"
import useInterview from '../hook/useInterview'
import { useNavigate } from 'react-router'

const Home = () => {
    const {loading, handleGenerateInterviewReport, reports, handleGetAllInterviewReport} = useInterview();
    const [jobDescription,setJobDescription] = useState("")
    const [selfDescription,setSelfDescription] = useState("")
    const resumeFileInputRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        handleGetAllInterviewReport()
    }, [])


    const handleGenerateReport  = async()=>{
        const resumeFile = resumeFileInputRef.current.files[0]
        const data = await handleGenerateInterviewReport({jobDescription, selfDescription, resumeFile })
        
        if(data){
            navigate(`/interview/${data._id}`)
        }   
    }
    if(loading){
        return(
            <main className='loading-screen'>
                <h1>loading screen</h1>
            </main>
        )
    }
    
    return (
        <div className="home-wrapper">

            {/* ── Page Header ── */}
            <header className="home-header">
                <h1>
                    Create Your Custom <span className="highlight">Interview Plan</span>
                </h1>
                <p className="home-subtitle">
                    Let our AI analyze the job requirements and your unique profile to<br />
                    build a winning strategy.
                </p>
            </header>

            {/* ── Single unified container ── */}
            <div className="home-container">

                {/* ── Two-panel body ── */}
                <div className="home-panels">

                    {/* LEFT — Job Description */}
                    <section className="panel panel-left">
                        <div className="panel-header">
                            <div className="panel-title">
                                <span className="panel-icon">🗂️</span>
                                Target Job Description
                            </div>
                            <span className="badge badge-required">REQUIRED</span>
                        </div>

                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="job-textarea"
                            id="jobDescription"
                            name="jobDescription"
                            maxLength={5000}
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                        />

                        <div className="char-counter">0 / 5000 chars</div>
                    </section>

                    {/* vertical divider */}
                    <div className="v-divider" />

                    {/* RIGHT — Your Profile */}
                    <section className="panel panel-right">
                        <div className="panel-header">
                            <div className="panel-title">
                                <span className="panel-icon">👤</span>
                                Your Profile
                            </div>
                        </div>

                        {/* Upload Resume */}
                        <div className="upload-block">
                            <div className="upload-label-row">
                                <span className="field-label">Upload Resume</span>
                                <span className="badge badge-best">BEST RESULTS</span>
                            </div>

                            <label className="drop-zone" htmlFor="resume">
                                <span className="drop-icon">⬆</span>
                                <p className="drop-primary">Click to upload or drag &amp; drop</p>
                                <p className="drop-secondary">PDF or DOCX (Max 5MB)</p>
                                <input
                                    hidden
                                    ref = {resumeFileInputRef}
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf,.docx"
                                />
                            </label>
                        </div>

                        {/* OR divider */}
                        <div className="or-divider">
                            <span className="or-line" />
                            <span className="or-label">OR</span>
                            <span className="or-line" />
                        </div>

                        {/* Self Description */}
                        <div className="self-block">
                            <label className="field-label" htmlFor="selfDescription">
                                Quick Self-Description
                            </label>
                            <textarea
                                onChange={(e)=>setSelfDescription(e.target.value)}
                                
                                className="self-textarea"
                                id="selfDescription"
                                name="selfDescription"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info banner */}
                        <div className="info-banner">
                            <span className="info-dot">ℹ</span>
                            <p>
                                Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to
                                generate a personalized plan.
                            </p>
                        </div>
                    </section>
                </div>

                {/* recent report list  */}
                {reports.length > 0 && (
                    <div className="recent-reports">
                        <h2 className="recent-reports__title">My Recent Interview Plans</h2>
                        <ul className='report-list'>
                            {reports.map((report) => (
                                <li key={report._id} onClick={() => navigate(`/interview/${report._id}`)} className='report-card'>
                                    <h3 className="report-card__title">{report.title}</h3>
                                    <p className="report-card__date">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className="report-card__score">Match Score: {report.matchScore}%</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* ── Footer bar inside container ── */}
                <div className="container-footer">
                    <span className="footer-note">AI-Powered Strategy Generation • Approx 30s</span>
                    <button onClick={handleGenerateReport} className="button primary-button generate-btn">
                        <span className="btn-star">★</span>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* ── Bottom links ── */}
            <nav className="bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>
            </nav>
        </div>
    )
}

export default Home
