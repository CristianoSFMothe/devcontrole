import DashboardHeader from "./components/header"

const DashboardLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  )
}

export default DashboardLayout;