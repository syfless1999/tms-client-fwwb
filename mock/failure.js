const getFailure = (req, res) => {
  const { toolId } = req.query
  return res.json({
    status: 'success',
    data: {
      probability: 0.5736
    }
  })
}



export default {
  'GET /api/failure': getFailure,
}