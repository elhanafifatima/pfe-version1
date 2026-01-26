import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const HealthContext = createContext();

export const useHealth = () => useContext(HealthContext);

export const ProfileSanteProvider = ({ children }) => {
    const [clientId, setClientId] = useState(null);
    const [hasProfile, setHasProfile] = useState(false);
    const [goal, setGoal] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let id = localStorage.getItem('vitalis_client_id');
        if (!id) {
            id = uuidv4();

            console.log("Generated new client id:", id);

            localStorage.setItem('vitalis_client_id', id);
        }
        setClientId(id);
        checkProfile(id);
    }, []);

    const checkProfile = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/profile-sante/${id}`);
            if (response.data) {
                setHasProfile(true);
                setGoal(response.data.goal);
            }
        } catch (error) {
            console.error("Error checking profile:", error);
            setHasProfile(false);
        } finally {
            setLoading(false);
        }
    };

    const updateProfileStatus = (status, userGoal = '') => {
        setHasProfile(status);
        if (userGoal) setGoal(userGoal);
    };

    return (
        <HealthContext.Provider value={{ clientId, hasProfile, goal, loading, updateProfileStatus }}>
            {!loading && children}
        </HealthContext.Provider>
    );
};
