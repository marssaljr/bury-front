import { Card, CircularProgress, Paper, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Cookies from "js-cookie";

const Dashboard = () => {
    const {loading, setSigned} = useContext(AuthContext)
    const [visible, setVisible] = useState(true)
    const doLogout = () => {
        Cookies.remove("session")
        Cookies.remove("refresh")
        setSigned(false)
    }
    return loading? 
    (
    <CircularProgress style={{margin: '0 auto'}} disableShrink />
    ) :  (
        <>
            <div className="header">
                <div className="flex flex-row justify-between p-4 items-center text-gray-500">
                    <div className="flex"><h4 className="text-green-600 font-serif font-thin text-4xl bg-green-100 rounded-">Bury</h4><h4 className="text-white font-sans font-thin text-4xl bg-slate-900 rounded-">Bank</h4></div>
                <div className="flex flex-col"> 
                    <div>
                    <Typography >Saldo </Typography>
                    </div>
                    <div>
                    <Typography className="text-green-400 font-bold" variant="h5">{visible? 'R$ 1.000.000.000,00': null} <p className="text-gray-600">{visible? <VisibilityIcon onClick={() =>  setVisible(!visible)}/>: 
                            <VisibilityOffIcon onClick={() => setVisible(!visible)} /> }</p></Typography>
                    <div className="hidde">
                            
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-2">
                    <div className="bg-[#bebebe] h-16 w-16 rounded-full border-4 border-green-400"></div>
                    <div><Typography>Olá <div className="text-green-400">{'nome'}</div> </Typography></div>
                </div>
                <div><button className="bg-green-400 rounded-xl px-8 py-2" onClick={() => doLogout()}><Typography className="text-white">Sair </Typography></button></div>
                </div>
            </div>
            <Paper className="p-4">
                <Card/>
            </Paper>
        </>
    )
    // (<>
    // TESTE</>)
    }


export default Dashboard