import { Card, CardContent } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

const SkeletonCard = () => {
  return (
    <Card className="w-72 md:w-80 lg:w-96 flex-shrink-0 rounded-[6px]">
      <CardContent className="pt-4 space-y-4">
        <Skeleton className="h-5 w-full bg-gray-300" />
        <Skeleton className="h-5 w-2/3 bg-gray-300" />
        <Skeleton className="h-12 w-full bg-gray-300" />
      </CardContent>
    </Card>
  )
}

export default SkeletonCard