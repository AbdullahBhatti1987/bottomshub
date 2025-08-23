"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  MapPin, 
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "Pakistan",
    province: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [errors, setErrors] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Check if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      router.push("/cart");
    }
  }, [cart, orderComplete, router]);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 250;
  const tax = subtotal * 0.17; // 17% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check if all items have size selected
    cart.forEach(item => {
      if (item.sizes && item.sizes.length > 0 && !item.size) {
        newErrors.size = "Please select size for all items";
      }
    });

    // Contact info validation
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    
    // Shipping validation
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.province) newErrors.province = "Province is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    
    // Payment validation
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!formData.cardName) newErrors.cardName = "Card holder name is required";
      if (!formData.cardExpiry) newErrors.cardExpiry = "Expiry date is required";
      if (!formData.cardCvc) newErrors.cardCvc = "CVC is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call to process order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate random order number
      const newOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(newOrderNumber);
      setOrderComplete(true);
      
      // Clear cart after successful order
      clearCart();
    } catch (error) {
      console.error("Order processing failed:", error);
      setErrors({ submit: "There was an error processing your order. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your order number is:
          </p>
          <p className="text-xl font-semibold text-primary mb-6">{orderNumber}</p>
          <p className="text-gray-600 mb-8">
            We have sent a confirmation email to {formData.email} with your order details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/account/orders" 
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Link 
        href="/cart" 
        className="flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Cart
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {errors.size && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-start">
          <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
          <span>{errors.size}</span>
        </div>
      )}
      
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {errors.submit}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Order Summary */}
        <div className="lg:order-2 bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={`${item._id}-${item.size}`} className="flex gap-4 py-4 border-b border-gray-200">
                <div className="w-20 h-20 relative rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={item.images?.[0]?.url || "/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.size && (
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                  )}
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="font-medium text-primary mt-1">Rs. {item.price * item.quantity}</p>
                  
                  {item.sizes && item.sizes.length > 0 && !item.size && (
                    <p className="text-sm text-red-500 mt-1">Please select a size</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>Rs. {tax.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Right Column - Forms */}
        <div className="lg:order-1 space-y-8">
          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2" size={20} />
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0300 1234567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </section>
          
          {/* Shipping Address */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Truck className="mr-2" size={20} />
              Shipping Address
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Street address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div className="mt-4">
              <label htmlFor="apartment" className="block text-sm font-medium mb-1">
                Apartment, suite, etc. (optional)
              </label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <label htmlFor="province" className="block text-sm font-medium mb-1">
                  Province *
                </label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.province ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Province</option>
                  <option value="punjab">Punjab</option>
                  <option value="sindh">Sindh</option>
                  <option value="kpk">Khyber Pakhtunkhwa</option>
                  <option value="balochistan">Balochistan</option>
                  <option value="gilgit">Gilgit-Baltistan</option>
                  <option value="kashmir">Azad Kashmir</option>
                </select>
                {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.postalCode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600">
                Save this information for next time
              </label>
            </div>
          </section>
          
          {/* Payment Method */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2" size={20} />
              Payment Method
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg">
                <input
                  type="radio"
                  id="payment-card"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="payment-card" className="flex-1">
                  Credit/Debit Card
                </label>
              </div>
              
              <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg">
                <input
                  type="radio"
                  id="payment-cod"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="payment-cod" className="flex-1">
                  Cash on Delivery
                </label>
              </div>
            </div>
            
            {formData.paymentMethod === "card" && (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.cardName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.cardExpiry ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="cardCvc" className="block text-sm font-medium mb-1">
                      CVC *
                    </label>
                    <input
                      type="text"
                      id="cardCvc"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.cardCvc ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="123"
                    />
                    {errors.cardCvc && <p className="text-red-500 text-sm mt-1">{errors.cardCvc}</p>}
                  </div>
                </div>
              </div>
            )}
          </section>
          
          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full py-3 px-6 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : `Pay Rs. ${total.toLocaleString()}`}
            </button>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              By completing your purchase you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}