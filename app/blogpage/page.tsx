import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import BlogPreparingPage from '../components/BlogPage'


export default function BlogPageLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <BlogPreparingPage />
      <Footer />
    </div>
  )
}