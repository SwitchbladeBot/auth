const queryString = require('querystring')
const base64url = require('base64url')

module.exports = ({router}) => {
  /**
   * This endpoint is used on the /login endpoint, to get the URL to redirect to for the Discord Login.
   */
  router.get('/discord_url', (req, res) => {
    const redirectUri = `${process.env.BASE_URL}${process.env.DISCORD_CALLBACK_PATH}`
    let state = {}

    if (req.query.redirect_to) {
      state.redirect_to = req.query.redirect_to
    }

    const url = `https://discord.com/api/oauth2/authorize?${queryString.stringify({
      client_id: process.env.DISCORD_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: process.env.DISCORD_SCOPES.split(',').join(' '),
      state: base64url.encode(JSON.stringify(state))
    })}`

    res.json({
      url
    })
  })
}
