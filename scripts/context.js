import React, { createContext, useState } from 'react';

// Crea el contexto
export const NotificationContext = createContext(false, () => {});

// Crea un proveedor del contexto
export const NotificationProvider = ({ children }) => {
    const [sendingNotification, setSendingNotificacion] = useState(false);

    const updateSendingNotificacion = (state) => {
        console.log("updateSendingNotificacion", state);
        setSendingNotificacion(state);
    };

    return (
        <NotificationContext.Provider value={{sendingNotification, updateSendingNotificacion }}>
            {children}
        </NotificationContext.Provider>
    );
};
