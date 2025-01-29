import { Card, CardContent, CardHeader } from "@/Components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"

const reviews = [
  {
    name: "Sarah Johnson",
    avatar: "SJ",
    title: "Great Experience",
    review: "The booking process was seamless and the medical staff was very professional. Highly recommended!",
  },
  {
    name: "Michael Chen",
    avatar: "MC",
    title: "Efficient Service",
    review: "Quick appointments and excellent care. The online platform made everything so convenient.",
  },
  {
    name: "Emily Davis",
    avatar: "ED",
    title: "Professional Care",
    review: "Outstanding medical service. The doctors were knowledgeable and caring. Will definitely return.",
  },
  {
    name: "James Wilson",
    avatar: "JW",
    title: "Excellent Platform",
    review: "User-friendly booking system and great follow-up care. Very satisfied with the service.",
  },
]

export function ReviewsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-500 to-blue-600">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl md:text-4xl">Reviews</h2>
          <p className="max-w-[900px] text-white/80 text-sm md:text-base lg:text-lg">
            See what our patients say about our services
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {reviews.map((review) => (
            <Card key={review.name} className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold">{review.name}</h3>
                    <p className="text-xs md:text-sm text-blue-600">{review.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs md:text-sm text-gray-500">{review.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

