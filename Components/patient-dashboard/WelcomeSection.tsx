import { CalendarDays } from "lucide-react"
import { Card, CardContent } from "@/Components/ui/card"
import { Skeleton } from "../ui/skeleton";

interface WelcomeSectionProps {
  userName: string;
  isLoading: boolean;
}

export function WelcomeSection({ userName, isLoading }: WelcomeSectionProps) {
  return (
    <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
      <div className="space-y-2">
        <h1 className="font-semibold text-3xl text-gray-900">
          Welcome, {isLoading ? <Skeleton className="h-6 w-24 inline-block bg-gray-300 rounded-xl" /> : userName || "User"}
        </h1>
        <p className="text-muted-foreground">Hello there! Welcome to our application. How can we assist you today?</p>
      </div>
      <Card className="w-auto rounded-xl">
        <CardContent className="flex items-center space-x-2 p-2 text-blue-600 bg-blue-50">
          <CalendarDays className="h-4 w-4" />
          <p className="font-medium">{new Date().toDateString()}</p>
        </CardContent>
      </Card>
    </section>
  )
}

