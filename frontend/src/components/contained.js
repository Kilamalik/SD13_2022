import React from 'react';
import Login from './auth/Login'

const contained = () => {
  return (
    <section className="container">
        <Route exact path='/login' element={<Login />} />
    </section>
  )
}

export default contained