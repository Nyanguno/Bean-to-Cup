import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, ShoppingCart, Heart, Eye, Coffee, Leaf, Award, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'

const products = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 127,
    description: "Bright, floral notes with hints of citrus and wine. A truly exceptional single-origin coffee with complex flavor profiles that dance on your palate.",
    image: "/src/assets/7jmLEXPVdi0M.jpg",
    roastLevel: "Light",
    processingMethod: "Washed",
    isPopular: true,
    isSale: true,
    features: ["Organic", "Fair Trade", "Single Origin"],
    flavorNotes: ["Citrus", "Floral", "Wine", "Bright"],
    brewMethods: ["Pour Over", "French Press", "Cold Brew"]
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    price: 22.99,
    rating: 4.8,
    reviews: 89,
    description: "Rich, full-bodied with chocolate and caramel notes. Perfect for espresso or drip brewing with a smooth, balanced finish.",
    image: "/src/assets/eLv1ZodBpug5.png",
    roastLevel: "Medium",
    processingMethod: "Washed",
    isPopular: false,
    isSale: false,
    features: ["Rainforest Alliance", "Premium Grade"],
    flavorNotes: ["Chocolate", "Caramel", "Nuts", "Balanced"],
    brewMethods: ["Espresso", "Drip", "French Press"]
  },
  {
    id: 3,
    name: "Brazilian Santos",
    origin: "Brazil",
    price: 19.99,
    rating: 4.7,
    reviews: 156,
    description: "Smooth, nutty flavor with low acidity. An excellent everyday coffee for all brewing methods with consistent quality.",
    image: "/src/assets/7jmLEXPVdi0M.jpg",
    roastLevel: "Medium-Dark",
    processingMethod: "Natural",
    isPopular: true,
    isSale: false,
    features: ["Sustainable", "Direct Trade"],
    flavorNotes: ["Nuts", "Smooth", "Low Acid", "Creamy"],
    brewMethods: ["Drip", "French Press", "Espresso"]
  },
  {
    id: 4,
    name: "Guatemalan Antigua",
    origin: "Guatemala",
    price: 26.99,
    originalPrice: 31.99,
    rating: 4.9,
    reviews: 73,
    description: "Complex, spicy flavor with smoky undertones. Grown in volcanic soil for unique character and exceptional depth.",
    image: "/src/assets/eLv1ZodBpug5.png",
    roastLevel: "Dark",
    processingMethod: "Washed",
    isPopular: false,
    isSale: true,
    features: ["Volcanic Soil", "High Altitude"],
    flavorNotes: ["Spicy", "Smoky", "Complex", "Bold"],
    brewMethods: ["Espresso", "French Press", "Moka Pot"]
  }
]

const InteractiveProductShowcase = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filter, setFilter] = useState('all')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })
  const { addToCart } = useCart()

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true
    if (filter === 'popular') return product.isPopular
    if (filter === 'sale') return product.isSale
    return true
  })

  const ProductModal = ({ product, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-background rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground">{product.origin}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-foreground">{product.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Flavor Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.flavorNotes.map((note, index) => (
                      <Badge key={index} variant="secondary">{note}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Recommended Brewing</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.brewMethods.map((method, index) => (
                      <Badge key={index} variant="outline">{method}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-foreground">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={() => addToCart(product)}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <section ref={sectionRef} id="products" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-primary/5 rounded-full blur-xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 2) * 70}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Coffee className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Premium Selection</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our Coffee Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated collection of single-origin coffees, 
            each with its own unique story and flavor profile.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="flex space-x-2 bg-card rounded-full p-2">
            {[
              { key: 'all', label: 'All Products', icon: Coffee },
              { key: 'popular', label: 'Popular', icon: Award },
              { key: 'sale', label: 'On Sale', icon: Star }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "ghost"}
                onClick={() => setFilter(key)}
                className="rounded-full"
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                <Card className="h-full overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="p-0 relative">
                    {/* Product Image */}
                    <div className="aspect-square overflow-hidden relative">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Overlay on Hover */}
                      <motion.div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedProduct(product)}
                          className="backdrop-blur-sm"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Quick View
                        </Button>
                      </motion.div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isPopular && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Badge className="bg-accent text-accent-foreground">
                            <Award className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        </motion.div>
                      )}
                      {product.isSale && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Badge variant="destructive">
                            Sale
                          </Badge>
                        </motion.div>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <motion.div
                      className="absolute top-3 right-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-background/80 backdrop-blur-sm hover:bg-background rounded-full w-10 h-10 p-0"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Title and Origin */}
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {product.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Leaf className="w-3 h-3 mr-1" />
                          {product.origin}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Coffee Details */}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Roast: {product.roastLevel}</span>
                        <span className="text-muted-foreground">{product.processingMethod}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <div className="w-full space-y-4">
                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-foreground">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        {product.originalPrice && (
                          <Badge variant="destructive" className="text-xs">
                            Save ${(product.originalPrice - product.price).toFixed(2)}
                          </Badge>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className="w-full group"
                          variant={hoveredProduct === product.id ? "default" : "outline"}
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                          Add to Cart
                        </Button>
                      </motion.div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button size="lg" variant="outline" className="text-lg px-12 py-6 rounded-full group">
            <Coffee className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
            View All Products
            <Truck className="w-5 h-5 ml-3" />
          </Button>
        </motion.div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default InteractiveProductShowcase

