import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const history = useNavigate()
    return (<>
    <div className="align-center items-center flex flex-col justify-center justify-items-center justify-self-center h-[100vh]">
        <Button variant="contained" onClick={() => history('/login') }>Entrar</Button>
    </div>
    </>)
}

export default Home