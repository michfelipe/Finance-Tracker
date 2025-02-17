import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <div className="app-container">
                    <div className="navbar">
                        <Link to="/">Dashboard</Link>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    <SignedOut>
                        <Navigate to="/auth" />
                    </SignedOut>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <FinancialRecordsProvider>
                                    <Dashboard />
                                </FinancialRecordsProvider>
                            }
                        ></Route>
                        <Route path="/auth" element={<Auth />}></Route>
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
