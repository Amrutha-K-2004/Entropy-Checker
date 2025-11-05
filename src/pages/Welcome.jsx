import React from 'react'

export default function Welcome({ onStart }) {
  return (
    <section className="welcome-card">
      <style>{`
        /* -- DEMO STYLING FOR BODY -- */
        body {
          background-color: #18181b; /* Dark zinc background */
          background-image: radial-gradient(circle at 10% 10%, #27272a 0%, transparent 40%),
                            radial-gradient(circle at 80% 90%, #3f3f46 0%, transparent 40%);
          padding: 40px;
          min-height: 100vh;
          display: grid;
          place-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        /* -- END DEMO STYLING -- */


        .welcome-card {
          /* --- NEW THEME: Green/Lime --- */
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(132, 204, 22, 0.1) 100%);
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.2);
          backdrop-filter: blur(12px);
          max-width: 1000px;
          margin: 0 auto;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .welcome-card:hover {
          transform: scale(1.02) perspective(1500px) rotateX(1deg) rotateY(-1deg);
          /* --- NEW THEME: Green Glow --- */
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25), 
                      0 0 40px rgba(16, 185, 129, 0.3);
        }

        .welcome-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .welcome-content h1 {
          font-size: 48px;
          font-weight: 800;
          /* --- NEW THEME: Green/Lime Gradient --- */
          background: linear-gradient(135deg, #10b981 0%, #84cc16 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .lead {
          font-size: 18px;
          color: #a1a1aa; /* Updated for dark bg */
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 500px;
        }

        .features {
          list-style: none;
          padding: 0;
          margin: 0 0 40px 0;
        }

        .features li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          font-size: 16px;
          color: #d4d4d8; /* Updated for dark bg */
          transition: all 0.2s ease;
        }

        .features li:hover {
          color: #34d399; /* --- NEW THEME: Lighter green hover --- */
          transform: translateX(5px);
        }

        .features li::before {
          content: '✓';
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          /* --- NEW THEME: Green/Lime Gradient --- */
          background: linear-gradient(135deg, #10b981 0%, #84cc16 100%);
          color: white;
          border-radius: 50%;
          font-weight: bold;
          font-size: 14px;
          flex-shrink: 0;
        }

        .cta-row {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .primary {
          padding: 16px 32px;
          /* --- NEW THEME: Green/Lime Gradient --- */
          background: linear-gradient(135deg, #10b981 0%, #84cc16 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          /* --- NEW THEME: Green Shadow --- */
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
          position: relative;
          overflow: hidden;
        }

        .primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .primary:hover {
          transform: translateY(-2px);
          /* --- NEW THEME: Green Shadow --- */
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
        }

        .primary:hover::before {
          left: 100%;
        }

        .primary:active {
          transform: translateY(0);
        }

        .primary:focus-visible {
          /* --- NEW THEME: Lime Outline --- */
          outline: 3px solid #84cc16;
          outline-offset: 4px;
          transform: translateY(-2px);
          /* --- NEW THEME: Green Shadow --- */
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
        }

        .hero {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .hero-graphic {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }

        .hero-graphic::before {
          content: '';
          position: absolute;
          inset: -20px;
          /* --- NEW THEME: Green Pulse --- */
          background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 4s ease-in-out infinite; 
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); } 
        }

        .hero-graphic svg {
          /* --- NEW THEME: Green Drop Shadow --- */
          filter: drop-shadow(0 10px 30px rgba(16, 185, 129, 0.3));
          position: relative;
          z-index: 1;
        }

        .lock-body {
          animation: lockShake 3s ease-in-out infinite; 
        }

        @keyframes lockShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }

        .sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .welcome-card {
            padding: 32px 24px;
          }

          .welcome-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .welcome-content h1 {
            font-size: 36px;
          }

          .lead {
            font-size: 16px;
          }

          .hero {
            order: -1;
          }

          .hero-graphic svg {
            width: 180px;
            height: 180px;
          }
        }
      `}</style>

      <div className="welcome-grid">
        <div className="welcome-content">
          <h1>Welcome !!!</h1>
          <p className="lead">
            Let's start — check the strength of your password using entropy-based metrics.
          </p>
          <ul className="features">
            <li>Fast entropy estimate</li>
            <li>Interactive strength meter</li>
            <li>Clean, componentized UI</li>
          </ul>
          <div className="cta-row">
            <button className="primary" onClick={onStart}>
              Get Started →
            </button>
          </div>
        </div>
        
        <div className="hero">
          <div className="hero-graphic">
            <svg width="240" height="240" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* --- NEW THEME: Green/Lime Gradients --- */}
                <linearGradient id="welcome-grad-hero" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#10b981" />
                  <stop offset="0.5" stopColor="#34d399" />
                  <stop offset="1" stopColor="#84cc16" />
                </linearGradient>
                <linearGradient id="welcome-grad-shield" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="1" stopColor="#84cc16" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              <circle cx="80" cy="80" r="70" fill="url(#welcome-grad-shield)" />
              
              <path 
                d="M 80 20 L 40 35 L 40 75 Q 40 110 80 130 Q 120 110 120 75 L 120 35 Z" 
                fill="url(#welcome-grad-hero)" 
                opacity="0.15"
              />
              
              <g className="lock-body">
                <rect x="62" y="75" width="36" height="40" rx="6" fill="url(#welcome-grad-hero)" />
                <circle cx="80" cy="90" r="4" fill="#fff" opacity="0.9" />
                <rect x="78" y="90" width="4" height="12" rx="2" fill="#fff" opacity="0.9" />
              </g>
              
              <path 
                d="M 65 75 L 65 60 Q 65 45 80 45 Q 95 45 95 60 L 95 75" 
                stroke="url(#welcome-grad-hero)" 
                strokeWidth="6" 
                fill="none" 
                strokeLinecap="round"
              />
              
              {/* --- NEW THEME: Green/Lime Sparkles --- */}
              <circle cx="50" cy="50" r="2" fill="#10b981" className="sparkle" style={{animationDelay: '0s'}} />
              <circle cx="110" cy="55" r="2" fill="#84cc16" className="sparkle" style={{animationDelay: '0.7s'}} />
              <circle cx="45" cy="100" r="2" fill="#34d399" className="sparkle" style={{animationDelay: '1.4s'}} />
              <circle cx="115" cy="95" r="2" fill="#10b981" className="sparkle" style={{animationDelay: '0.5s'}} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}