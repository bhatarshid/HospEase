import { Calendar, Clock, Medal, Phone, MapPin, DollarSign, Star } from 'lucide-react';

const ServiceDetailsPage = () => {
  const serviceData = {
    service_name: "Radiology",
    description: "Offers comprehensive imaging services including X-rays, MRI, and CT scans. Our department is equipped with state-of-the-art imaging technology and experienced specialists.",
    features: [
      "Advanced MRI Technology", "3D CT Scanning", "Digital X-Ray Imaging", "Nuclear Medicine", "Ultrasound Services"
    ],
    doctors: [
      {
        firstname: "Sarah",
        lastname: "Johnson",
        specialization: "Diagnostic Radiology",
        experience: "15 years",
        phone_no: "+1 (555) 123-4567",
        department: "Radiology",
        rating: 4.9,
        reviews: 128,
        timeslots: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
        cost: 250
      },
      {
        firstname: "Michael",
        lastname: "Chen",
        specialization: "Interventional Radiology",
        experience: "12 years",
        phone_no: "+1 (555) 987-6543",
        department: "Radiology",
        rating: 4.8,
        reviews: 93,
        timeslots: ["11:00 AM", "1:00 PM", "4:00 PM"],
        cost: 275
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative bg-primary text-white">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/radiology.jpg" 
            alt="Radiology Department"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-10">{serviceData.service_name}</h1>
          <p className="max-w-3xl text-lg opacity-90">{serviceData.description}</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="/mri.jpg" 
              alt="Modern MRI Machine"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-white text-xl font-semibold">State-of-the-art Equipment</h3>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <ul className="grid grid-cols-1 gap-3">
              {serviceData.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Doctors Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Our Specialists</h2>
        <div className="space-y-6">
          {serviceData.doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Doctor Image Column */}
                <div className="lg:col-span-3 relative">
                  <img 
                    src="/api/placeholder/300/400" 
                    alt={`Dr. ${doctor.firstname} ${doctor.lastname}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Doctor Info Section */}
                <div className="lg:col-span-4 p-6 bg-gray-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Dr. {doctor.firstname} {doctor.lastname}
                  </h3>
                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-700">{doctor.rating}</span>
                    <span className="ml-1 text-gray-500">({doctor.reviews} reviews)</span>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <Medal className="h-4 w-4 mr-2" />
                      <span>{doctor.specialization}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{doctor.phone_no}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>${doctor.cost} per visit</span>
                    </div>
                  </div>
                </div>

                {/* Timeslots Section */}
                <div className="lg:col-span-3 p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {doctor.timeslots.map((slot, slotIndex) => (
                      <button
                        key={slotIndex}
                        className="flex items-center justify-center px-4 py-2 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Section */}
                <div className="lg:col-span-2 p-6 bg-gray-50 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-200">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-3">
                    Book Now
                  </button>
                  <button className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;