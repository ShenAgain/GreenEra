router.get('/pickup-history', async (req, res) => {
    try {
      const history = await Pickup.find({ userId: req.query.userId }).select('date time wasteType address status');
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  