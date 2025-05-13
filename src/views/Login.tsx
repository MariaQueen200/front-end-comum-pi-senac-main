import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import api from '../http/api';

interface SnackbarState {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info'; // Torna o tipo opcional
  duration: number;
}

export default function Login() {
  const [email, setEmail] = useState<string>(''); // Tipagem explícita como string
  const [senha, setSenha] = useState<string>(''); // Tipagem explícita como string
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    type: 'success',
    duration: 0,
  });
  const navigate = useNavigate();

  const login = async () => {
    const duration = 10000;
    try {
      const response = await api.post<{
        token: string;
        refreshToken: string;
        message: string;
      }>('/login', {
        email,
        senha,
      });

      const { token, refreshToken, message } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      setSnackbar({
        message: message || 'Sucesso ao logar.',
        type: 'success',
        duration,
      });
      setTimeout(() => {
        navigate('/home');
      }, duration);
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      setSnackbar({
        message:
          axiosError.response?.data?.message || 'Erro ao realizar login.',
        type: 'error',
        duration: 10000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Digite seu email de login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="button"
          onClick={login}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </div>
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        duration={snackbar.duration}
        onClose={() =>
          setSnackbar({ message: '', type: 'success', duration: 0 })
        }
      />
    </div>
  );
}
