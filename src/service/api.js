import { env } from '../../config';

export const sendScanData = async (scannedCode) => {
    try {
        const response = await fetch(env.ApiBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: scannedCode }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};

export const fetchEvents = async () => {
    try {
        const response = await fetch(`${env.ApiBaseUrl}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'you-know-it',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return { success: true, data: data?.data };
    } catch (error) {
        console.log('🚀 ~ fetchEvents ~ error:', error);
        return {
            success: false,
            data: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};
