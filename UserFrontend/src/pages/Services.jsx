import { useState } from 'react';
import { FiTruck, FiClock, FiDollarSign, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { FaStar, FaRegStar, FaArrowRight } from 'react-icons/fa';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Express Delivery",
      description: "Same-day delivery for urgent packages within the city",
      price: "$12.99",
      deliveryTime: "2-4 hours",
      rating: 4.8,
      category: "express",
      features: ["Real-time tracking", "Instant booking", "Dedicated courier"]
    },
    {
      id: 2,
      title: "Standard Delivery",
      description: "Reliable next-day delivery for all your packages",
      price: "$8.99",
      deliveryTime: "24 hours",
      rating: 4.5,
      category: "standard",
      features: ["Package insurance", "Email notifications", "Multiple drop-offs"]
    },
    {
      id: 3,
      title: "International Shipping",
      description: "Global delivery with customs handling included",
      price: "$29.99",
      deliveryTime: "3-5 days",
      rating: 4.7,
      category: "international",
      features: ["Customs clearance", "Tracking updates", "Duty calculator"]
    },
    {
      id: 4,
      title: "Large Item Delivery",
      description: "Special handling for bulky and heavy items",
      price: "$45.99",
      deliveryTime: "1-2 days",
      rating: 4.6,
      category: "special",
      features: ["White glove service", "Assembly available", "Two-person team"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Delivery Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fast, reliable, and secure delivery solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        {!selectedService ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                {/* Image Section */}
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://i.ibb.co.com/MJZmvSF/goods-courier-service-500x500-1-large.jpg"
                    alt="Courier Service"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <FiTruck className="text-amber-600 text-xl" />
                    </div>
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <FaStar className="text-amber-400 mr-1" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center text-gray-700">
                      <FiClock className="mr-2" />
                      <span>{service.deliveryTime}</span>
                    </div>
                    <div className="text-lg font-bold text-amber-600">
                      {service.price}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">View details</span>
                  <FaArrowRight className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Service Detail View */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="p-8">
              <button
                onClick={() => setSelectedService(null)}
                className="flex items-center text-amber-600 mb-6 hover:text-amber-700 transition-colors"
              >
                <FaArrowRight className="rotate-180 mr-2" />
                Back to services
              </button>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-amber-100 p-6 rounded-xl mb-6">
                    <FiTruck className="text-amber-600 text-4xl mx-auto" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FiClock className="text-gray-500 mr-3" />
                      <span className="text-gray-700">{selectedService.deliveryTime} delivery</span>
                    </div>
                    <div className="flex items-center">
                      <FiDollarSign className="text-gray-500 mr-3" />
                      <span className="text-gray-700">{selectedService.price}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="text-gray-500 mr-3" />
                      <span className="text-gray-700">
                        {selectedService.category === 'international' 
                          ? 'Worldwide coverage' 
                          : 'City-wide coverage'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedService.title}</h2>
                  <p className="text-gray-600 mb-6">{selectedService.description}</p>

                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3">Service Features</h3>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                      Book Now
                    </button>
                    <button className="border border-amber-500 text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium transition-colors">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        {!selectedService && (
          <div className="mt-16 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-8 text-center text-black">
            <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              We offer tailored delivery services for businesses and special requirements.
            </p>
            <button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
              Request a Quote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;