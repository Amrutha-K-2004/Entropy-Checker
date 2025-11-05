import React, { useState } from 'react'
import Header from './components/Header'
import Welcome from './pages/Welcome'
import Checker from './pages/Checker'
import './styles.css'
import FAQ from './components/FAQ'
import Last from './components/FAQ'

export default function App() {
  const [route, setRoute] = useState('welcome')

  return (
    <div className="app-root">
      <Header onNavigate={setRoute} />
      <main className="container">
        {route === 'welcome' && <Welcome onStart={() => setRoute('checker')} />}
        {route === 'checker' && <Checker />}
      </main>
      <FAQ/>
      <footer className="app-footer"  style={{ color: 'limegreen' }}>Entropy Checker — built with React + Vite
        {/* add view counter */}
        <br />
        <br />
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
    <span>Total number of views:</span>  
        <a href="https://www.freecounterstat.com" title="page counter"><img src="https://counter1.optistats.ovh/private/freecounterstat.php?c=u2rbbdrmbq6sbq3zlxyhde1q26pb24qm" border="0" title="page counter" alt="page counter"/></a>
 
</div>
           
      </footer>
    </div>
  )
}
