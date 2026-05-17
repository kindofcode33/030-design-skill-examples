import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomePage from '@/components/HomePage'
import DesignSystem from '@/components/DesignSystem'

const NAV_ITEMS = [
  { label: 'About', href: '#' },
  { label: 'Research', href: '#' },
  { label: 'Academics', href: '#programs' },
  { label: 'People', href: '#' },
  { label: 'News & Events', href: '#' },
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesignSystem />} />
        <Route
          path="/example-01"
          element={
            <>
              <Header nav={NAV_ITEMS} />
              <HomePage />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
