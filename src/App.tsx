import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Phrases } from './pages/Phrases';
import { Tutorial } from './pages/Tutorial';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/phrases" element={<Phrases />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
