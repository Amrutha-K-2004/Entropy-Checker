// import React, { useState, useEffect } from 'react'

// // SVG Icons for the theme-toggler
// const IconSun = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="5"></circle>
//     <line x1="12" y1="1" x2="12" y2="3"></line>
//     <line x1="12" y1="21" x2="12" y2="23"></line>
//     <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
//     <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
//     <line x1="1" y1="12" x2="3" y2="12"></line>
//     <line x1="21" y1="12" x2="23" y2="12"></line>
//     <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
//     <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
//   </svg>
// );

// const IconMoon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
//   </svg>
// );


// export default function Header({ onNavigate, current }) {
//   const [isColorful, setIsColorful] = useState(false)

//   useEffect(() => {
//     if (isColorful) {
//       document.documentElement.setAttribute('data-theme', 'colorful')
//     } else {
//       document.documentElement.removeAttribute('data-theme')
//     }
//   }, [isColorful])

//   function toggleTheme() {
//     setIsColorful(prev => !prev)
//   }

//   return (
//     <>
//       <style>{`
//         /* Root variable for theme transition */
//         :root {
//           --theme-primary-start: #10b981;
//           --theme-primary-end: #84cc16;
//           --theme-text-active: #84cc16;
//           --theme-bg-gradient-start: rgba(16, 185, 129, 0.08);
//           --theme-bg-gradient-end: rgba(132, 204, 22, 0.08);
//         }

//         [data-theme="colorful"] {
//           --theme-primary-start: #7c3aed;
//           --theme-primary-end: #06b6d4;
//           --theme-text-active: #7c3aed;
//           --theme-bg-gradient-start: rgba(124, 58, 237, 0.08);
//           --theme-bg-gradient-end: rgba(6, 182, 212, 0.08);
//         }

//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 20px 40px;
//           /* --- NEW: Gradient Background with Glassmorphism --- */
//           background: linear-gradient(90deg, var(--theme-bg-gradient-start), var(--theme-bg-gradient-end));
//           backdrop-filter: blur(10px); /* Frosted glass effect */
//           -webkit-backdrop-filter: blur(10px);
//           border-bottom: 1px solid rgba(63, 63, 70, 0.5); /* Softer border */
//           width: 100%;
//           box-sizing: border-box;
//           position: sticky; /* NEW: Makes header stick at top */
//           top: 0;
//           z-index: 1000;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.1); /* Subtle shadow for depth */
//         }

//         .brand-wrap {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .logo {
//           flex-shrink: 0;
//           position: relative;
//           transition: transform 0.3s ease, filter 0.3s ease;
//         }

//         .logo:hover {
//           transform: scale(1.05); /* Slight pop-out effect */
//           filter: drop-shadow(0 0 8px var(--theme-text-active)); /* Glow on hover */
//         }
        
//         /* Logo SVG fill from CSS variables */
//         .logo rect {
//           fill: url(#header-logo-gradient);
//           transition: fill 0.3s ease;
//         }
        
//         .brand {
//           font-size: 24px; /* Slightly larger */
//           font-weight: 800; /* Bolder */
//           /* --- NEW: Gradient Text --- */
//           background: linear-gradient(135deg, var(--theme-primary-start) 0%, var(--theme-primary-end) 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           letter-spacing: -0.03em; /* Tighter for a modern look */
//           transition: all 0.3s ease;
//         }

//         .subtitle {
//           font-size: 14px;
//           color: #a1a1aa;
//           margin-top: 2px; /* Slight adjustment */
//           letter-spacing: 0.01em;
//         }

//         .header nav {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .nav-btn {
//           background: none;
//           border: none;
//           padding: 8px 12px;
//           font-size: 16px;
//           font-weight: 500;
//           color: #a1a1aa;
//           cursor: pointer;
//           position: relative; /* For the glowing underline */
//           transition: all 0.3s ease;
//           overflow: hidden; /* For underline effect */
//         }
        
//         .nav-btn::after {
//           content: '';
//           position: absolute;
//           left: 50%;
//           bottom: 0;
//           width: 0;
//           height: 2px;
//           background: linear-gradient(90deg, var(--theme-primary-start), var(--theme-primary-end));
//           transition: all 0.3s ease;
//           transform: translateX(-50%);
//         }

//         .nav-btn:hover {
//           color: #f4f4f5;
//           transform: translateY(-2px); /* Slight lift */
//         }
        
//         .nav-btn:hover::after {
//           width: 100%; /* Expand underline on hover */
//           box-shadow: 0 0 8px var(--theme-text-active); /* Glow */
//         }

//         .nav-btn.active {
//           color: var(--theme-text-active);
//           font-weight: 600;
//           transform: translateY(-1px);
//         }
        
//         .nav-btn.active::after {
//           width: 100%; /* Active always has underline */
//           box-shadow: 0 0 8px var(--theme-text-active);
//         }

//         .nav-btn:focus-visible {
//           outline: 2px solid var(--theme-text-active);
//           outline-offset: 4px;
//           border-radius: 6px;
//         }

//         .theme-btn {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           background: #27272a;
//           border: 1px solid #3f3f46;
//           color: #a1a1aa;
//           cursor: pointer;
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           transition: all 0.3s ease;
//         }
        
//         .theme-btn:hover {
//           color: #f4f4f5;
//           border-color: var(--theme-primary-start); /* Dynamic border color */
//           background: linear-gradient(135deg, var(--theme-primary-start) 0%, var(--theme-primary-end) 100%);
//           box-shadow: 0 0 10px rgba(var(--theme-primary-start), 0.5);
//           transform: rotate(10deg); /* Playful rotation */
//         }
        
//         .theme-btn svg {
//           transition: color 0.3s ease;
//         }
        
//         .theme-btn:hover svg {
//           color: white; /* Icon becomes white on hover */
//         }
        
//         .theme-btn:focus-visible {
//           outline: 3px solid var(--theme-text-active);
//           outline-offset: 2px;
//         }
        
//         /* Responsive styles */
//         @media (max-width: 640px) {
//           .header {
//             flex-direction: column;
//             gap: 20px;
//             padding: 20px;
//           }
          
//           .subtitle {
//             display: none;
//           }
          
//           .brand {
//             font-size: 20px; /* Adjust for smaller screens */
//           }
          
//           .header nav {
//             width: 100%;
//             justify-content: center;
//             gap: 8px;
//           }
          
//           .nav-btn {
//             font-size: 14px;
//             padding: 6px 10px;
//           }
//         }
//       `}</style>

//       <header className="header">
//         <div className="brand-wrap">
//           <div className="logo" aria-hidden="true"> {/* Added aria-hidden */}
//             <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 {/* Dynamically assign gradient from CSS variables */}
//                 <linearGradient id="header-logo-gradient" x1="0" x2="1" y1="0" y2="1">
//                   <stop offset="0" stopColor="var(--theme-primary-start)" />
//                   <stop offset="1" stopColor="var(--theme-primary-end)" />
//                 </linearGradient>
//               </defs>
//               {/* Refined SVG path for a slightly sharper look */}
//               <rect x="1.5" y="1.5" width="21" height="21" rx="6" />
//               <path d="M7 12h10M7 8h10M7 16h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> {/* Increased stroke width */}
//             </svg>
//           </div>
//           <div>
//             <div className="brand">Entropy Checker</div>
//             <div className="subtitle">Password strength, visualized</div>
//           </div>
//         </div>

//         <nav>
//           <button className={current === 'welcome' ? 'nav-btn active' : 'nav-btn'} onClick={() => onNavigate('welcome') }>Welcome</button>
//           <button className={current === 'checker' ? 'nav-btn active' : 'nav-btn'} onClick={() => onNavigate('checker')}>Checker</button>
//           <button 
//             className="theme-btn" 
//             onClick={toggleTheme} 
//             title={isColorful ? "Switch to default theme" : "Switch to colorful theme"} 
//             aria-pressed={isColorful}
//             aria-label={isColorful ? "Switch to default theme" : "Switch to colorful theme"}
//           >
//             {isColorful ? <IconMoon /> : <IconSun />}
//           </button>
//         </nav>
//       </header>
//     </>
//   )
// }

// NEW
import React, { useState, useEffect } from 'react'

// SVG Icons for the theme-toggler
const IconSun = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const IconMoon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);


export default function Header({ onNavigate, current }) {
  const [isColorful, setIsColorful] = useState(false)

  useEffect(() => {
    if (isColorful) {
      document.documentElement.setAttribute('data-theme', 'colorful')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [isColorful])

  function toggleTheme() {
    setIsColorful(prev => !prev)
  }

  return (
    <>
      <style>{`
        /* Root variable for theme transition */
        :root {
          --theme-primary-start: #10b981;
          --theme-primary-end: #84cc16;
          --theme-text-active: #84cc16;
          --theme-bg-gradient-start: rgba(16, 185, 129, 0.08);
          --theme-bg-gradient-end: rgba(132, 204, 22, 0.08);
        }

        [data-theme="colorful"] {
          --theme-primary-start: #7c3aed;
          --theme-primary-end: #06b6d4;
          --theme-text-active: #7c3aed;
          --theme-bg-gradient-start: rgba(124, 58, 237, 0.08);
          --theme-bg-gradient-end: rgba(6, 182, 212, 0.08);
        }
        
        /* --- NEW: Entrance Animations --- */
        @keyframes slideInDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          background: linear-gradient(90deg, var(--theme-bg-gradient-start), var(--theme-bg-gradient-end));
          backdrop-filter: blur(12px); /* Slightly stronger blur */
          -webkit-backdrop-filter: blur(12px);
          /* --- POLISHED: Use theme color for border --- */
          border-bottom: 1px solid rgba(var(--theme-text-active), 0.2);
          width: 100%;
          box-sizing: border-box;
          position: sticky;
          top: 0;
          z-index: 1000;
          /* --- POLISHED: Layered shadow for more depth --- */
          box-shadow: 0 4px 12px rgba(0,0,0,0.08), 
                      0 1px 4px rgba(0,0,0,0.05), 
                      0 0 40px rgba(var(--theme-text-active), 0.1);
          animation: slideInDown 0.5s ease-out; /* Header slides in */
        }

        .brand-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logo {
          flex-shrink: 0;
          position: relative;
          /* --- POLISHED: Bouncy transition --- */
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      filter 0.3s ease-out;
          animation: fadeInUp 0.5s ease-out 0.3s both; /* Staggered entrance */
        }

        .logo:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 0 8px var(--theme-text-active));
        }
        
        .logo rect {
          fill: url(#header-logo-gradient);
          transition: fill 0.3s ease;
        }
        
        .brand-text-wrapper {
            animation: fadeInUp 0.5s ease-out 0.4s both; /* Staggered entrance */
        }
        
        .brand {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--theme-primary-start) 0%, var(--theme-primary-end) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.03em;
          /* --- POLISHED: Add gradient animation on hover --- */
          background-size: 200% auto;
          transition: background-position 0.4s ease-out;
        }
        
        .brand:hover {
            background-position: right center; /* Move gradient */
        }

        .subtitle {
          font-size: 14px;
          color: #a1a1aa;
          margin-top: 2px;
          letter-spacing: 0.01em;
        }

        .header nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-btn {
          background: none;
          border: none;
          padding: 8px 12px;
          font-size: 16px;
          font-weight: 500;
          color: #a1a1aa;
          cursor: pointer;
          position: relative;
          /* --- POLISHED: Bouncy transition, split properties --- */
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      color 0.2s ease-out;
          overflow: hidden;
          opacity: 0; /* Set for animation */
        }
        
        /* --- NEW: Staggered entrance for nav --- */
        .nav-btn:nth-of-type(1) {
            animation: fadeInUp 0.5s ease-out 0.5s both;
        }
        .nav-btn:nth-of-type(2) {
            animation: fadeInUp 0.5s ease-out 0.6s both;
        }
        
        .nav-btn::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--theme-primary-start), var(--theme-primary-end));
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy underline */
          transform: translateX(-50%);
        }

        .nav-btn:hover {
          color: #f4f4f5;
          transform: translateY(-2px) scale(1.05); /* Added scale */
        }
        
        .nav-btn:hover::after {
          width: 100%;
          box-shadow: 0 0 8px var(--theme-text-active);
        }

        .nav-btn.active {
          color: var(--theme-text-active);
          font-weight: 600;
          transform: translateY(-1px) scale(1.02); /* Subtle active scale */
        }
        
        .nav-btn.active::after {
          width: 100%;
          box-shadow: 0 0 8px var(--theme-text-active);
        }

        .nav-btn:focus-visible {
          outline: 2px solid var(--theme-text-active);
          outline-offset: 4px;
          border-radius: 6px;
        }

        .theme-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #27272a;
          border: 1px solid #3f3f46;
          color: #a1a1aa;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          /* --- POLISHED: Bouncy transition, split properties --- */
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      color 0.2s ease-out,
                      background 0.2s ease-out,
                      border-color 0.2s ease-out,
                      box-shadow 0.2s ease-out;
          animation: fadeInUp 0.5s ease-out 0.7s both; /* Staggered entrance */
        }
        
        .theme-btn:hover {
          color: #f4f4f5;
          border-color: var(--theme-primary-start);
          background: linear-gradient(135deg, var(--theme-primary-start) 0%, var(--theme-primary-end) 100%);
          box-shadow: 0 0 10px rgba(var(--theme-text-active), 0.5);
          transform: rotate(10deg) scale(1.1); /* Added scale */
        }
        
        .theme-btn svg {
          transition: color 0.3s ease;
        }
        
        .theme-btn:hover svg {
          color: white;
        }
        
        .theme-btn:focus-visible {
          outline: 3px solid var(--theme-text-active);
          outline-offset: 2px;
        }
        
        /* --- NEW: Wrapper for theme icon animation --- */
        .theme-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Bouncy rotate */
        }
        
        /* Responsive styles */
        @media (max-width: 640px) {
          .header {
            flex-direction: column;
            gap: 20px;
            padding: 20px;
          }
          
          .subtitle {
            display: none;
          }
          
          .brand {
            font-size: 20px;
          }
          
          .header nav {
            width: 100%;
            justify-content: center;
            gap: 8px;
          }
          
          .nav-btn {
            font-size: 14px;
            padding: 6px 10px;
          }
        }
      `}</style>

      <header className="header">
        <div className="brand-wrap">
          <div className="logo" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="header-logo-gradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--theme-primary-start)" />
                  <stop offset="1" stopColor="var(--theme-primary-end)" />
                </linearGradient>
              </defs>
              <rect x="1.5" y="1.5" width="21" height="21" rx="6" />
              <path d="M7 12h10M7 8h10M7 16h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
Next, I can help you create the main "Checker" component to show the password strength, or a "Footer" component.
            </svg>
          </div>
          <div className="brand-text-wrapper">
            <div className="brand">Entropy Checker</div>
            <div className="subtitle">Password strength, visualized</div>
          </div>
        </div>

        <nav>

          <button className={current === 'welcome' ? 'nav-btn active' : 'nav-btn'} onClick={() => onNavigate('welcome') }  style={{ color: 'limegreen' }} >Home</button>
          <button className={current === 'checker' ? 'nav-btn active' : 'nav-btn'} onClick={() => onNavigate('checker')}  style={{ color: 'limegreen' }}>Start</button>
          <button 
            className="theme-btn" 
            onClick={toggleTheme} 
            title={isColorful ? "Switch to default theme" : "Switch to colorful theme"} 
            aria-pressed={isColorful}
            aria-label={isColorful ? "Switch to default theme" : "Switch to colorful theme"}
          >
            {/* --- NEW: Animated icon wrapper --- */}
            <span 
              className="theme-icon-wrapper" 
              style={{ transform: isColorful ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              {isColorful ? <IconMoon /> : <IconSun />}
            </span>
          </button>
        </nav>
      </header>
    </>
  )
}