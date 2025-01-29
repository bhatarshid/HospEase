import SkeletonCard from "@/Components/SkeletonCard"

interface FeaturesGridProps {
  features: string[]
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="mb-12">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-semibold mb-6 text-indigo-800">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 font-medium">{feature}</p>
            </div>
          )) || (
            <div className="col-span-2 text-center text-gray-500">
              <SkeletonCard />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

