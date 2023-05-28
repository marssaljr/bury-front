import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const history = useNavigate()
    return (<div className="h-[100vh] bg-cover bg-blend-darken" style={{ backgroundPositino: 'center', backgroundImage: `url('https://unsplash.com/photos/hpjSkU2UYSU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8YmFua3xlbnwwfHx8fDE2ODA5NzQ2MjQ&force=true')` }}>
        <div className="navbar p-4 shadow-sm flex flex-row justify-center items-center bg-gray-100" >
            <div></div>
            <div className="flex jutify-between gap-2 items-center font-light">
                <div>
                    <div className="flex"><h4 className="text-green-600 font-bold text-4xl bg-green-100 rounded-b-full shadow-md">Bury</h4><h4 className="font-sans font-thin text-green-500 rounded-r-full">Bank</h4></div>
                </div>
                <div className="flex flex-row justify-between gap-4 items-center text-gray-400">
                    <div><h5>Sobre</h5></div>
                    <div><h5>Descubra</h5></div>
                    <div><h5></h5></div>
                </div>
                <div>
                    <button className="bg-green-500 p-4 text-white rounded-lg font-bold shadow-sm" onClick={() => history('/login')}><h5>Abra sua conta</h5></button>
                </div>
            </div>
            <div></div>
        </div >
        <div className="justify-center flex flex-col items-center h-[80vh] p-8">
            <div className="text-gray-600 align-center flex flex-col justify-center justify-items-center shadow-lg justify-self-center h-[20vh] items-start bg-green-200 bg-opacity-50 rounded-md p-4 bg-blend-darken">
                <h1 className="text-5xl font-bold text-white">Conta digital segura</h1>
                <strong className="text-green-700 text-4xl font-bold">grátis</strong> e livre de taxas</div>
        </div>
    </div >)
}

export default Home