/**
 * @baseurl:Permite usar de la variable .env la conexion para el backend de forma centralizada y el localhost
 * es solo para tomar como valor por defecto o fallback
 */
const config = {
  baseUrl: import.meta.env.VITE_API_BASE_URL 
};


export default config;
