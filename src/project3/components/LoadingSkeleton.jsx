import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="skeleton h-8 w-32"></div>
            <div className="flex-1 max-w-md">
              <div className="skeleton h-10 w-full rounded-lg"></div>
            </div>
            <div className="skeleton h-10 w-10 rounded-lg lg:hidden"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg p-4 space-y-4">
              <div className="skeleton h-6 w-20"></div>
              <div className="skeleton h-10 w-full"></div>
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-24 w-full"></div>
              <div className="skeleton h-10 w-full"></div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div className="skeleton h-4 w-48"></div>
              <div className="skeleton h-8 w-32"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="skeleton h-48 w-full"></div>
                  <div className="p-2 space-y-2">
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-3 w-full"></div>
                    <div className="flex justify-between items-center">
                      <div className="skeleton h-4 w-16"></div>
                      <div className="skeleton h-4 w-12"></div>
                    </div>
                    <div className="skeleton h-8 w-full rounded mt-1"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-8">
              <div className="skeleton h-10 w-20"></div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton h-10 w-10"></div>
                ))}
              </div>
              <div className="skeleton h-10 w-20"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;