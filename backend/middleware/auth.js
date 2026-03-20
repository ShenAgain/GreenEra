const jwt = require('jsonwebtoken');

const auth = {
  validateAdminKey: (req, res, next) => {
    const adminKey = req.headers['admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_REGISTRATION_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  },

  validateCommunity: async (req, res, next) => {
    try {
      const { communityName } = req.body;
      const community = await Community.findOne({ name: communityName });
      if (!community) {
        return res.status(400).json({ 
          message: 'Community not found. Please contact administrator.' 
        });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = auth;