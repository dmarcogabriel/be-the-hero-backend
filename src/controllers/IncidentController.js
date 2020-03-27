const connection = require('../database/connection')

module.exports = {
  index: async (req, res) => {
    const { page = 1, perPage = 5 } = req.query

    const [ count ] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(perPage)
      .offset((page - 1) * perPage)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ])

    res.header('X-Total-Count', count['count(*)'])

    return res.status(200).json({ incidents })
  },
  create: async (req, res) => {
    const { title, description, value } = req.body
    const ong_id = req.headers.authorization

    const [ id ] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })

    return res.status(201).json({ id })
  },
  delete: async (req, res) => {
    const { id } = req.params
    const ong_id = req.headers.authorization

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (!incident)
      return res.status(400).json({
        error: 'Incident not founded with this ID',
      })

    if(incident.ong_id !== ong_id)
      return res.status(401).json({ 
        error: 'Operation not permited',
      })

    await connection('incidents').where('id', id).delete()
    return res.status(204).send()
  }
}