import { RouterProvider } from "react-router-dom"
import { Router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={Router} />
      </InterviewProvider>
    </AuthProvider>
    
  )
}

export default App
