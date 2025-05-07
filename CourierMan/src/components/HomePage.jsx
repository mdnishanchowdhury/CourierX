import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen px-3 lg:px-12 pt-6">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white py-[220px] px-6 text-center rounded-2xl"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/qMTDvxXJ/man.jpg)", // Fixed the typo in .com
        }}
      >
        <div className="">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to CourierMan
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Your trusted courier service for fast, safe, and reliable deliveries across BD.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <button className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-blue-100 transition">
                Login
              </button>
            </Link>
            <Link to="/apply">
              <button className="bg-transparent border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition">
                Apply
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose CourierMan?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Speedy Delivery
            </h3>
            <p>We ensure same-day or next-day delivery across Korea.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Real-time Tracking
            </h3>
            <p>Know exactly where your parcel is, anytime.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Affordable Pricing
            </h3>
            <p>Competitive rates for local and international shipping.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=" py-12 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Ready to send your parcel?
        </h3>
        <Link to="/login">
          <button className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition">
            Start Shipping
          </button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
