import "./loading.css";

export default function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="content-box">
        <h1 className="title">Scholar Link</h1>
        <p className="tagline">
          Empowering students. Unlocking opportunities.
        </p>

        <div className="progress-container">
          <div className="cap">🎓</div>
          <div className="progress-track">
            <div className="progress-bar"></div>
          </div>
        </div>

        <p className="loading-text">
          Analyzing your eligibility and matching scholarships...
        </p>
      </div>
    </div>
  );
}
