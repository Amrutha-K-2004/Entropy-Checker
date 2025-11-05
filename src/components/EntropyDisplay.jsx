import React from 'react'


// display entropy
export default function EntropyDisplay({ entropy, length }) {
  return (
    <div className="entropy-display">
      <div className="entropy-row">
        <div className="entropy-value">{entropy} bits</div>
        <div className="entropy-meta">Length: {length}</div>
      </div>
    </div>
  )
}
