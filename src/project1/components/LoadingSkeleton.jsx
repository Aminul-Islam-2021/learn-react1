import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="sticky top-0 z-10 bg-white border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="skeleton h-8 w-32"></div>
            <div className="flex-1 max-w-md">
              <div className="skeleton h-10 w-full"></div>
            </div>
            <div className="skeleton h-10 w-10 lg:hidden"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-box p-4 space-y-4">
              <div className="skeleton h-6 w-20"></div>
              <div className="skeleton h-10 w-full"></div>
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-24 w-full"></div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div className="skeleton h-4 w-48"></div>
              <div className="skeleton h-8 w-32"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="card bg-white">
                  <div className="skeleton h-48 w-full"></div>
                  <div className="card-body p-3 space-y-2">
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-3 w-full"></div>
                    <div className="flex justify-between">
                      <div className="skeleton h-4 w-16"></div>
                      <div className="skeleton h-4 w-12"></div>
                    </div>
                    <div className="skeleton h-8 w-full"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <div className="skeleton h-10 w-64"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;