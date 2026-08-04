import categories from "../../data/categories";

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Shop by Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category) => {

            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="bg-slate-100 rounded-xl p-6 flex flex-col items-center hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer shadow-md"
              >
                <Icon size={40} />

                <h3 className="mt-4 font-semibold">
                  {category.name}
                </h3>
              </div>
            );

          })}
        </div>

      </div>
    </section>
  );
};

export default Categories;