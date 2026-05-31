

const Contact = () => {
  return (
    <div className="page-container" style={{ minHeight: '100vh', padding: '100px 0 4rem' }}>
      <div className="container">
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', fontWeight: 800 }}>Contact</h1>
        <p style={{ marginTop: '1rem', color: '#ccc', lineHeight: '1.6', maxWidth: '800px', fontSize: '1.05rem' }}>
          Get in touch for collaborations, job opportunities, or just to say hi!
        </p>
        <form style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '500px', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Name" 
            style={{ 
              padding: '1rem', 
              background: '#111', 
              border: '1px solid #333', 
              color: 'white', 
              borderRadius: '8px',
              fontFamily: 'inherit',
              fontSize: '1rem'
            }} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            style={{ 
              padding: '1rem', 
              background: '#111', 
              border: '1px solid #333', 
              color: 'white', 
              borderRadius: '8px',
              fontFamily: 'inherit',
              fontSize: '1rem'
            }} 
          />
          <textarea 
            placeholder="Message" 
            rows="5" 
            style={{ 
              padding: '1rem', 
              background: '#111', 
              border: '1px solid #333', 
              color: 'white', 
              borderRadius: '8px', 
              resize: 'vertical',
              fontFamily: 'inherit',
              fontSize: '1rem'
            }} 
          />
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ 
              alignSelf: 'flex-start', 
              padding: '0.8rem 2rem', 
              cursor: 'pointer' 
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
