
const footerStyle = {
  backgroundColor: '#F3F3F4', // Change the color as needed
  color: '#272727',
  padding: '30px 0',
  textAlign: 'center',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const linkStyle = {
  color: '#272727',
  textDecoration: 'none',
  marginRight: '15px',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <h6 style={{ marginBottom: '15px', color:'#E33183',fontSize:'20px' }}>Connect with Us</h6>
        {/* Add social media or contact links here */}
        <p>
          <a href="#" style={linkStyle}>
            Facebook
          </a>
          |
          <a href="#" style={linkStyle}>
            Twitter
          </a>
          |
          <a href="#" style={linkStyle}>
            Instagram
          </a>
        </p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>&copy; {new Date().getFullYear()} Matri-Marry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
