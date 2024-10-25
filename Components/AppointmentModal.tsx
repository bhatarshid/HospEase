import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form } from "@/Components/ui/form";
import { Label } from "@/components/ui/label"
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Button } from "./ui/button";
import SubmitButton from "./SubmitButton";
import { useEffect, useState } from "react";
import { formatDate, formatTimeSlot } from "@/lib/utils";
import { ServiceDoctorDetails } from "@/types/entities/service-types";


export const AppointmentModal = ({
  isOpen, 
  onClose,
  doctorData
}: {
  isOpen: boolean,
  onClose: () => void,
  doctorData: ServiceDoctorDetails,
}) => { 
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  
  const form = useForm({
    defaultValues: {
      selectedDate: '',
      selectedTime: '',
      reason: ''
    }
  })

  useEffect(() => {
    if(doctorData?.slots) {
      const dates = Object.keys(doctorData.slots);
      setAvailableDates(dates);
    }
  }, [doctorData])

  const handleDateChange = (date: string) => {
    form.setValue('selectedDate', date);
    form.setValue('selectedTime', '');

    const timeSlots = doctorData.slots[date];
    setAvailableTimeSlots(timeSlots);
  }

  const onSubmit = async (data: any) => {
    console.log(data)
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-backgroundColor">
        <DialogHeader className="mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <DialogTitle>Book Appointment</DialogTitle>
            </div>
            <div className="text-lg font-semibold text-blue-600">${doctorData?.cost}</div>
          </div>
          <DialogDescription>
            Appointment with Dr. {doctorData?.firstName} {doctorData?.lastName}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4 text-[#8f8e8e] ">
            <div>
              <Label className="shad-input-label">Patient Name</Label>
              <p className="mt-1 text-dark1 bg-[#ebe9e9] p-2 border rounded-[6px] font-normal">
                FirstName LastName
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="shad-input-label">Date</Label>
                <Select
                  onValueChange={handleDateChange}
                  value={form.watch('selectedDate')}
                >
                  <SelectTrigger className="w-full bg-[#ebe9e9] rounded-[6px]">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {availableDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {formatDate(date)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="shad-input-label">Time</Label>
                <Select
                  onValueChange={(time) => form.setValue('selectedTime', time)}
                  value={form.watch('selectedTime')}
                  disabled={!form.watch('selectedDate')}
                >
                  <SelectTrigger className="w-full bg-[#ebe9e9] rounded-[6px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {availableTimeSlots.map((time, index) => (
                      <SelectItem key={index} value={time}>
                        {formatTimeSlot(time)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="reason"
              label="Reason for appointment"
              placeholder="I have cold and fever."
            />

            <div className="flex gap-4 pt-4 w-1/2">
              <SubmitButton isLoading={false}>
                Book Appointment
              </SubmitButton>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 text-dark2 border-dark1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}