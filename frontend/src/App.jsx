import { Box } from "@chakra-ui/react"

import {Routes,Route} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import CreaePage from "./pages/CreaePage"
import Navbar from "./components/Navbar"


function App() {
  

  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="create" element={<CreaePage />} />
      </Routes>
    </Box>
  )
}

export default App
