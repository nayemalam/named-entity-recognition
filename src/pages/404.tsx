import Link from 'next/link'
import React from 'react'

const Error404 = () => {
  return (
    <div className="error-404">
      <div>
        <h1>404</h1>
        <h1>Page not found</h1>
        <p>
          Uh oh... The page you are trying to access does not exist. It might
          have been moved or deleted.
        </p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </div>
  )
}

export default Error404
