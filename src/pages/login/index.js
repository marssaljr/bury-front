import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Button, Input, InputLabel, Paper } from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const history = useNavigate()
    const { signIn, loading, setSigned} = useContext(AuthContext)

    async function handleSubmit(e) {
        setError(null)
        e.preventDefault()
        if (!username || !password) {
            setError('Preencha todos os campos!')
            return
        }
        const logged = await signIn(username, password)
        setSigned(logged)
        history('/login')  
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
                <Button fullWidth variant="contained" onClick={(e) => handleSubmit(e)}>Entrar</Button>
                <div className="text-sm">Não tem uma conta? <button onClick={() => history('/register')} className="text-sky-700">Cadastre-se</button></div>
                        {loading? <CircularProgress style={{margin: '0 auto'}} disableShrink /> : null}              
                        </div>
            </form>        
        </Paper>
        </Container>
    )
    }

export default Login