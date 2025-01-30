import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Function untuk mendapatkan access token dari Zoom
const getZoomAccessToken = async () => {
    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'account_credentials',
                account_id: process.env.ZOOM_ACCOUNT_ID,
            },
            auth: {
                username: process.env.ZOOM_CLIENT_ID,
                password: process.env.ZOOM_CLIENT_SECRET,
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Zoom access token:', error.response?.data || error.message);
        throw new Error('Failed to retrieve Zoom access token');
    }
};

// Function untuk membuat Zoom Meeting
export const createZoomMeeting = async (topic, startTime, duration) => {
    try {
        const token = await getZoomAccessToken();
        
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic,
            type: 2, // Scheduled Meeting
            start_time: startTime,
            duration,
            timezone: "Asia/Jakarta",
            settings: {
                host_video: true,
                participant_video: true,
            },
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating Zoom meeting:', error.response?.data || error.message);
        throw new Error('Failed to create Zoom meeting');
    }
};
