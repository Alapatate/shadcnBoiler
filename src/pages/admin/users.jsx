import React, { useEffect, useState } from 'react'
import { userServices } from '@/lib/services/userServices'
import { GenderPieChart } from '@/components/custom/genderPieChart'

export const UsersAdminPage = () => {

  const totalUsers = 100;
  const [chartgenderData, setChartgenderData] = useState([])

  useEffect(() => {
    userServices.getSomeUsers(totalUsers).then(data => {
      setChartgenderData([
        { gender: "hommes", users: data.results.filter(user => user.gender === "male").length, fill: "var(--color-hommes)" },
        { gender: "femmes", users: data.results.filter(user => user.gender === "female").length, fill: "var(--color-femmes)" },
      ])
    });
  }, [])

  useEffect(() => {
    console.log(chartgenderData)
  }, [chartgenderData])


  return (
    <div>
      <GenderPieChart chartData={chartgenderData} totalUsers={totalUsers} />
    </div>
  )
}
