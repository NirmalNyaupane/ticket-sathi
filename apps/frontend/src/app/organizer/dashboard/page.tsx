const OrganizerDashboard = () => {
  return (
    <div className="space-y-4 w-full">
      {
        Array(40).fill(0).map((_, index) => {
          return <div key={(index+19)*38} className="border-2"> oijeoij </div>
        })
      }
    </div>
  )
}

export default OrganizerDashboard