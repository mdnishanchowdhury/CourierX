import { FiTruck, FiPackage, FiClock, FiShield } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';

const HomePage = () => {
  const features = [
    {
      icon: <FiTruck className="text-3xl text-blue-500" />,
      title: "Fast Delivery",
      description: "Same-day and next-day delivery options available"
    },
    {
      icon: <FiPackage className="text-3xl text-green-500" />,
      title: "Secure Packaging",
      description: "Professional packaging to ensure item safety"
    },
    {
      icon: <FiClock className="text-3xl text-amber-500" />,
      title: "Real-Time Tracking",
      description: "Monitor your package every step of the way"
    },
    {
      icon: <FiShield className="text-3xl text-purple-500" />,
      title: "Insurance Options",
      description: "Protect your valuable shipments"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "The delivery service is incredibly reliable. My packages always arrive on time and in perfect condition.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "E-commerce Manager",
      content: "Their tracking system is the best I've used. Customers love the real-time updates.",
      rating: 4
    },
    {
      name: "Emily Rodriguez",
      role: "Frequent Shipper",
      content: "Customer service is outstanding. They resolved an issue for me within minutes!",
      rating: 5
    }
  ];

  return (
    <div className="bg-white px-6 lg:px-12 pt-6 pb-6">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-400 to-amber-500  text-black rounded-2xl">
        <div className="container mx-auto px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Fast & Reliable <span className="text-blue-300">CourierX</span> Service
            </h1>
            <p className="text-xl text-black">
              Experience fast, safe, and reliable courier services with real-time tracking and secure delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-lg font-medium shadow-lg transition-all hover:scale-[1.02]">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-all hover:scale-[1.02]">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img 
              src="https://i.ibb.co.com/pjxQwsLc/offline-courier-service.png" 
              alt="Courier service"
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Service
            </h2>
            <p className="text-lg text-gray-600">
              We combine speed, security, and outstanding service to provide a delivery experience you can trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6">
          <div className="lg:flex items-center gap-12">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Simple <span className="text-blue-600">Delivery Process</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our seamless delivery process ensures efficiency and reliability from start to finish.
              </p>
              
              <div className="space-y-8">
                {[
                  { step: 1, title: "Book Your Delivery", description: "Quick and easy online booking" },
                  { step: 2, title: "We Collect Your Package", description: "Convenient pickup options" },
                  { step: 3, title: "Safe Transportation", description: "Professional handling and tracking" },
                  { step: 4, title: "Fast Delivery", description: "On-time delivery with confirmation" }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://i.ibb.co.com/9Hvj0g5q/top-10-on-demand-courier-delivery-apps.png" 
                alt="Delivery process"
                className="rounded-xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it - hear what our customers say about our service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    i < testimonial.rating ? 
                    <FaStar key={i} className="text-yellow-400" /> : 
                    <FaRegStar key={i} className="text-gray-300" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-600 mb-6">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-amber-400 to-amber-500  text-black rounded-2xl ">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Experience Better Delivery?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their shipments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-lg font-medium shadow-lg transition-all hover:scale-[1.02]">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-all hover:scale-[1.02]">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;