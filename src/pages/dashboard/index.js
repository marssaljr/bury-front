import { CircularProgress, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PixIcon from '@mui/icons-material/Pix';
import Cookies from "js-cookie";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PendingIcon from '@mui/icons-material/Pending';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyIcon from '@mui/icons-material/Key';
import { QrCode, QrCode2 } from '@mui/icons-material';

const Home = ({ user, account, setPage }) => {
    const [visible, setVisible] = useState(true)
    return (
        <Grid container spacing={2} className="gap-2 content-center justify-center pt-20 m-4" columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={6} md={8} className="flex flex-row gap-2"><p className="text-gray-500 text-xl ml-4">Olá,</p><p className="text-green-400 text-xl">{user?.first_name ? user.first_name.charAt(0).toUpperCase() + user.first_name.toLowerCase().slice(1) : 'Usuário'}</p>
            </Grid>
            <Grid item className="items-center justify-center shadow-sm p-4 rounded-sm flex-row flex bg-white gap-2" xs={6} md={4}>
                <AttachMoneyIcon sx={{ fontSize: '40px' }} className="text-green-400" /><Typography className="text-gray-500"> <Typography className="text-gray-400 font-bold" variant="h6">{visible ? account?.account_balance : null}</Typography></Typography>
                {visible ? <VisibilityIcon className="text-green-400" onClick={() => setVisible(!visible)} /> :
                    <VisibilityOffIcon className="text-green-400" onClick={() => setVisible(!visible)} />}
            </Grid>
            <Grid item flexDirection="column" className="flex flex-col items-center shadow-sm p-4 rounded bg-white cursor-pointer" xs={6} md={4} onClick={() => setPage('pix')}>
                <PixIcon sx={{ fontSize: '40px' }} className="text-green-400" /><Typography className="text-gray-500"> Pix e Transferências</Typography>
            </Grid>
            <Grid item flexDirection="column" className="flex flex-col items-center shadow-sm p-4 rounded  bg-white" xs={6} md={4}>
                <QrCodeScannerIcon sx={{ fontSize: '40px' }} className="text-green-400" /><Typography className="text-gray-500"> Pagamentos e Recargas</Typography>
            </Grid>
            <Grid item flexDirection="column" className="flex flex-col items-center shadow-sm p-4 rounded  bg-white" xs={6} md={4}>
                <CreditCardIcon sx={{ fontSize: '40px' }} className="text-green-400" /><Typography className="text-gray-500"> Cartão de Crédito</Typography>
            </Grid>
            <Grid item flexDirection="column" className="flex flex-col items-center shadow-sm p-4 rounded  bg-white" xs={6} md={4}>
                <WaterfallChartIcon sx={{ fontSize: '40px' }} className="text-green-400" /><Typography className="text-gray-500"> Investimentos</Typography>
            </Grid>
            <Grid item flexDirection="column" className="flex flex-col items-center shadow-sm p-4 rounded  bg-white" xs={6} md={4}>
                <CurrencyExchangeIcon sx={{ fontSize: '40px' }} className="text-green-400" /><Typography className="text-gray-500"> Empréstimos e Financiamentos</Typography>
            </Grid>
            <Grid item flexDirection="column" className="flex flex-col items-center shadow-sm p-4 rounded  bg-white" xs={6} md={4}>
                <PendingIcon sx={{ fontSize: '40px' }} className="text-green-400" /><Typography className="text-gray-500"> Outros serviços</Typography>
            </Grid>
        </Grid>
    )
}

const Pix = ({ user, account, setPage }) => {
    const [transfer, setTransfer] = useState(false)
    const [receiver, setReceiver] = useState(false)
    const [choosed, setChoosed] = useState(false)
    const handleChoose = (setFun) => {
        setFun(true)
        setChoosed(!choosed)
    }
    const handleTransfer = () => {
        setTransfer(!transfer)
        setChoosed(!choosed)
    }
    const handleReceiver = () => {
        setReceiver(!receiver)
        setChoosed(!choosed)
    }
    return (
        <>
            {!choosed && (
                <>
                    <div className="flex flex-col justify-center items-center p-5 gap-4 ">
                        <div className="flex flex-row gap-2 rounded shadow-sm p-8 text-lg bg-white w-80 justify-between items-center" onClick={() => handleTransfer()}>
                            <div className="flex flex-row gap-2"><PriceCheckIcon className="text-green-400" /><p className="text-gray-400 font-bold">Pagar</p></div>
                            <ArrowForwardIosIcon className="text-green-400" />
                        </div>
                        <div className="flex flex-row gap-2 rounded shadow-sm p-8 text-lg bg-white w-80 justify-between items-center" onClick={() => handleReceiver()}>
                            <div className="flex flex-row gap-2"><QrCodeScannerIcon className="text-green-400" /><p className="text-gray-400 font-bold">Receber</p></div>
                            <ArrowForwardIosIcon className="text-green-400" />
                        </div>
                    </div>
                    <div>
                        <Typography className="text-gray-500 text-center">Mais Ações</Typography>
                        <div className="flex flex-row justify-center items-center p-5 gap-4 content-center">
                            <div className="flex items-center flex-col bg-white p-4"><div className="bg-green-100 text-green-800 rounded-full p-4" style={{ fontSize: '16px' }}><KeyIcon className="bg-green-100 text-green-400 rounded-full text-4x1 w-50" /></div><Typography className="text-gray-400">Minhas chaves</Typography></div>
                            <div className="flex items-center flex-col bg-white p-4"><div className="bg-green-100 text-green-800 rounded-full p-4" style={{ fontSize: '16px' }}><SummarizeIcon className="bg-green-100 text-green-400 rounded-full text-4x1 w-50" /></div><Typography className="text-gray-400">Extrato e devoluções</Typography></div>
                            <div className="flex items-center flex-col bg-white p-4"><div className="bg-green-100 text-green-800 rounded-full p-4" style={{ fontSize: '16px' }}><FavoriteBorderIcon className="bg-green-100 text-green-400 rounded-full text-4x1 w-50" /></div><Typography className="text-gray-400">Meus favoritos</Typography></div>
                        </div>
                    </div>
                </>
            )}
            {transfer && (
                <>
                    <div className="flex flex-col justify-center items-center p-5 gap-2 max-w-lg" style={{ margin: '0 auto' }}>
                        <div className="title">
                            <p className="text-green-400 font-bold text-2xl">Pagar com chave</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor='pix_key' className="text-gray-500">Chave</label>
                            <input id='pix_key' className="bg-gray-200 text-gray-800 p-2 font-bold rounded-md focus-visible:border-green-400 focus:outline-none border-2" placeholder="CPF, CNPJ, celular,e-mail ou aleatória" />
                        </div>
                        <div className="flex flex-row gap-2 w-full">
                            <FavoriteBorderIcon className="text-green-300" />
                            <label htmlFor='pix_key' className="text-gray-400">Meus favoritos</label><ArrowForwardIosIcon className="text-green-300" />
                        </div>
                        <button className="bg-green-400 p-2 text-gray-600 rounded-md justify-center w-full font-bold">Continuar</button>
                        <button className="bg-gray-200 p-2 text-gray-600 rounded-md justify-center w-full font-bold" onClick={() => handleTransfer()}>Voltar</button>
                        {account?.transactions?.type['pix']?.recents.length > 0 && (
                            <div className="w-full flex flex-col">
                                <p className="font-bold text-gray-400">Recentes</p>
                                {account?.transactions?.type['pix']?.recents.map((recent) => {
                                    <div></div>
                                })}
                            </div>
                        )}
                    </div>

                </>
            )}
            {receiver && (
                <>
                    <div className="flex flex-col justify-center items-center p-5 gap-2 max-w-lg" style={{ margin: '0 auto' }}>
                        <div className="title">
                            <p className="text-green-400 font-bold text-2xl">Receber Pix</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <p>Mostre ou compartilhe o
                                QR Code sem valor definido</p>
                        </div>
                        <QrCode2 className="text-green-300 text-9xl" fontSize="120" />
                        <div className="flex flex-row gap-2 w-full items-center justify-center">
                            <div className="font-bold">Chave aleatória</div>
                            <p>teste</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-2 mb-2">
                            <p className="text-green-400 p-2 w-full rounded-md bg-green-400">Compartilhar</p>
                            <button className=' p-2 text-gray-400 rounded-md w-full bg-white'>mudar chave</button>
                        </div>
                        <div className='flex flex-row gap-2 rounded shadow-sm p-4 text-sm bg-white w-96 justify-between items-center'>
                            <QrCode2 className="text-green-300" />
                            <div><p>Criar QR Code personalizado</p><p>Defina o valor, chave e mensagem</p></div>
                            <ArrowForwardIosIcon className="text-green-300" />
                        </div>
                        <button className="bg-gray-200 p-2 text-gray-600 rounded-md justify-center w-full font-bold" onClick={() => handleReceiver()}>Voltar</button>
                        {account?.transactions?.type['pix']?.recents.length > 0 && (
                            <div className="w-full flex flex-col">
                                <p className="font-bold text-gray-400">Recentes</p>
                                {account?.transactions?.type['pix']?.recents.map((recent) => {
                                    <div></div>
                                })}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>)
}

const Dashboard = () => {
    const { loading, setSigned, getUser, user, account } = useContext(AuthContext)
    const [page, setPage] = useState('home')

    const pages = {
        home: <Home user={user} account={account} setPage={setPage} />,
        pix: <Pix user={user} account={account} setPage={setPage} />
    }

    const doLogout = () => {
        Cookies.remove("session")
        Cookies.remove("refresh")
        setSigned(false)
    }

    useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return loading ?
        (
            <div className="top-[50%] bottom-[50%] absolute left-[50%] right-[50%]" style={{ margin: '0 auto' }}>
                <CircularProgress className="text-green-400" disableShrink />
            </div>
        ) : (
            <div className="h-[100vh]">
                {console.log(user, account)}
                <div className="header h-24 bg-white p-2">
                    <div className="flex flex-row justify-between p-4 items-center text-gray-500">
                        <div className="flex" onClick={() => setPage('home')}><h4 className="text-green-600 font-bold text-4xl bg-green-100 rounded-b-full">Bury</h4><h4 className="font-sans font-thin text-green-500 rounded-r-full">Bank</h4></div>
                        <div><button className="bg-green-400 rounded-xl px-8 py-2" onClick={() => doLogout()}><Typography className="text-white font-extrabold">Sair </Typography></button></div>
                    </div>
                </div>
                <div className="p-16 h-[100vh] bg-slate-100">
                    {pages[page]}
                </div>
                {/* <Grid container spacing={2} className="gap-2 bg-green-700 w-max p-4 justify-center bottom-0 content-end items-center flex h-[40vh]">
                    <Grid item xs={4} className="rounded shadow-sm bg-white text-gray-500 flex justify-center gap-4 p-4 whitespace-pre-wrap flex-wrap text-xl items-center"><LocalMallIcon sx={{ fontSize: '40px' }} className="text-green-500" /><div className="flex flex-row "><Typography className="text-gray-500 font-bold">Bury</Typography><Typography className="text-green-400">Shop</Typography></div></Grid>
                    <Grid item xs={4} className="rounded shadow-sm bg-white text-gray-500 flex justify-around p-4 whitespace-pre-wrap flex-wrap text-xl items-center"><QuestionAnswerIcon sx={{ fontSize: '40px' }} className="text-green-500" /><Typography className="text-xl">Precisa de ajuda? Tire suas dúvidas e acompanhe seus chamados.</Typography></Grid>
                </Grid> */}
            </div>
        )
    // (<>
    // TESTE</>)
}


export default Dashboard