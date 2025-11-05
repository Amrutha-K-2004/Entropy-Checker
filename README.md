# Entropy Checker (React + Vite)

A small React app to estimate password entropy and show a strength meter.

Quick start (PowerShell):

```powershell
cd 'c:\Users\kamat\OneDrive\Desktop\INS'
npm install
npm run dev
```

Then open the local dev URL (usually http://localhost:5173).

Notes:
- This project uses a simple pool-based entropy estimate: it estimates character pool size (lower, upper, digits, symbols) and computes bits = length * log2(pool).
- It's an estimate and not a replacement for password managers or NIST guidance. Use long passphrases for best security.
