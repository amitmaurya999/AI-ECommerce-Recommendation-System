import { Heart, Star } from "lucide-react";

const RecommendationCard = ({ product }) => {

    return (

        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

            <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover"
            />

            <div className="p-4">

                <h2 className="text-lg font-bold">

                    {product.name}

                </h2>

                <p className="text-gray-500">

                    {product.category}

                </p>

                <div className="flex items-center mt-2">

                    <Star
                        fill="gold"
                        color="gold"
                        size={18}
                    />

                    <span className="ml-2">

                        {product.rating}

                    </span>

                </div>

                <div className="flex justify-between items-center mt-6">

                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">

                        View Details

                    </button>

                    <Heart
                        className="cursor-pointer hover:text-red-500"
                        color="red"
                    />

                </div>

            </div>

        </div>

    );

};

export default RecommendationCard;