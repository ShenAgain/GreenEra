// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const Pickup = require('../models/pickup');
const mongoose = require('mongoose');

// Get metadata for report options
router.get('/metadata', async (req, res) => {
    try {
      const metadata = {
        reportTypes: [
          { value: 'pickupStats', label: 'Pickup Statistics' },
          { value: 'wasteType', label: 'Waste Type Analysis' }
        ],
        wasteTypes: ['Household', 'Recyclable', 'Garden', 'All'],
        formats: ['pdf', 'csv']
      };
      res.status(200).json(metadata);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Generate report with chart data
router.post('/generate', async (req, res) => {
  try {
    const { reportType, startDate, endDate, area, wasteType, status } = req.body;

    // Build query conditions
    let query = {};
    
    if (startDate && endDate) {
      query.date = {
        $gte: startDate,
        $lte: endDate
      };
    }

    if (wasteType && wasteType !== 'All') {
      query.wasteType = wasteType;
    }

    // Fetch pickups based on query
    const pickups = await Pickup.find(query)
      .sort({ date: 1 })
      .populate('userId', 'name email');

    // Process data based on report type
    let reportData = {
      title: `Waste Management Report - ${reportType}`,
      columns: ['Date', 'Time', 'Waste Type', 'Address', 'Status'],
      data: pickups.map(pickup => ({
        date: pickup.date,
        time: pickup.time,
        wasteType: pickup.wasteType,
        address: pickup.address,
        status: pickup.status
      })),
      summary: {
        totalPickups: pickups.length,
        byWasteType: {},
        byDate: {}
      },
      chartData: {
        type: 'bar',
        labels: [],
        data: [],
        colors: [],
        label: ''
      }
    };

    // Generate chart data based on report type
    if (reportType === 'pickupStats') {
      // Group by date
      const dateGroups = {};
      pickups.forEach(pickup => {
        const date = pickup.date;
        dateGroups[date] = (dateGroups[date] || 0) + 1;
      });

      reportData.chartData = {
        type: 'bar',
        labels: Object.keys(dateGroups),
        data: Object.values(dateGroups),
        label: 'Pickups per Day',
        colors: Array(Object.keys(dateGroups).length).fill('#4CAF50')
      };
    } else if (reportType === 'wasteType') {
      // Group by waste type
      const wasteGroups = {};
      pickups.forEach(pickup => {
        wasteGroups[pickup.wasteType] = (wasteGroups[pickup.wasteType] || 0) + 1;
      });

      reportData.chartData = {
        type: 'pie',
        labels: Object.keys(wasteGroups),
        data: Object.values(wasteGroups),
        label: 'Waste Type Distribution',
        colors: ['#4CAF50', '#2196F3', '#FFC107', '#F44336']
      };
    }

    // Calculate summary statistics
    pickups.forEach(pickup => {
      reportData.summary.byWasteType[pickup.wasteType] = 
        (reportData.summary.byWasteType[pickup.wasteType] || 0) + 1;
      
      reportData.summary.byDate[pickup.date] = 
        (reportData.summary.byDate[pickup.date] || 0) + 1;
    });

    res.status(200).json(reportData);
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Export report
router.post('/export', async (req, res) => {
  try {
    const { reportType, startDate, endDate, format } = req.body;
    
    // Fetch data using same logic as generate
    const query = {};
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    const pickups = await Pickup.find(query)
      .sort({ date: 1 })
      .populate('userId', 'name email');

    // Format data for export
    const exportData = pickups.map(pickup => ({
      Date: pickup.date,
      Time: pickup.time,
      'Waste Type': pickup.wasteType,
      Address: pickup.address,
      Status: pickup.status,
      'User Email': pickup.userId.email
    }));

    // Send response based on format
    if (format === 'pdf') {
      // Implement PDF generation logic here
      // For now, sending JSON
      res.json(exportData);
    } else {
      res.json(exportData);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;