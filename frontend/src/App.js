// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } fro
// import HomePage from './pages/HomePage';
// // import AboutPage from './pages/About';
// // import ContactPage from './pages/Contact';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import SignUp from './pages/SignUp';
// import LoginPage from './pages/LoginPage';
// import Sidebar from './components/Sidebar';
// import HRPage from './pages/HRPage';
// import FinancePage from './pages/FinancePage';
// import OperationsPage from './pages/OperationsPage';
// import SalesPage from './pages/SalesPage';
// import AnalyticsPage from './pages/AnalyticsPage';


// function App() {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Sidebar />
//       <ThemeProvider>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<LoginPage />} />
//         {/* <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} /> */}
//         <Route path="/hr" element={<HRPage />} />
//         <Route path="/finance" element={<FinancePage />} />
//         <Route path="/operations" element={<OperationsPage />} />
//         <Route path="/sales" element={<SalesPage />} />
//         <Route path="/analytics" element={<AnalyticsPage />} />
//       </Routes>
//       </ThemeProvider>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;


// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HRPage from './pages/HRPage';
import FinancePage from './pages/FinancePage';
import OperationsPage from './pages/OperationsPage';
import SalesPage from './pages/SalesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SignUp from './pages/SignUp';
import LoginPage from './api/auth/LoginPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hr" element={<HRPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
