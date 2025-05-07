import { FiAward, FiTruck, FiUsers, FiGlobe, FiBarChart2 } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const AboutUp = () => {
  const stats = [
    { value: "10M+", label: "Packages Delivered", icon: <FiTruck className="text-3xl" /> },
    { value: "500+", label: "Dedicated Couriers", icon: <FiUsers className="text-3xl" /> },
    { value: "95%", label: "On-Time Rate", icon: <FiBarChart2 className="text-3xl" /> },
    { value: "50+", label: "Cities Served", icon: <FiGlobe className="text-3xl" /> }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Logistics expert with 15 years in the shipping industry",
      image: "https://i.ibb.co.com/S7rNYs6N/360-F-321511245-l-Vwfaa-Zd-Hx-P8-YGFZaq-Q5-Py-Xei-Px5zwtb.jpg"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech innovator specializing in delivery optimization",
      image: "https://i.ibb.co.com/S7rNYs6N/360-F-321511245-l-Vwfaa-Zd-Hx-P8-YGFZaq-Q5-Py-Xei-Px5zwtb.jpg"
    },
    {
      name: "Emma Rodriguez",
      role: "Operations Director",
      bio: "Supply chain management professional",
      image: "https://i.ibb.co.com/S7rNYs6N/360-F-321511245-l-Vwfaa-Zd-Hx-P8-YGFZaq-Q5-Py-Xei-Px5zwtb.jpg"
    },
    {
      name: "David Kim",
      role: "Customer Experience",
      bio: "Client relations specialist",
      image: "https://i.ibb.co.com/S7rNYs6N/360-F-321511245-l-Vwfaa-Zd-Hx-P8-YGFZaq-Q5-Py-Xei-Px5zwtb.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-6 pt-6 px-6 lg:px-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-400 to-amber-500 py-20 px-4 sm:px-6 lg:px-8 text-center text-white rounded-2xl ">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Delivering More Than Just Packages</h1>
          <p className="text-xl md:text-2xl mb-8">
            We're building connections through reliable, innovative shipping solutions
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium shadow-md transition-colors">
              Our Services
            </button>
            <button className="border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">
              Join Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2015, CourierX began as a small local delivery service in San Francisco. 
              Frustrated by the lack of reliable same-day delivery options, our founder set out to 
              create a customer-first shipping experience.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Today, we've grown into a national leader in logistics technology while maintaining 
              our commitment to personalized service. Our secret? Treating every package like it's 
              our own.
            </p>
            <div className="flex items-center bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
              <FiAward className="text-amber-600 text-2xl mr-4" />
              <span className="font-medium text-gray-800">
                Voted "Most Reliable Courier" by Shipping Times 3 years running
              </span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://i.ibb.co.com/wNp05B4T/Choosing-the-right-business-courier-service-1280x720.jpg" 
              alt="Courier team working"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">By The Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="text-amber-500 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Meet The Team</h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          The passionate people behind our delivery excellence
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                    <FaTwitter />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-800 transition-colors">
                    <FaFacebook />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">
                We deliver on our promises, every time. Our 95% on-time rate speaks for itself.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving our technology to make shipping simpler and smarter.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Supporting local businesses and giving back to the neighborhoods we serve.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 py-16 text-center rounded-2xl text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Better Delivery?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers who trust us with their shipments
          </p>
          <button className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg shadow-xl transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUp;