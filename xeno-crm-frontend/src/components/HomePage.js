import { motion } from 'framer-motion';

const sectionStyle = {
  maxWidth: 900,
  margin: "40px auto",
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 32px rgba(37,99,235,0.07)",
  padding: "40px 32px",
  color: "#22223b"
};

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={sectionStyle}
    >
      <h1 style={{ fontSize: 38, color: "#2563eb", marginBottom: 12, fontWeight: 700 }}>
        Xeno CRM Assignment
      </h1>
      <p style={{ fontSize: 18, color: "#22223b", marginBottom: 24 }}>
        <b>Xeno CRM</b> is a modern, AI-powered Customer Relationship Management platform trusted by India's top brands. Our CRM empowers businesses to automate marketing, manage customer data, and drive revenue with actionable analytics.
      </p>
      <h2 style={{ color: "#38bdf8", marginTop: 32, fontWeight: 600 }}>About Xeno Company</h2>
      <ul style={{ fontSize: 16, marginBottom: 24 }}>
        <li>Founded in 2015, based in Gurgaon, India</li>
        <li>Works with top retail & D2C brands (e.g., Taco Bell, Barista, Forest Essentials)</li>
        <li>Specializes in hyper-personalized marketing automation</li>
      </ul>
      <h3 style={{ color: "#8e32e9", marginTop: 28, fontWeight: 600 }}>Past Achievements</h3>
      <ul style={{ fontSize: 16, marginBottom: 24 }}>
        <li>Helped brands achieve 15-30% higher repeat sales</li>
        <li>Recognized by Google for Startups & Microsoft for Startups</li>
        <li>Launched India's first AI-powered retail CRM</li>
      </ul>
      <h3 style={{ color: "#2563eb", marginTop: 28, fontWeight: 600 }}>Present Work</h3>
      <ul style={{ fontSize: 16, marginBottom: 24 }}>
        <li>Serving 100+ brands with real-time customer segmentation</li>
        <li>Building advanced analytics dashboards for marketers</li>
        <li>Expanding into new verticals: e-commerce, hospitality</li>
      </ul>
      <h3 style={{ color: "#38ce3c", marginTop: 28, fontWeight: 600 }}>Our CRM Specialities</h3>
      <ul style={{ fontSize: 16, marginBottom: 24 }}>
        <li>Super-fast customer & order management</li>
        <li>AI-driven marketing campaign tools</li>
        <li>Real-time analytics & easy-to-use dashboards</li>
        <li>Modern, mobile-friendly, secure UI</li>
      </ul>
      <h3 style={{ color: "#ff4d6b", marginTop: 28, fontWeight: 600 }}>Why Choose Our CRM?</h3>
      <ul style={{ fontSize: 16 }}>
        <li>Simple, beautiful, and responsive design</li>
        <li>Built with React, Material UI, and Framer Motion</li>
        <li>Designed for high-growth, data-driven teams</li>
      </ul>
    </motion.div>
  );
}

export default HomePage;
