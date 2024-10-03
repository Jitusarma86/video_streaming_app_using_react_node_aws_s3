import { Outlet } from "react-router-dom"
import { Header, Foter } from "./pages"
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Foter />
    </>
  )
}

export default App
