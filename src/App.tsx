import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<PlaceholderPage />} />
        <Route path="services" element={<PlaceholderPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="industries" element={<PlaceholderPage />} />
        <Route path="brands" element={<PlaceholderPage />} />
        <Route path="about" element={<PlaceholderPage />} />
        <Route path="contact" element={<PlaceholderPage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  )
}

