import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginPage from "./components/LoginPage"
import LessonPlan from "./components/LessonPlan"
import { ThemeContextProvider } from "./utils/Context"

function App() {
  const pathConfig = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>
    },
    {
      path: "/lessonPlan",
      element: <LessonPlan/>
    }
  ])
  return (
    <ThemeContextProvider>
   <RouterProvider router={pathConfig}/>

    </ThemeContextProvider>

  )
}

export default App