import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact CourierX</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help with all your shipping and delivery questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <FiMail className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 mb-2">Our team will get back to you within 24 hours</p>
                  <a href="mailto:support@courierx.com" className="text-amber-600 hover:text-amber-700 font-medium">
                    support@courierx.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FiPhone className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600 mb-2">Sunday-Thursday from 9am to 6pm</p>
                  <a href="tel:+8801912345678" className="text-blue-600 hover:text-blue-700 font-medium">
                    +880 1912 345678
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FiMapPin className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-gray-600 mb-2">Our headquarters in Dhaka</p>
                  <address className="not-italic text-gray-800">
                    123 Shipping Street<br />
                    Gulshan-1, Dhaka 1212<br />
                    Bangladesh
                  </address>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full text-blue-600 transition-colors">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-sky-100 p-3 rounded-full text-sky-500 transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-pink-100 p-3 rounded-full text-pink-600 transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full text-blue-700 transition-colors">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <FiCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-medium text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-600">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="+880 1912 345678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="delivery">Delivery Inquiry</option>
                    <option value="tracking">Tracking Issue</option>
                    <option value="business">Business Services</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${
                      isSubmitting ? 'bg-amber-400' : 'bg-amber-600 hover:bg-amber-700'
                    }`}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Map Section - Bangladesh */}
        <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <iframe
            title="CourierX Bangladesh Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.793849807354!2d90.40627231543178!3d23.79055739322363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70b72f1b8b1%3A0xfc87a1bc6699ed26!2sGulshan%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-xl"
          ></iframe>
        </div>

        {/* FAQ CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-8 text-center text-black">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Check out our FAQ section for quick answers to common questions about our services.
          </p>
          <button className="bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium shadow-md transition-colors">
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;