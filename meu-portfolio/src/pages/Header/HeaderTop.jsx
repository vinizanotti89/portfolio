import React from 'react'
import LanguageToggle from '../LanguageToggle'

export default function HeaderTop() {
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'transparent',
      color: '#fff',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}>Idiomas:</span>
        <LanguageToggle />
      </div>
    </div>
  )
}