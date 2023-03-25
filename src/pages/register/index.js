import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Button, Input, InputLabel, Paper } from '@mui/material';
import { Container } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const history = useNavigate()
    const { signUp, loading, setSigned} = useContext(AuthContext)

    async function handleSubmit(e) {
        setError(null)
        e.preventDefault()        
        // if (!username.match(/^[a-zA-Z0-9_.-]+$/) || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)) {
        if (!username || !password) {
            setError('O usuário deve conter apenas letras, números e os caracteres especiais: . _ - e a senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial')
            return
        }
        const register = await signUp(username, password)
        if (register) history('/register')
    }
    
    return (
        <Container maxWidth="sm" justify="center">
        <Paper className="login">
            <ToastContainer />                
            <form className="p-4">
                <div className="gap-2 flex flex-col">
                {error && <Alert severity="error">{error}</Alert>}
                <InputLabel id="username" htmlFor="username">Usuário</InputLabel>
                <Input labelId="username" fullWidth type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <InputLabel id="password" htmlFor="password">Senha</InputLabel>
                <Input labelId="password" fullWidth autoComplete='current-password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button fullWidth variant="contained" onClick={(e) => handleSubmit(e)}>Fazer cadastro</Button>
                <div className="text-sm">Já tem uma conta? entre com ela clicando <button onClick={() => history('/login')} className="text-sky-700">aqui</button></div>
                        {loading? <CircularProgress style={{margin: '0 auto'}} disableShrink /> : null}              
                        </div>
            </form>        
        </Paper>
        </Container>
    )
    }

export default Register