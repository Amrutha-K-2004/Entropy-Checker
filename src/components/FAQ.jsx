import React, { useState } from 'react'


// array holds question-answer pairs
// The useState hook tracks which FAQ item is currently open.
// toggleFAQ switches the state to show or hide a specific answer when its question is clicked,
export default function FAQ() {
  const faqs = [
    {
      question: '🔐 What is password entropy?',
      answer:
        'Password entropy measures how unpredictable or strong your password is. The higher the entropy, the harder it is to guess or brute-force.'
    },
    {
      question: '⚡ How does Entropy Checker estimate cracking time?',
      answer:
        'The tool calculates entropy and estimates how long a brute-force attack would take based on modern hardware speeds (like 10⁹ guesses/sec).'
    },
    {
      question: '💡 How can I create a stronger password?',
      answer:
        'Use a mix of uppercase, lowercase, numbers, and special characters. Avoid dictionary words or patterns. Random combinations greatly increase entropy.'
    },
    {
      question: '🧮 What does this tool suggest?',
      answer:
        'It provides password strength feedback, improvement tips, and an estimated crack time so you can gauge your password’s security.'
    },
    {
      question: '🚀 Is my password stored anywhere?',
      answer:
        'No — everything runs locally in your browser. Your password is never sent or saved anywhere.'
    }
  ]

  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      className="faq-card"
      style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(132,204,22,0.1) 100%)',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(16,185,129,0.2)',
        backdropFilter: 'blur(12px)',
        maxWidth: '1000px', // matches Welcome box width
        margin: '60px auto',
        color: 'limegreen',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '2rem',
          background: 'linear-gradient(135deg, #10b981 0%, #84cc16 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Frequently Asked Questions (FAQ)
      </h2>

      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            padding: '20px 10px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={() => toggleFAQ(index)}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '1.1rem',
              color: '#d4d4d8',
            }}
          >
            <span>{faq.question}</span>
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: '#84cc16',
                transition: 'transform 0.2s',
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              {openIndex === index ? '−' : '+'}
            </span>
          </div>

          {openIndex === index && (
            <p
              style={{
                marginTop: '10px',
                lineHeight: '1.6',
                color: '#a1a1aa',
                transition: 'opacity 0.3s ease',
              }}
            >
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </section>
  )
}
