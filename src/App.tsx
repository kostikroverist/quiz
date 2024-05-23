import { useState } from 'react'
import './index.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-blue-500">
        <h1 className="text-4xl text-white">Hello, Tailwind CSS!</h1>
      </div>
    </>
  )
}

export default App
 