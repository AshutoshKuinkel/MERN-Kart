import CountCard from "../../components/admin/dashboard/count-card"


const Dashboard = () => {
  return (
    <div>
      <CountCard
        label="category"
        count={10}
      />
      <CountCard
        label="Products"
        count={100}
      /><CountCard
        label="Users"
        count={500}
      />
      <CountCard
        label="Brands"
        count={50}
      />
      <CountCard
        label="Orders"
        count={90}
      />
      <CountCard
        label="Admins"
        count={50}
      />
    </div>
  )
}

export default Dashboard
