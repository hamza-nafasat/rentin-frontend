import React from 'react';

export default function DataState({ isLoading, isError, error, data = [], renderItem }) {
  return (
    <>
      {isLoading ? (
        // Loading skeleton
        Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[255px] w-full animate-pulse rounded-lg bg-gray-200"></div>
        ))
      ) : isError ? (
        // Error state
        <div className="col-span-full flex h-64 items-center justify-center rounded-lg bg-red-50">
          <div className="text-center">
            <p className="text-red-600">Failed to load properties</p>
            <p className="text-sm text-red-500">{error?.data?.message || 'Something went wrong'}</p>
          </div>
        </div>
      ) : data.length === 0 ? (
        // Empty state
        <div className="col-span-full flex h-64 items-center justify-center rounded-lg bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600">No properties found</p>
            <p className="text-sm text-gray-500">You haven't added any properties yet</p>
          </div>
        </div>
      ) : (
        // Render properties
        data.map(renderItem)
      )}
    </>
  );
}
