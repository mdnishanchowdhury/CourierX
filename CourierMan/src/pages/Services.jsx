import { FaTruck, FaBoxOpen, FaPlane, FaCogs } from "react-icons/fa";

const services = [
  {
    icon: <FaTruck className="text-3xl text-green-600" aria-hidden="true" />,
    title: "Same-Day Delivery",
    description: "Get your parcels delivered on the same day with our fast and efficient service.",
    bg: "bg-green-100",
  },
  {
    icon: <FaBoxOpen className="text-3xl text-yellow-600" aria-hidden="true" />,
    title: "Express Delivery",
    description: "Need it faster? Choose Express Delivery for urgent shipments.",
    bg: "bg-yellow-100",
  },
  {
    icon: <FaPlane className="text-3xl text-blue-600" aria-hidden="true" />,
    title: "International Shipping",
    description: "We offer reliable international shipping to get your parcels worldwide.",
    bg: "bg-blue-100",
  },
  {
    icon: <FaCogs className="text-3xl text-purple-600" aria-hidden="true" />,
    title: "Packaging & Special Handling",
    description: "We provide expert packaging and special handling for fragile or high-value items.",
    bg: "bg-purple-100",
  },
];

const Services = () => {
  return (
    <section className="bg-gray-50 py-12 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Courier Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center group"
            aria-label={service.title}
          >
            <div className={`p-4 ${service.bg} rounded-full w-fit mx-auto mb-5`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
