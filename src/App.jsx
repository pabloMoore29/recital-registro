import { useState} from "react"
import RegistrationForm from "./components/RegistrationForm"
import StudentList from "./components/StudentList"
import Login from "./components/Login";


function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  }

if(!isLogged) {
  return <Login onLogin={() => setIsLogged(true)} />;
}

  
  return (
    <div className="main-page">
      <RegistrationForm onRegisterSuccess={handleRefresh}/>
      <StudentList refresh={handleRefresh}/>
    </div>
  )
}

export default App
