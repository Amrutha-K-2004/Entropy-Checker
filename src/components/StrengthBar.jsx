import React from 'react'


// display strength bar based on entropy
function entropyToLevel(entropy) {
  if (entropy <= 0) return { label: 'Empty', gradient: 'linear-gradient(90deg,#e2e8f0,#cbd5e1)', pct: 0 }
  if (entropy < 28) return { label: 'Very weak', gradient: 'linear-gradient(90deg,#ff7a7a,#ef4444)', pct: 18 }
  if (entropy < 36) return { label: 'Weak', gradient: 'linear-gradient(90deg,#ffb86b,#f97316)', pct: 36 }
  if (entropy < 60) return { label: 'Reasonable', gradient: 'linear-gradient(90deg,#fce38a,#facc15)', pct: 60 }
  if (entropy < 128) return { label: 'Strong', gradient: 'linear-gradient(90deg,#86efac,#10b981)', pct: 82 }
  return { label: 'Very strong', gradient: 'linear-gradient(90deg,#7c3aed,#06b6d4)', pct: 100 }
}

export default function StrengthBar({ entropy }) {
  const { label, gradient, pct } = entropyToLevel(entropy)

  return (
    <div className="strength">
      <div className="strength-header">
        <div className="strength-meta">{label}</div>
        <div className="entropy-small">{entropy} bits</div>
      </div>
      <div className="strength-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`Password strength: ${label}`}>
        <div className="fill" style={{ width: `${pct}%`, background: gradient }} />
      </div>
    </div>
  )
}
