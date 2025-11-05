// import React, { useState } from 'react'
// import jsPDF from 'jspdf'
// import PasswordInput from '../components/PasswordInput'
// import EntropyDisplay from '../components/EntropyDisplay'
// import StrengthBar from '../components/StrengthBar'

// export default function Checker() {
//   const [password, setPassword] = useState('')
//   const [entropyBits, setEntropyBits] = useState(0)
//   const [outputType, setOutputType] = useState('')
//   const [suggested, setSuggested] = useState('')
//   const [dictMatches, setDictMatches] = useState([])
//   const [timeResults, setTimeResults] = useState([])

//   const WORDLIST = [
//     'password', 'pass', 'admin', 'user', 'login', 'qwerty', 'letmein',
//     'welcome', '1234', '12345', '123456', 'test', 'root', 'secret', 'name', 'email'
//   ]

//   // --------- ENTROPY ----------
//   function calculateEntropy(password) {
//     if (!password) return 0
//     const hasLower = /[a-z]/.test(password)
//     const hasUpper = /[A-Z]/.test(password)
//     const hasDigits = /[0-9]/.test(password)
//     const hasSymbols = /[^A-Za-z0-9]/.test(password)

//     let pool = 0
//     if (hasLower) pool += 26
//     if (hasUpper) pool += 26
//     if (hasDigits) pool += 10
//     if (hasSymbols) pool += 32
//     if (pool === 0) return 0
//     const entropy = password.length * Math.log2(pool)
//     return Math.round(entropy * 10) / 10
//   }

//   const liveEntropy = calculateEntropy(password)

//   // --------- BUTTON HANDLERS ----------
//   function handleCheck() {
//     const entropy = calculateEntropy(password)
//     setEntropyBits(entropy)
//     setOutputType('entropy')
//   }

//   function handleSuggest() {
//     const specials = '!@#$%^&*()-_=+[]{};:,.<>?/|~'
//     const count = Math.floor(Math.random() * 2) + 3
//     let add = ''
//     for (let i = 0; i < count; i++) add += specials[Math.floor(Math.random() * specials.length)]
//     const suggestion = password + add
//     setSuggested(suggestion)
//     setOutputType('suggest')
//   }

//   function handleDictionaryCheck() {
//     const pwdLower = password.toLowerCase()
//     const found = WORDLIST.filter(w => pwdLower.includes(w))
//     setDictMatches(found)
//     setOutputType('dict')
//   }

//   // --------- TIME TO CRACK ----------
//   function formatDuration(seconds) {
//     if (!isFinite(seconds) || seconds <= 0) return 'instantly'
//     if (seconds < 1) return `${Math.round(seconds * 1000)} ms`
//     const minute = 60, hour = 60 * minute, day = 24 * hour, year = 365 * day
//     if (seconds < minute) return `${Math.round(seconds)} sec`
//     if (seconds < hour) return `${Math.round(seconds / minute)} min`
//     if (seconds < day) return `${Math.round(seconds / hour)} hr`
//     if (seconds < year) return `${Math.round(seconds / day)} days`
//     const years = seconds / year
//     if (years < 1000) return `${years.toFixed(1)} years`
//     if (years < 1e6) return `${Math.round(years / 1000)}k years`
//     return `> ${Math.round(years / 1e6)}M years`
//   }

//   function expectedAttempts(entropy) {
//     return Math.exp((entropy - 1) * Math.LN2)
//   }

//   function handleTimeToCrack() {
//     const entropy = calculateEntropy(password)
//     setEntropyBits(entropy)
//     const found = WORDLIST.filter(w => password.toLowerCase().includes(w))
//     const expected = expectedAttempts(entropy)

//     const results = [
//       { method: 'Brute-force — single GPU (1e9 guesses/sec)', rps: 1e9 },
//       { method: 'Brute-force — large cluster (1e12 guesses/sec)', rps: 1e12 },
//       { method: 'Online (throttled ~100 guesses/sec)', rps: 100 },
//     ].map(s => ({
//       method: s.method,
//       time: formatDuration(expected / s.rps),
//     }))

//     if (found.length > 0)
//       results.push({ method: 'Dictionary / targeted (found words)', time: 'immediate', note: found.join(', ') })
//     else
//       results.push({ method: 'Dictionary / targeted', time: 'likely slow', note: 'no common words detected' })

//     setTimeResults(results)
//     setDictMatches(found)
//     setOutputType('time')
//   }

//   // --------- REPORT GENERATION ----------
//   function handleGenerateReport() {
//     const doc = new jsPDF({ unit: 'pt', format: 'a4' })
//     let y = 60
//     const lineGap = 22 // increased line spacing

//     // Header
//     doc.setFillColor(240, 240, 240)
//     doc.rect(0, 0, doc.internal.pageSize.getWidth(), 70, 'F')
//     doc.setFont('helvetica', 'bold')
//     doc.setFontSize(20)
//     doc.text('Password Security Report', 40, 45)

//     doc.setFont('helvetica', 'normal')
//     doc.setFontSize(10)
//     doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, 65)

//     const section = (title) => {
//       y += 30
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(14)
//       doc.setTextColor(0, 102, 204)
//       doc.text(title, 40, y)
//       y += 8
//       doc.setDrawColor(0, 102, 204)
//       doc.line(40, y, 550, y)
//       y += 20
//       doc.setFont('helvetica', 'normal')
//       doc.setTextColor(50)
//       doc.setFontSize(11)
//     }

//     // 1️⃣ Basic Info
//     section('1. Basic Information')
//     doc.text(`Password: ${password || '(none entered)'}`, 50, y)
//     y += lineGap
//     doc.text(`Length: ${password.length} characters`, 50, y)
//     y += lineGap
//     doc.text(`Entropy: ${entropyBits} bits`, 50, y)

//     // 2️⃣ Dictionary Check
//     section('2. Dictionary Analysis')
//     if (dictMatches.length > 0) {
//       doc.setFont('helvetica', 'bold')
//       doc.text('Common words detected in password:', 50, y)
//       y += lineGap
//       doc.setFont('helvetica', 'normal')
//       doc.text(dictMatches.join(', '), 65, y)
//       y += lineGap
//       doc.setTextColor(200, 50, 50)
//       doc.text('This makes the password easier to guess.', 50, y)
//       doc.setTextColor(50)
//     } else {
//       doc.text('No common dictionary words found.', 50, y)
//     }

//     // 3️⃣ Time-to-crack
//     section('3. Estimated Time to Crack')
//     y += 10 // extra space before time list
//     if (timeResults.length > 0) {
//       timeResults.forEach((r) => {
//         doc.setFont('helvetica', 'bold')
//         doc.text(`• ${r.method}`, 50, y)
//         y += lineGap
//         doc.setFont('helvetica', 'normal')
//         doc.text(`  Estimated time: ${r.time}`, 65, y)
//         if (r.note) {
//           y += lineGap
//           doc.setTextColor(120)
//           doc.text(`  Note: ${r.note}`, 65, y)
//           doc.setTextColor(50)
//         }
//         y += 10
//       })
//     } else {
//       doc.text('Run the "Time to Crack" check to generate these estimates.', 50, y)
//     }

//     // 4️⃣ Suggested password
//     if (suggested) {
//       section('4. Suggested Password')
//       doc.setFont('helvetica', 'bold')
//       doc.setTextColor(0, 153, 0)
//       doc.text(suggested, 50, y)
//       y += lineGap
//       doc.setFont('helvetica', 'normal')
//       doc.setTextColor(50)
//       doc.text('Use longer passwords with mixed characters for better security.', 50, y)
//     }

//     y += 50
//     doc.setFont('helvetica', 'italic')
//     doc.setFontSize(10)
//     doc.text(
//       'This report is automatically generated. For better protection, use multi-factor authentication.',
//       40,
//       y
//     )

//     const date = new Date().toISOString().slice(0, 10)
//     doc.save(`Password_Report_${date}.pdf`)
//   }

//   // --------- UI ----------
//   return (
//     <section className="checker-card">
//       <h2>Password Entropy Checker</h2>

//       <PasswordInput
//         value={password}
//         onChange={(v) => {
//           setPassword(v)
//           setOutputType('')
//           setDictMatches([])
//           setTimeResults([])
//         }}
//       />
//       <StrengthBar entropy={liveEntropy} />

//       <div
//         style={{
//           marginTop: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: '16px',
//         }}
//       >
//         {[
//           { label: 'Check', handler: handleCheck },
//           { label: 'Suggest', handler: handleSuggest },
//           { label: 'Dictionary Attack', handler: handleDictionaryCheck },
//           { label: 'Time to Crack', handler: handleTimeToCrack },
//           { label: 'Generate Report', handler: handleGenerateReport },
//         ].map((btn, i) => (
//           <div key={i} style={{ width: '55%', textAlign: 'center' }}>
//             <button
//               type="button"
//               onClick={btn.handler}
//               style={{
//                 width: '100%',
//                 padding: '6px 0',
//                 fontSize: '0.9rem',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 transition: 'background 0.2s',
//               }}
//             >
//               {btn.label}
//             </button>

//             {outputType === 'entropy' && btn.label === 'Check' && (
//               <div style={{ marginTop: 14, animation: 'slideDown 0.3s ease forwards' }}>
//                 <EntropyDisplay entropy={entropyBits} length={password.length} />
//               </div>
//             )}

//             {outputType === 'suggest' && btn.label === 'Suggest' && (
//               <div style={{ marginTop: 14, animation: 'slideDown 0.3s ease forwards' }}>
//                 <div style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>Suggested password:</div>
//                 <code
//                   style={{
//                     display: 'block',
//                     marginTop: 8,
//                     padding: '8px 10px',
//                     background: 'var(--muted-bg)',
//                     borderRadius: 6,
//                   }}
//                 >
//                   {suggested}
//                 </code>
//               </div>
//             )}

//             {outputType === 'dict' && btn.label === 'Dictionary Attack' && (
//               <div style={{ marginTop: 14, animation: 'slideDown 0.3s ease forwards' }}>
//                 {dictMatches.length > 0 ? (
//                   <>
//                     <div style={{ color: '#e06c75', marginBottom: 6 }}>
//                       Words found: {dictMatches.join(', ')}
//                     </div>
//                     <div>Vulnerability: Prone to dictionary attack</div>
//                   </>
//                 ) : (
//                   <div style={{ color: '#98c379' }}>No common words found.</div>
//                 )}
//               </div>
//             )}

//             {outputType === 'time' && btn.label === 'Time to Crack' && (
//               <div
//                 style={{
//                   marginTop: 18,
//                   animation: 'slideDown 0.3s ease forwards',
//                   textAlign: 'left',
//                   lineHeight: '1.8',
//                 }}
//               >
//                 <div style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: 8 }}>
//                   Estimated times:
//                 </div>
//                 <div>
//                   {timeResults.map((r, idx) => (
//                     <div key={idx} style={{ marginBottom: 12 }}>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
//                         <div>{r.method}</div>
//                         <b>{r.time}</b>
//                       </div>
//                       {r.note && (
//                         <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{r.note}</div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <p className="note" style={{ marginTop: '18px', lineHeight: '1.8' }}>
//         Enter a password and click any option. <br /> Tip: Entropy is only an estimate — use long,
//         unique passphrases.
//       </p>

//       <style>
//         {`
//           @keyframes slideDown {
//             from { opacity: 0; transform: translateY(-8px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>
//     </section>
//   )
// }

// new

import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf'

//==============================================================================
// 1. STUBBED COMPONENTS (To make this file runnable)
//==============================================================================

// --- PasswordInput Component ---
const IconEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const IconEyeOff = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);
const IconCopy = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false)
  const [copied, setCopied] = useState(false)

  async function copyToClipboard() {
    if (!value) return
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
    try {
      await navigator.clipboard.writeText(value)
    } catch (err) {
      console.warn('Clipboard failed.', err)
    }
  }

  return (
    <div className="password-input-wrapper">
      <div className="input-row">
        <input
          id="password-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={show ? 'text' : 'password'}
          placeholder="Type your password"
          className="input"
        />
        <div className="icon-group">
          <button 
            className="icon-btn" 
            aria-label={show ? 'Hide password' : 'Show password'}
            onClick={() => setShow(s => !s)} 
            aria-pressed={show}
          >
            {show ? <IconEyeOff /> : <IconEye />}
          </button>
          <button 
            className={`icon-btn ${copied ? 'copied' : ''}`}
            aria-label="Copy password" 
            onClick={copyToClipboard}
            disabled={copied}
          >
            {copied ? <IconCheck /> : <IconCopy />}
          </button>
        </div>
      </div>
    </div>
  )
}

// --- StrengthBar Component ---
function StrengthBar({ entropy }) {
  const [strength, setStrength] = useState({ width: 0, color: '#71717a' });

  useEffect(() => {
    let newStrength = {};
    if (entropy === 0) {
      newStrength = { width: 0, color: '#71717a' };
    } else if (entropy < 40) {
      newStrength = { width: 20, color: '#ef4444' }; // Red
    } else if (entropy < 60) {
      newStrength = { width: 40, color: '#f97316' }; // Orange
    } else if (entropy < 80) {
      newStrength = { width: 60, color: '#f59e0b' }; // Amber
    } else if (entropy < 100) {
      newStrength = { width: 80, color: 'var(--theme-text-active)' }; // Lime
    } else {
      newStrength = { width: 100, color: 'var(--theme-primary-start)' }; // Green
    }
    setStrength(newStrength);
  }, [entropy]);

  return (
    <div className="meter-bg">
      <div 
        className="meter-bar" 
        style={{ 
          width: `${strength.width}%`, 
          backgroundColor: strength.color 
        }}
      ></div>
    </div>
  );
}

// --- EntropyDisplay Component ---
function EntropyDisplay({ entropy, length }) {
  return (
    <div className="entropy-display">
      <div className="entropy-score">{entropy} <span>bits</span></div>
      <div className="entropy-length">{length} <span>characters</span></div>
    </div>
  )
}


//==============================================================================
// 2. CHECKER COMPONENT (Main Logic)
//==============================================================================

export default function Checker() {
  const [password, setPassword] = useState('')
  const [entropyBits, setEntropyBits] = useState(0)
  const [outputType, setOutputType] = useState('')
  const [suggested, setSuggested] = useState('')
  const [dictMatches, setDictMatches] = useState([])
  const [timeResults, setTimeResults] = useState([])

  const WORDLIST = [
    'password', 'pass', 'admin', 'user', 'login', 'qwerty', 'letmein',
    'welcome', '1234', '12345', '123456', 'test', 'root', 'secret', 'name', 'email'
  ]

  // --------- ENTROPY ----------
  function calculateEntropy(password) {
    if (!password) return 0
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasDigits = /[0-9]/.test(password)
    const hasSymbols = /[^A-Za-z0-9]/.test(password)

    let pool = 0
    if (hasLower) pool += 26
    if (hasUpper) pool += 26
    if (hasDigits) pool += 10
    if (hasSymbols) pool += 32
    if (pool === 0) return 0
    const entropy = password.length * Math.log2(pool)
    return Math.round(entropy * 10) / 10
  }

  const liveEntropy = calculateEntropy(password)

  // --------- STRENGTH LABEL HELPER ----------
  function getStrengthInfo(entropy) {
    if (entropy === 0) {
      return { label: '...', color: '#71717a' };
    } else if (entropy < 40) {
      return { label: 'Very Weak', color: '#ef4444' }; // Red
    } else if (entropy < 60) {
      return { label: 'Weak', color: '#f97316' }; // Orange
    } else if (entropy < 80) {
      return { label: 'Good', color: '#f59e0b' }; // Amber
    } else if (entropy < 100) {
      return { label: 'Strong', color: 'var(--theme-text-active)' }; // Lime
    } else {
      return { label: 'Very Strong!', color: 'var(--theme-primary-start)' }; // Green
    }
  }

  const strengthInfo = getStrengthInfo(liveEntropy);

  // --------- BUTTON HANDLERS ----------
  function handleCheck() {
    const entropy = calculateEntropy(password)
    setEntropyBits(entropy)
    setOutputType('entropy')
  }
// changed here
  function handleSuggest() {
    const specials = '!@#$%^&*()-_=+[]{};:,.<>?/|~'
    const count = Math.floor(Math.random() * 2) + 3
    let add = ''
    for (let i = 0; i < count; i++) add += specials[Math.floor(Math.random() * specials.length)]
    const suggestion = '@'+password + add
    setSuggested(suggestion)
    setOutputType('suggest')
  }

  function handleDictionaryCheck() {
    const pwdLower = password.toLowerCase()
    const found = WORDLIST.filter(w => pwdLower.includes(w))
    setDictMatches(found)
    setOutputType('dict')
  }

  // --------- TIME TO CRACK ----------
  function formatDuration(seconds) {
    if (!isFinite(seconds) || seconds <= 0) return 'instantly'
    if (seconds < 1) return `${Math.round(seconds * 1000)} ms`
    const minute = 60, hour = 60 * minute, day = 24 * hour, year = 365 * day
    if (seconds < minute) return `${Math.round(seconds)} sec`
    if (seconds < hour) return `${Math.round(seconds / minute)} min`
    if (seconds < day) return `${Math.round(seconds / hour)} hr`
    if (seconds < year) return `${Math.round(seconds / day)} days`
    const years = seconds / year
    if (years < 1000) return `${years.toFixed(1)} years`
    if (years < 1e6) return `${Math.round(years / 1000)}k years`
    return `> ${Math.round(years / 1e6)}M years`
  }

  function expectedAttempts(entropy) {
    return Math.exp((entropy - 1) * Math.LN2)
  }

  function handleTimeToCrack() {
    const entropy = calculateEntropy(password)
    setEntropyBits(entropy)
    const found = WORDLIST.filter(w => password.toLowerCase().includes(w))
    const expected = expectedAttempts(entropy)

    const results = [
      { method: 'Brute-force — single GPU (1e9 guesses/sec)', rps: 1e9 },
      { method: 'Brute-force — large cluster (1e12 guesses/sec)', rps: 1e12 },
      { method: 'Online (throttled ~100 guesses/sec)', rps: 100 },
    ].map(s => ({
      method: s.method,
      time: formatDuration(expected / s.rps),
    }))

    if (found.length > 0)
      results.push({ method: 'Dictionary / targeted (found words)', time: 'immediate', note: found.join(', ') })
    else
      results.push({ method: 'Dictionary / targeted', time: 'likely slow', note: 'no common words detected' })

    setTimeResults(results)
    setDictMatches(found)
    setOutputType('time')
  }

  // --------- REPORT GENERATION ----------
  function handleGenerateReport() {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    let y = 60
    const lineGap = 22

    // Header (Themed)
    const startColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary-start').trim();
    const endColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary-end').trim();
    
    // Simple hex-to-rgb for jsPDF
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? result.slice(1).map(c => parseInt(c, 16)) : [0,0,0];
    }
    const [r, g, b] = hexToRgb(startColor || '#10b981'); // Default to green
    
    doc.setFillColor(r, g, b); // Use theme color
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 70, 'F');
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(255, 255, 255); // White text
    doc.text('Password Security Report', 40, 45)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(230, 230, 230);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, 65)

    const section = (title) => {
      y += 30
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.setTextColor(r, g, b); // Theme color for titles
      doc.text(title, 40, y)
      y += 8
      doc.setDrawColor(r, g, b);
      doc.line(40, y, 550, y)
      y += 20
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(50)
      doc.setFontSize(11)
    }

    // 1️⃣ Basic Info
    section('1. Basic Information')
    doc.text(`Password: ${'*'.repeat(password.length) || '(none entered)'}`, 50, y) // Masked password
    y += lineGap
    doc.text(`Length: ${password.length} characters`, 50, y)
    y += lineGap
    doc.text(`Entropy: ${entropyBits} bits`, 50, y)

    // 2️⃣ Dictionary Check
    section('2. Dictionary Analysis')
    if (dictMatches.length > 0) {
      doc.setFont('helvetica', 'bold')
      doc.text('Common words detected in password:', 50, y)
      y += lineGap
      doc.setFont('helvetica', 'normal')
      doc.text(dictMatches.join(', '), 65, y)
      y += lineGap
      doc.setTextColor(200, 50, 50)
      doc.text('This makes the password easier to guess.', 50, y)
      doc.setTextColor(50)
    } else {
      doc.text('No common dictionary words found.', 50, y)
    }

    // 3️⃣ Time-to-crack
    section('3. Estimated Time to Crack')
    y += 10
    if (timeResults.length > 0) {
      timeResults.forEach((r) => {
        doc.setFont('helvetica', 'bold')
        doc.text(`• ${r.method}`, 50, y)
        y += lineGap
        doc.setFont('helvetica', 'normal')
        doc.text(`  Estimated time: ${r.time}`, 65, y)
        if (r.note) {
          y += lineGap
          doc.setTextColor(120)
          doc.text(`  Note: ${r.note}`, 65, y)
          doc.setTextColor(50)
        }
        y += 10
      })
    } else {
      doc.text('Run the "Time to Crack" check to generate these estimates.', 50, y)
    }

    // 4️⃣ Suggested password
    if (suggested) {
      section('4. Suggested Password')
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(0, 153, 0)
      doc.text(suggested, 50, y)
      y += lineGap
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(50)
      doc.text('This was a simple suggestion. Use longer passwords.', 50, y)
    }

    y += 50
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(10)
    doc.text(
      'This report is automatically generated. For better protection, use multi-factor authentication.',
      40,
      y
    )

    const date = new Date().toISOString().slice(0, 10)
    doc.save(`Password_Report_${date}.pdf`)
  }

  // --------- CLEAR HANDLER ----------
  function handleClear() {
    setPassword('');
    setEntropyBits(0);
    setOutputType('');
    setSuggested('');
    setDictMatches([]);
    setTimeResults([]);
  }

  // --------- UI ----------
  return (
    <>
      <style>
        {`
          /* --- Global Theme Variables (for this standalone file) --- */
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
          
          /* --- Checker Card Styling --- */
          .checker-card {
            background: linear-gradient(135deg, var(--theme-bg-gradient-start), var(--theme-bg-gradient-end));
            border-radius: 24px;
            padding: 32px 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(var(--theme-text-active), 0.2);
            backdrop-filter: blur(12px);
            max-width: 640px;
            margin: 40px auto;
          }
          
          .checker-card h2 {
            font-size: 36px;
            font-weight: 800;
            text-align: center;
            background: linear-gradient(135deg, var(--theme-primary-start) 0%, var(--theme-primary-end) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0 0 24px 0;
            letter-spacing: -0.02em;
          }
          
          /* --- Button Grid Styling --- */
          .btn-grid {
            margin-top: 24px;
            display: grid;
            grid-template-columns: 1fr 1fr; /* 2-column layout */
            gap: 16px;
          }
          
          .btn-check {
            padding: 12px 16px;
            background: #27272a;
            color: #d4d4d8;
            border: 1px solid #3f3f46;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
          }
          
          .btn-check:hover {
            background-color: #3f3f46;
            color: #f4f4f5;
            transform: translateY(-2px);
          }
          
          .btn-check:active {
            transform: translateY(0) scale(0.98);
          }
          
          .btn-check.primary {
            grid-column: 1 / -1; /* Make this button span both columns */
            background: linear-gradient(135deg, var(--theme-primary-start) 0%, var(--theme-primary-end) 100%);
            color: white;
            border: none;
            font-weight: 600;
            box-shadow: 0 4px 20px rgba(var(--theme-text-active), 0.3);
          }
          
          .btn-check.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(var(--theme-text-active), 0.5);
          }
          
          /* --- Output Area Styling (NOW CENTRALIZED) --- */
          .output-box {
            margin-top: 20px;
            padding: 20px;
            background: #27272a; /* Darker bg */
            border-radius: 12px;
            border: 1px solid #3f3f46;
            animation: slideDown 0.4s ease-out;
          }
          
          .output-box-suggest code {
            display: block;
            margin-top: 8px;
            padding: 12px;
            background: #3f3f46;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--theme-text-active);
            word-wrap: break-word;
          }
          
          .output-box-dict .dict-found {
            color: #ef4444; /* Red for warning */
            font-weight: 500;
            margin-bottom: 6px;
          }
          .output-box-dict .dict-safe {
            color: var(--theme-text-active); /* Green for safe */
            font-weight: 500;
          }
          
          .output-box-time {
            line-height: 1.8;
          }
          .output-box-time-header {
            font-size: 0.95rem;
            color: #a1a1aa;
            margin-bottom: 12px;
          }
          .output-box-time .time-row {
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            gap: 16px;
          }
          .output-box-time .time-row b {
            color: #f4f4f5;
            flex-shrink: 0;
          }
          .output-box-time .time-row .time-note {
            font-size: 0.8rem;
            color: #a1a1aa;
            margin-top: -4px;
          }
          
          .note {
            text-align: center;
            font-size: 14px;
            color: #a1a1aa;
            margin-top: 24px;
            line-height: 1.7;
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* --- PasswordInput Styles --- */
          .password-input-wrapper {
            width: 100%;
            margin: 0 auto;
          }
          .input-row {
            display: flex;
            align-items: center;
            background-color: #27272a;
            border-radius: 12px;
            border: 1px solid #3f3f46;
            transition: all 0.3s ease;
            position: relative;
          }
          .input-row:focus-within {
            border-color: var(--theme-text-active);
            box-shadow: 0 0 0 3px rgba(var(--theme-text-active), 0.2);
          }
          .input {
            flex-grow: 1;
            background: transparent;
            border: none;
            outline: none;
            padding: 16px;
            font-size: 16px;
            color: #f4f4f5;
            min-width: 0;
          }
          .input::placeholder { color: #71717a; }
          .icon-group { display: flex; align-items: center; padding-right: 8px; }
          .icon-btn {
            display: inline-flex; align-items: center; justify-content: center;
            background: transparent; border: none; color: #a1a1aa;
            cursor: pointer; padding: 8px; border-radius: 8px;
            transition: all 0.2s ease;
          }
          .icon-btn:hover { color: #f4f4f5; background-color: #3f3f46; }
          .icon-btn:focus-visible { outline: 2px solid var(--theme-text-active); outline-offset: 2px; }
          .icon-btn.copied { color: var(--theme-text-active); }
          
          /* --- Strength Label Styles --- */
          .strength-label-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #a1a1aa;
            margin-bottom: 8px; /* Space before the bar */
            margin-top: 16px; /* Space after the input */
            padding: 0 4px;
          }
          
          .strength-label-text {
            font-size: 16px;
            font-weight: 600;
            transition: color 0.4s ease;
          }
          
          /* --- StrengthBar Styles --- */
          .meter-bg {
            width: 100%;
            height: 12px;
            background-color: #3f3f46;
            border-radius: 6px;
            overflow: hidden;
          }
          .meter-bar {
            height: 100%;
            border-radius: 6px;
            transition: width 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                        background-color 0.4s ease;
          }
          
          /* --- EntropyDisplay Styles --- */
          .entropy-display {
            display: flex;
            justify-content: space-around;
            align-items: center;
            text-align: center;
          }
          .entropy-score, .entropy-length {
            font-size: 28px;
            font-weight: 700;
            color: var(--theme-text-active);
          }
          .entropy-score span, .entropy-length span {
            font-size: 14px;
            font-weight: 500;
            color: #a1a1aa;
            margin-left: 4px;
          }
        `}
      </style>

      <section className="checker-card">
        <h2>Password Security Checker</h2>

        <PasswordInput
          value={password}
          onChange={(v) => {
            setPassword(v)
            setOutputType('')
            setDictMatches([])
            setTimeResults([])
          }}
        />
        
        <div className="strength-label-wrapper">
          <span>Real-time Strength</span>
          <span 
            className="strength-label-text" 
            style={{ color: strengthInfo.color }}
          >
            {strengthInfo.label}
          </span>
        </div>
        
        <StrengthBar entropy={liveEntropy} />

        {/* --- MODIFIED: Button Grid --- */}
        <div className="btn-grid">
          <button type="button" onClick={handleCheck} className="btn-check">
            Check Entropy
          </button>
          <button type="button" onClick={handleSuggest} className="btn-check">
            Suggest Stronger
          </button>
          <button type="button" onClick={handleDictionaryCheck} className="btn-check">
            Dictionary Attack
          </button>
          <button type="button" onClick={handleTimeToCrack} className="btn-check">
            Time to Crack
          </button>
          
          <button
            type="button"
            onClick={handleGenerateReport}
            className="btn-check primary"
          >
            Generate Full Report (PDF)
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            className="btn-check"
            style={{ gridColumn: '1 / -1' }} // Make it span full width
          >
            Clear All
          </button>
        </div>

        {/* --- NEW: Centralized Output Box --- */}
        {outputType && (
          <div className="output-box">
            {outputType === 'entropy' && (
              <EntropyDisplay entropy={entropyBits} length={password.length} />
            )}
            
            {outputType === 'suggest' && (
              <div className="output-box-suggest">
                <div style={{ fontSize: '0.95rem', color: '#a1a1aa' }}>Suggested password:</div>
                <code>{suggested}</code>
              </div>
            )}
            
            {outputType === 'dict' && (
              <div className="output-box-dict">
                {dictMatches.length > 0 ? (
                  <>
                    <div className="dict-found">
                      Words found: {dictMatches.join(', ')}
                    </div>
                    <div>Vulnerability: Prone to dictionary attack</div>
                  </>
                ) : (
                  <div className="dict-safe">No common words found.</div>
                )}
              </div>
            )}

            {outputType === 'time' && (
              <div className="output-box-time">
                <div className="output-box-time-header">Estimated times:</div>
                <div>
                  {timeResults.map((r, idx) => (
                    <div key={idx} className="time-row">
                      <div>
                        <div>{r.method}</div>
                        {r.note && (
                          <div className="time-note">{r.note}</div>
                        )}
                      </div>
                      <b>{r.time}</b>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <p className="note">
          Enter a password and click any option. <br /> Tip: Entropy is only an estimate — use long,
          unique passphrases.
        </p>

      </section>
    </>
  )
}