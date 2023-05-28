import { useState, useContext, useRef } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const history = useNavigate()
    const [error, setError] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signIn, loading, setSigned } = useContext(AuthContext)
    const formRef = useRef()

    async function handleSubmit(e) {
        setError(null)
        e.preventDefault()
        if (formRef.current.reportValidity() === false) {
            setError('Preencha todos os campos!')
            return
        }
        const logged = await signIn(username, password)
        setSigned(logged)
        history('/login')
    }

    return (
        <div className='flex items-center h-[100vh] justify-center bg-cover' style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505046897119-43365b063295?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=azat-satlykov-XgHZzKdgVKc-unsplash.jpg')` }}>
            <Paper className="login w-[500px] p-12 bg-[rgba(255,255,255,0.9)]">
                <ToastContainer />
                <form className="p-4" ref={formRef}>
                    <div className="flex flex-row justify-center mb-2"><h4 className="text-green-600 font-bold text-4xl bg-green-100 rounded-b-full">Bury</h4><h4 className="font-sans font-thin text-green-500 rounded-r-full">Bank</h4>
                    </div>
                    <div className="gap-2 flex flex-col">
                        {error && <Alert severity="error">{error}</Alert>}
                        <label id="username" required htmlFor="username" className='text-gray-500'>Usuário</label>
                        <input className="rounded bg-gray-300 p-2 text-green-600 accent-violet-700 focus-visible:border-green-400 focus:outline-none border-2" labelId="username" required fullWidth type="text" value={username} placeholder="Usuário" onChange={e => setUsername(e.target.value)} />
                        <label id="password" required htmlFor="password" className='text-gray-500'>Senha</label>
                        <input className="rounded bg-gray-300 p-2 text-green-600 accent-violet-700 focus-visible:border-green-400 focus:outline-none border-2" labelId="password" placeholder="**********" required fullWidth autoComplete='current-password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button className="bg-green-400 p-2 rounded text-green-800 font-bold" type="submit" onClick={(e) => handleSubmit(e)}>Entrar</button>
                        <div className="text-sm text-gray-500">Não tem uma conta? <button onClick={() => history('/register')} className="text-green-500">Cadastre-se</button></div>
                        {loading ? <CircularProgress style={{ margin: '0 auto' }} disableShrink /> : null}
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default Login