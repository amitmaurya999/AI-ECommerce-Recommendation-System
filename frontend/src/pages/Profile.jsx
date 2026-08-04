import { User, Mail, Phone, MapPin, Edit } from "lucide-react";

const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto pt-24 pb-10">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <div className="w-36 h-36 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={70} className="text-blue-600" />
          </div>

          <div className="flex-1">

            <h1 className="text-3xl font-bold">
              Amit Maurya
            </h1>

            <p className="text-gray-500 mt-2">
              Frontend Developer
            </p>

            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" size={18} />
                amit@gmail.com
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-600" size={18} />
                +91 9876543210
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600" size={18} />
                Lucknow, India
              </div>

            </div>

            <button
              className="mt-8 flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              <Edit size={18} />
              Edit Profile
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;