import jwt from 'jsonwebtoken'

export const authToken = (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ error: 'No autorizado. Token ausente.' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // { userId, email }

    next()
  } catch (error) {
    console.error('Error al verificar el token:', error.message)
    return res.status(401).json({ error: 'Token inválido o expirado.' })
  }
}
