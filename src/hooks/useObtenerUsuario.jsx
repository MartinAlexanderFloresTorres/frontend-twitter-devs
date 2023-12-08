import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GET_OBTENER_USUARIO_HASH } from '../services/api/usuario';
import useApp from './useApp';

const useObtenerUsuario = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true);
  const [persona, setPersona] = useState(null);

  // USE PARAMS
  const { usuario } = useParams();

  // USE APP
  const { logout } = useApp();

  // USE NAVIGATE
  const navigate = useNavigate();

  // USE EFFECT
  useEffect(() => {
    const obtenerUsuario = async ({ usuario }) => {
      setLoading(true);
      try {
        const { data } = await GET_OBTENER_USUARIO_HASH({ usuario });
        setPersona(data.usuario);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde');

        logout();
        // REDIRECCIONAR
        navigate('/');
      }
      setLoading(false);
    };

    obtenerUsuario({ usuario });
  }, [usuario]);

  const actualizarPersona = (persona) => {
    setPersona(persona);
  };

  return { loading, persona, actualizarPersona };
};

export default useObtenerUsuario;
