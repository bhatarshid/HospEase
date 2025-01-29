import { getImageSrc } from "@/lib/utils";

interface HeroSectionProps {
  picture: Buffer | null | undefined;
  serviceName: string;
  description: string;
}

export function HeroSection({ picture, serviceName, description }: HeroSectionProps) {
  return (
    <div className="relative bg-primary text-white">
      <div className="absolute inset-0 opacity-30">
        <img
          src={getImageSrc(picture) || "/placeholder.svg"}
          alt={serviceName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-6">{serviceName || "Service Details"}</h1>
        <p className="max-w-3xl text-lg opacity-90">{description || "Loading service description..."}</p>
      </div>
    </div>
  )
}