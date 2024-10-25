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


export const AppointmentModal = ({
  isOpen, 
  onClose,
  doctorData
}: {
  isOpen: boolean,
  onClose: () => void,
  doctorData: {
    firstName: string,
    lastName: string,
    cost: string
  }  | null,
}) => { 

  const form = useForm({
    defaultValues: {

    }
  })

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
              <div className="">
                <Label className="shad-input-label">Date</Label>
                <p>this is it</p>
              </div>
              <div className="">
                <Label className="shad-input-label">Time</Label>
                <p>this is it</p>
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