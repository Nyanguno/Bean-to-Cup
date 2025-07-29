import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  CreditCard, 
  Lock, 
  Truck, 
  CheckCircle, 
  User, 
  MapPin, 
  Mail,
  Phone,
  Calendar,
  Shield
} from 'lucide-react'
import { useCart } from '../context/CartContext'

const CheckoutModal = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Order Notes
    orderNotes: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = () => {
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true)
      clearCart()
    }, 2000)
  }

  const steps = [
    { id: 1, title: 'Shipping', icon: Truck },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: CheckCircle }
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {!orderComplete ? (
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Checkout</h2>
                  <p className="text-muted-foreground">Complete your coffee order</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                        currentStep >= step.id
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-muted-foreground text-muted-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <step.icon className="w-5 h-5" />
                    </motion.div>
                    <div className="ml-3 mr-8">
                      <p className={`font-medium ${
                        currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mr-8 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Shipping Information */}
                    {currentStep === 1 && (
                      <motion.div
                        key="shipping"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Truck className="w-5 h-5 mr-2" />
                              Shipping Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  value={formData.firstName}
                                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                                  placeholder="John"
                                />
                              </div>
                              <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                  id="lastName"
                                  value={formData.lastName}
                                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                                  placeholder="Doe"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  placeholder="john@example.com"
                                />
                              </div>
                              <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                  id="phone"
                                  value={formData.phone}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                  placeholder="+1 (555) 123-4567"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                placeholder="123 Coffee Street"
                              />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  value={formData.city}
                                  onChange={(e) => handleInputChange('city', e.target.value)}
                                  placeholder="New York"
                                />
                              </div>
                              <div>
                                <Label htmlFor="state">State</Label>
                                <Input
                                  id="state"
                                  value={formData.state}
                                  onChange={(e) => handleInputChange('state', e.target.value)}
                                  placeholder="NY"
                                />
                              </div>
                              <div>
                                <Label htmlFor="zipCode">ZIP Code</Label>
                                <Input
                                  id="zipCode"
                                  value={formData.zipCode}
                                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                  placeholder="10001"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {/* Step 2: Payment Information */}
                    {currentStep === 2 && (
                      <motion.div
                        key="payment"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <CreditCard className="w-5 h-5 mr-2" />
                              Payment Information
                            </CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Shield className="w-4 h-4 mr-1" />
                              Your payment information is secure and encrypted
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                value={formData.cardNumber}
                                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                              />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                  id="expiryDate"
                                  value={formData.expiryDate}
                                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                  placeholder="MM/YY"
                                  maxLength={5}
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  value={formData.cvv}
                                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                                  placeholder="123"
                                  maxLength={4}
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input
                                id="cardName"
                                value={formData.cardName}
                                onChange={(e) => handleInputChange('cardName', e.target.value)}
                                placeholder="John Doe"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {/* Step 3: Order Review */}
                    {currentStep === 3 && (
                      <motion.div
                        key="review"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Order Review
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Shipping Address */}
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                Shipping Address
                              </h4>
                              <div className="text-sm text-muted-foreground">
                                <p>{formData.firstName} {formData.lastName}</p>
                                <p>{formData.address}</p>
                                <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                                <p>{formData.email}</p>
                              </div>
                            </div>

                            <Separator />

                            {/* Payment Method */}
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center">
                                <CreditCard className="w-4 h-4 mr-2" />
                                Payment Method
                              </h4>
                              <div className="text-sm text-muted-foreground">
                                <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                                <p>{formData.cardName}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    
                    {currentStep < 3 ? (
                      <Button onClick={handleNextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button onClick={handlePlaceOrder} className="bg-primary">
                        <Lock className="w-4 h-4 mr-2" />
                        Place Order
                      </Button>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax</span>
                          <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Badge variant="secondary" className="w-full justify-center">
                          <Truck className="w-3 h-3 mr-1" />
                          Free shipping on orders over $25
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            /* Order Confirmation */
            <motion.div
              className="p-8 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Order Confirmed!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Thank you for your order! We'll send you a confirmation email shortly. 
                Your premium coffee will be roasted fresh and shipped within 2-3 business days.
              </p>
              
              <div className="space-y-4">
                <Button onClick={onClose} className="w-full max-w-sm">
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CheckoutModal

