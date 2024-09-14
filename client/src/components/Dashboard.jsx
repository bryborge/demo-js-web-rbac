const Dashboard = () => {
  return (
    <div>
      <h2>Welcome, { localStorage.getItem('user') }</h2>
    </div>
  )
}

export default Dashboard;
