import React, { useEffect } from 'react'
import { userServices } from '@/lib/services/userServices'

export const UsersAdminPage = () => {

  useEffect(() => {
    userServices.getSomeUsers(100);
  }, [])


  return (
    <div>UsersAdminPage</div>
  )
}
