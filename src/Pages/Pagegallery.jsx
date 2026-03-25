import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useGetProductsByCategoryQuery } from "../API/apiSlice";
import ProductCard from "../components/Ui/ProductCard";

const Pagegallery = () => {
  const { slug } = useParams();
  const [maxPrice, setMaxPrice] = useState(2000);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const skip = (currentPage - 1) * itemsPerPage;

  // Reset page cat change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [slug]);

  const { data, isLoading, isFetching } = useGetProductsByCategoryQuery({
    category: slug,
    limit: itemsPerPage,
    skip: skip,
  });

  if (isLoading)
    return (
      <div className="flex text-4xl justify-center items-center h-64 text-gray-400 font-bold animate-pulse">
        LOADING...
      </div>
    );

  const filteredProducts = data?.products?.filter(
    (product) => product.price <= maxPrice,
  );

  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // current range
  const showingFrom = skip + 1;
  const showingTo = Math.min(skip + (data?.products?.length || 0), totalItems);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-6 md:py-10 px-4">
        {/* Header Section */}
        <div className="mb-8  md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter border-l-8 border-blue-600 pl-4 mt-2 leading-none">
              {slug.replace("-", " ")}
            </h2>
            {/* Showing X of Y Products*/}
            <p className="mt-3 text-sm font-bold text-gray-400 uppercase tracking-widest">
              Showing{" "}
              <span className="text-gray-900">
                {showingFrom}-{showingTo}
              </span>{" "}
              of <span className="text-gray-900">{totalItems}</span> Products
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/*Price Filter  starts*/}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 p-6 bg-gray-50 rounded-4xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">
                  Filter
                </h3>
                <span className="text-blue-600 font-black text-xl">
                  ${maxPrice}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mt-2">
                <span>$0</span>
                <span>$2000</span>
              </div>
            </div>
          </aside>
          {/*Price Filter  Ends*/}

          {/* MAIN CONTENT Start */}
          <main
            className={`flex-1 transition-opacity duration-300 ${isFetching ? "opacity-30" : "opacity-100"}`}
          >
            {filteredProducts?.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      image={product.thumbnail}
                      title={product.title}
                      currentPrice={`$${product.price}`}
                      OldPrice={`$${(product.price + 20).toFixed(2)}`}
                      save={`${product.discountPercentage}% OFF`}
                      btntext="Add"
                    />
                  ))}
                </div>

                {/* --- RESPONSIVE PAGINATION --- */}
                <div className="mt-12 mb-2 flex flex-col items-center gap-6 border-t border-gray-100 pt-10">
                  <div className="flex items-center gap-3">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage((prev) => prev - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="h-12 cursor-pointer px-6 rounded-2xl bg-brand text-white font-bold text-xs uppercase disabled:opacity-70   flex items-center"
                    >
                      Prev
                    </button>

                    {/* Pc Page Numbers */}
                    <div className="hidden md:flex items-center gap-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentPage(index + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-12 h-12 cursor-pointer rounded-2xl font-black text-xs transition-all ${
                            currentPage === index + 1
                              ? "bg-blue-600 text-white shadow-xl shadow-blue-100"
                              : "bg-gray-50 text-gray-400 hover:bg-gray-200"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    {/* Mobile Page Indicator */}
                    <div className="md:hidden font-black text-sm px-4 py-2 bg-gray-100 rounded-xl">
                      {currentPage} / {totalPages}
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage((prev) => prev + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="h-12 cursor-pointer px-6 rounded-2xl bg-brand text-white font-bold text-xs uppercase disabled:opacity-70   flex items-center"
                    >
                      Next
                    </button>
                  </div>

                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                    End of Results
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 mx-2">
                <p className="text-gray-400 font-black uppercase text-xs tracking-widest">
                  No matches found for this budget
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Pagegallery;
