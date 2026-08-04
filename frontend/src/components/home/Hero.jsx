import React from 'react'

const Hero = () => {
  return (
    <section className="bg-slate-100 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">


        <div>

          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
            AI Powered Shopping
          </span>

          <h1 className="text-5xl font-bold mt-6 leading-tight">

            Discover Your

            <span className="text-blue-600">
              {" "}Perfect Product
            </span>

          </h1>

          <p className="text-gray-600 mt-6 text-lg">

            Get personalized product recommendations using
            Artificial Intelligence, Machine Learning and NLP.

          </p>

          <div className="flex gap-5 mt-8">

            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">

              Shop Now

            </button>

            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition">

              Explore

            </button>

          </div>

        </div>


        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
            alt="Shopping"
            className="rounded-3xl shadow-xl"
          />

        </div>

      </div>
    </section>
  );
};

export default Hero;