import React, { useState } from 'react';

export const Context = React.createContext(null);

// @ts-ignore
export default function State({ children }) {
    const [articles, setArticles] = useState([]);

    const handleArticles = ((a: any) => {
        setArticles(a);
    });
    return (
        <Context.Provider
        // @ts-ignore
            value =
            {{
                articles,
                onArticlesChange: handleArticles
            }}
        >
            {children}
        </Context.Provider>
    )
}