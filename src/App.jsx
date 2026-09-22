import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Stage1 from './pages/Stage1'
import Stage2 from './pages/Stage2'
import Stage3 from './pages/Stage3'
import Stage4 from './pages/Stage4'
import Stage5 from './pages/Stage5'
import Stage6 from './pages/Stage6'
import Stage7 from './pages/Stage7'
import Stage8 from './pages/Stage8'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stage1" element={<Stage1 />} />
        <Route path="/stage2" element={<Stage2 />} />
        <Route path="/stage3" element={<Stage3 />} /> 
        <Route path="/stage4" element={<Stage4 />} /> 
        <Route path="/stage5" element={<Stage5 />} />
        <Route path="/stage6" element={<Stage6 />} />
        <Route path="/stage7" element={<Stage7 />} />
        <Route path="/stage8" element={<Stage8 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

