import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/common'
import { uiConstants } from './constants/ui_constants'
import { AboutPage } from './pages/about/AboutPage'
import { CareersPage } from './pages/careers/CareersPage'
import { ContactPage } from './pages/contact/ContactPage'
import { HomePage } from './pages/home/HomePage'
import { InsightsPage } from './pages/insights/InsightsPage'
import { ProductDetailsPage } from './pages/products/ProductDetailsPage'
import { ProductsPage } from './pages/products/ProductsPage'
import { ProjectsPage } from './pages/projects/ProjectsPage'
import './App.css'

const { routes } = uiConstants

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductDetailsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
