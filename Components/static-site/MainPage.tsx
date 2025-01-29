import { Navbar } from './Navbar'
import { HeroSection } from './main-page-sections/hero-section'
import { ServicesSection } from './main-page-sections/service-section'
import { HowItWorksSection } from './main-page-sections/how-it-works-section'
import { ReviewsSection } from './main-page-sections/reviews-section'
import { Footer } from '../Footer'

const MainPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  )
}

export default MainPage