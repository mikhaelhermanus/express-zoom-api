import db from '../database/db.js'
import { createZoomMeeting } from '../helper/zoomHelper.js';
import { format } from 'date-fns';

// Function untuk mengubah ISO 8601 ke format MySQL DATETIME
const convertToMySQLDateTime = (isoDate) => {
    return format(new Date(isoDate), 'yyyy-MM-dd HH:mm:ss');
};

// Create Zoom Meeting
export const createMeeting = async (req, res) => {
    try {
        const { topic, startTime, duration } = req.body;
        const formattedStartTime = convertToMySQLDateTime(startTime);

        const zoomResponse = await createZoomMeeting(topic, startTime, duration);

        const query = `INSERT INTO zoom_meetings (zoomId, topic, startTime, duration, joinUrl) VALUES (?, ?, ?, ?, ?)`;
        const values = [
            zoomResponse.id,
            zoomResponse.topic,
            formattedStartTime,
            zoomResponse.duration,
            zoomResponse.join_url
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting meeting:', err);
                return res.status(500).json({
                    error: true,
                    message: 'Error saving Zoom Meeting',
                });
            }
            res.status(201).json({
                error: false,
                data: {
                    id: result.insertId,
                    ...zoomResponse,
                },
            });
        });
    }  catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Error creating Zoom Meeting',
        });
    }
};

// Get All Meetings
export const getMeetings = (req, res) => {
    const query = `SELECT * FROM zoom_meetings`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching meetings:', err);
            return res.status(500).json({ error:true, data:[], message: 'Error fetching meetings' });
        }
        res.status(201).json({error:false, data:results});
    });
};

// Delete Zoom Meeting
export const deleteMeeting = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM zoom_meetings WHERE id = ?`;
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting meeting:', err);
            return res.status(500).json({ error:false, message: 'Error deleting meeting' });
        }
        res.status(200).json({error:false, message: 'Meeting deleted successfully' });
    });
};
