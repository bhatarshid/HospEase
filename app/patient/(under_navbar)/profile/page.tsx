import PatientProfile from "@/Components/patient-dashboard/Profile";

const Profile = () => {
  return (
    <div className="flex h-screen max-h-screen remove-scrollbar container ">
      <div className="sub-container max-w-full flex-1 flex-col py-10">
        <PatientProfile />
      </div>
    </div>
  )
}

export default Profile