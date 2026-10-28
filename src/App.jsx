import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Projects from './pages/Projects';
import Showcase from './pages/Showcase';
import About from './pages/About';
import Contact from './pages/Contact';
import EWSProject from './pages/EWSProject';
import DonkeyKongProject from './pages/DonkeyKongProject';
import DeliveryDashProject from './pages/DeliveryDashProject';
import './App.css'; // Just in case, but we might delete it

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/EWS" element={<EWSProject />} />
        <Route path="/projects/donkey-kong" element={<DonkeyKongProject />} />
        <Route path="/projects/delivery-dash" element={<DeliveryDashProject />} />
      </Routes>
    </Router>
  );
}

export default App;
