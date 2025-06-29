import jwt from 'jsonwebtoken'

export const authToken = (req, res, next) => {
  console.log('authToken middleware ejecutado')

  try {
    const token = req.cookies.token

    if (!token) {
      console.log('No hay token en cookies')
      return res.status(401).json({ error: 'No autorizado. Token ausente.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_KEYWORD)
    req.user = decoded // { userId, email }
    console.log('Token válido:', decoded)

    next()
  } catch (error) {
    console.error('Error al verificar el token:', error.message)
    return res.status(401).json({ error: 'Token inválido o expirado.' })
  }
}
