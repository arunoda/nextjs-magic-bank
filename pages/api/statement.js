import { Magic } from '@magic-sdk/admin'
const magic = new Magic(process.env.MAGIC_SECRET_KEY)

function sendError(res, error) {
  console.error(error.stack);
  res.statusCode = 401
  res.json({
    error: {
      message: 'Unauthorized'
    }
  })
}

export default async (req, res) => {
  const magicToken = (req.headers.authorization || '').replace('Bearer ', '')
  try {
    // Authorize the request
    const metadata = await magic.users.getMetadataByToken(magicToken)
    
    // send the statement
    res.statusCode = 200
    res.json({ balance: 3000, email: metadata.email })
  } catch (err) {
    sendError(res, err)
  }
}
