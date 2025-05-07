function Contact() {
    return (
      <>
      <div className="bg-white py-16 px-6" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions or need help with your parcel? Reach out to the CourierMan team!
          </p>
  
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Contact Information</h3>
              <p className="mb-2"><strong>Phone:</strong> +82 10-1234-5678</p>
              <p className="mb-2"><strong>Email:</strong> support@courierman.kr</p>
              <p><strong>Address:</strong> 123 Courier St, Seoul, South Korea</p>
            </div>
  
            {/* Contact Form (Non-functional example) */}
            <form className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block mb-1 font-medium">Name</label>
                <input type="text" className="w-full px-4 py-2 rounded border" placeholder="Your name" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Email</label>
                <input type="email" className="w-full px-4 py-2 rounded border" placeholder="you@example.com" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Message</label>
                <textarea className="w-full px-4 py-2 rounded border" rows="4" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default Contact;
  