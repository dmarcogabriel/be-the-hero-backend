const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
  index: async (_, res) => {
    const ongs = await connection('ongs').select('*')

    return res.status(200).json({ ongs })
  },
  create: async (req, res) => {
    const { name, email, whatsapp, city, uf } = req.body

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return res.status(201).json({ id })
  },
}