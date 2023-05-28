import { useState, useContext, useRef } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [last_name, setLast_name] = useState('')
    const [first_name, setFirst_name] = useState('')
    const formRef = useRef()

    const handleValues = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'email':
                setEmail(value)
                break
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
            case 'last_name':
                setLast_name(value)
                break
            case 'first_name':
                setFirst_name(value)
                break
            default:
                break
        }
    }

    const [error, setError] = useState(null)
    const history = useNavigate()
    const { signUp, loading } = useContext(AuthContext)

    async function handleSubmit(e) {
        setError(null)
        e.preventDefault()
        if (formRef.current.reportValidity() === false) {
            setError('Preencha todos os campos!')
            return
        }
        // if (!username.match(/^[a-zA-Z0-9_.-]+$/) || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)) {
        if (!username || !password || !email || !last_name || !first_name) {
            setError('Preencha todos os campos!')
            return
        }
        if (!username.match(/^[a-zA-Z0-9_.-]+$/)) {
            setError('O usuário deve conter apenas letras, números e os caracteres especiais: . _ -')
            return
        }
        const register = await signUp(username, email, password, first_name, last_name)
        setEmail('')
        setUsername('')
        setPassword('')
        setLast_name('')
        setFirst_name('')
        if (register) history('/login')
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
                        <input className="rounded bg-gray-300 p-2 text-green-600 accent-violet-700 focus-visible:border-green-400 focus:outline-none border-2" required name="username" labelId="username" fullWidth type="text" value={username} onChange={e => handleValues(e)} />

                        <label id="email" required htmlFor="email" className='text-gray-500'>Email</label>
                        <input className="rounded bg-gray-300 p-2 text-green-600 accent-violet-700 focus-visible:border-green-400 focus:outline-none border-2" required name="email" labelId="email" fullWidth type="email" value={email} onChange={e => handleValues(e)} />

                        <label id="first_name" required htmlFor="first_name" className='text-gray-500'>Primeiro Nome</label>
                        <input className="rounded bg-gray-300 p-2 text-green-600 accent-violet-700 focus-visible:border-green-400 focus:outline-none border-2" required name="first_name" labelId="first_name" fullWidth type="text" value={first_name} onChange={e => handleValues(e)} />

                        <label id="last_name" required htmlFor="last_name" className='text-gray-500'>Segundo Nome</label>
                        <input className="rounded bg-gray-300 p-2 text-green-600 accent-violet-700 focus-visible:border-green-400 focus:outline-none border-2" required name="last_name" labelId="last_name" fullWidth type="text" value={last_name} onChange={e => handleValues(e)} />

                        <label id="password" required htmlFor="password" className='text-gray-500'>Senha</label>
                        <input className="rounded bg-gray-300 p-2 text-green-600 accent-violet-700 focus-visible:border-green-400 focus:outline-none border-2" required name="password" labelId="password" fullWidth autoComplete='current-password' type="password" value={password} onChange={e => handleValues(e)} />

                        <button className="bg-green-400 p-2 rounded text-green-800 font-bold" type="submit" onClick={(e) => handleSubmit(e)}>Fazer cadastro</button>
                        <div className="text-sm text-gray-500">Já tem uma conta? entre com ela clicando <button onClick={() => history('/login')} className="text-green-500">aqui</button></div>
                        {loading ? <CircularProgress style={{ margin: '0 auto' }} disableShrink /> : null}
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default Register