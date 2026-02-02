'use client'

export const Logo = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      marginBottom: '0.5rem'
    }}>
      <img
        src="/logo.svg"
        alt="One Big Future"
        style={{ 
          height: '40px', 
          width: 'auto',
          maxWidth: '100%'
        }}
      />
    </div>
  )
}
