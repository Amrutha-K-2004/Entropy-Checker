import React, { useState } from 'react'


// It checks for lowercase, uppercase, digits, and symbols, sums the possible choices,
//  and multiplies their log base 2 by the length of the password,
//  then rounds to one decimal place. 
// If the password is empty or no character categories are detected, it returns 0
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
  if (hasSymbols) pool += 32 // rough estimate for printable symbols

  if (pool === 0) return 0
  const entropy = password.length * Math.log2(pool)
  return Math.round(entropy * 10) / 10 // round to 1 dp
}

export default function PasswordInput({ value, onChange, onCheck }) {
  const [show, setShow] = useState(false)

  async function copyToClipboard() {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
    } catch (e) {
      // fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = value
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
  }

  function handleCheckClick() {
    const entropy = calculateEntropy(value)
    if (typeof onCheck === 'function') onCheck(entropy)
  }

  return (
    <div className="password-input">
      <label className="label">Enter password</label>
      <div className="input-row">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={show ? 'text' : 'password'}
          placeholder="Type your password"
          className="input"
        />
        <div className="icon-group">
          <button
            type="button"
            className="icon-btn"
            title={show ? 'Hide password' : 'Show password'}
            onClick={() => setShow((s) => !s)}
            aria-pressed={show}
          >
            {show ? '🙈' : '👀'}
          </button>
          <button
            type="button"
            className="icon-btn"
            title="Copy password"
            onClick={copyToClipboard}
          >
            📋
          </button>
        </div>
      </div>
      <div className="controls">
        <button type="button" className="secondary" onClick={() => onChange('')}>
          Clear
        </button>
        {/* <button type="button" className="primary" onClick={handleCheckClick}>
          Check
        </button> */}
      </div>
    </div>
  )
}
