router.put('/update-status/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const pickup = await Pickup.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!pickup) {
        return res.status(404).json({ message: 'Pickup not found' });
      }
  
      res.status(200).json({ message: 'Pickup status updated successfully', pickup });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });
  