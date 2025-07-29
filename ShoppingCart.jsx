import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import CheckoutModal from './CheckoutModal'

const ShoppingCart = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice 
  } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
            />

            {/* Cart Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Shopping Cart</h2>
                  {items.length > 0 && (
                    <Badge variant="secondary">{items.length}</Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleCart}
                  className="rounded-full w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Add some delicious coffee to get started!
                    </p>
                    <Button onClick={toggleCart}>
                      Continue Shopping
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex space-x-4">
                                {/* Product Image */}
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-foreground truncate">
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {item.origin}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold text-foreground">
                                      ${item.price}
                                    </span>
                                    
                                    {/* Quantity Controls */}
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-8 h-8 p-0"
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </Button>
                                      <span className="w-8 text-center text-sm font-medium">
                                        {item.quantity}
                                      </span>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-8 h-8 p-0"
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                      >
                                        <Plus className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>

                                {/* Remove Button */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-8 h-8 p-0 text-muted-foreground hover:text-destructive"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Clear Cart Button */}
                    {items.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearCart}
                          className="w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Clear Cart
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <motion.div
                  className="border-t border-border p-6 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Button>

                  {/* Continue Shopping */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={toggleCart}
                  >
                    Continue Shopping
                  </Button>
                </motion.div>
              )}
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  )
}

export default ShoppingCart

