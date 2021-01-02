import React from 'react';
import '../styles/TextError.css';

const TextError: React.FC<{}> = ({children}) => {
    return (
        <div className="error">
            {children}
        </div>
    )
}

export default TextError
