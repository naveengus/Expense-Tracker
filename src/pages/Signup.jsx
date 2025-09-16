import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div>
      <h2>Signup Page</h2>
      <form>
        <input type="text" placeholder="Name" /> <br />
        <input type="email" placeholder="Email" /> <br />
        <input type="password" placeholder="Password" /> <br />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div >
  )
}

export default Signup
