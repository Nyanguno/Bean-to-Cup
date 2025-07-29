import Header from './components/Header'
import EnhancedHero from './components/EnhancedHero'
import AnimatedCoffeeJourney from './components/AnimatedCoffeeJourney'
import InteractiveProductShowcase from './components/InteractiveProductShowcase'
import Footer from './components/Footer'
import ShoppingCart from './components/ShoppingCart'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <EnhancedHero />
          <AnimatedCoffeeJourney />
          <InteractiveProductShowcase />
        </main>
        <Footer />
        <ShoppingCart />
      </div>
    </CartProvider>
  )
}

export default App
