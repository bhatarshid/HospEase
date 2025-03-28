import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog"
import { AppointmentDetails } from "@/types/entities/service-types"
import { Calendar, User, Stethoscope } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { cancelAppointment } from "@/redux/features/appointment-slice"
import { toast } from "react-toastify"

interface AppointmentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: AppointmentDetails | null
}

const AppointmentDetailsModal = ({ isOpen, onClose, appointment }: AppointmentDetailsModalProps) => {
  if (!appointment) return null
  const dispatch = useDispatch<AppDispatch>();

  const handleCancelAppointment = async () => {
    try {
      await dispatch(cancelAppointment(appointment.id)).unwrap();
      toast.success("Appointment cancelled successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to cancel appointment");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Appointment Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {/* Doctor Information */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Doctor Information
            </h3>
            <div className="ml-7">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24 border-2 border-gray-200">
                  <AvatarImage
                    src={appointment.doctorPicture ? URL.createObjectURL(new Blob([appointment.doctorPicture])) : undefined}
                    alt={`${appointment.doctorFirstName} ${appointment.doctorLastName}`}
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-medium">
                    {appointment.doctorFirstName[0]}{appointment.doctorLastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Name:</span> {appointment.doctorFirstName} {appointment.doctorLastName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Specialization:</span> {appointment.doctorSpecialization}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              Service Information
            </h3>
            <div className="ml-7 space-y-1">
              <p className="text-gray-700">
                <span className="font-medium">Service:</span> {appointment.serviceName}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Cost:</span> ${appointment.cost}
              </p>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Appointment Details
            </h3>
            <div className="ml-7 space-y-1">
              <p className="text-gray-700">
                <span className="font-medium">Date:</span> {formatDate(appointment.appointmentDate)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Time:</span> {formatTime(appointment.appointmentDate)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Status:</span>{" "}
                <span className={`font-medium ${
                  appointment.status === "PENDING" ? "text-blue-600" :
                  appointment.status === "COMPLETED" ? "text-green-600" :
                  "text-red-600"
                }`}>
                  {appointment.status === "CANCELLED" ? "Cancelled" : 
                    appointment.status.charAt(0) + appointment.status.slice(1).toLowerCase()
                  }
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Reason:</span> {appointment.reason}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {appointment.status === "PENDING" && (
            <div className="flex justify-end pt-4">
              <Button
                variant="destructive"
                onClick={handleCancelAppointment}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Cancel Appointment
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AppointmentDetailsModal 