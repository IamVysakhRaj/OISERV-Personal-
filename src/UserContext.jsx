// import React, { createContext, useContext, useState } from 'react';

// // Create the User Context
// const UserContext = createContext();

// // Create a provider component
// export const UserProvider = ({ children }) => {
//     const [username, setUsername] = useState('');

//     return (
//         <UserContext.Provider value={{ username, setUsername }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// // Create a custom hook to use the User Context
// export const useUser = () => {
//     return useContext(UserContext);
// };


import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the User Context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(() => {
        // Get the initial value from localStorage, if available
        const savedUsername = localStorage.getItem('username');
        return savedUsername ? savedUsername : '';
    });

    useEffect(() => {
        // Update localStorage whenever the username changes
        localStorage.setItem('username', username);
    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to use the User Context
export const useUser = () => {
    return useContext(UserContext);
};
