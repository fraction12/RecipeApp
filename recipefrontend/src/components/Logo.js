import React from 'react';


const Logo = () => {
    return (
            <div 
                style={{ 
                    fontSize: '4rem', 
                    fontWeight: 400, 
                    color: '#000',
                    textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                    background: 'transparent',
                    animation: 'fadeIn 1s ease-in-out forwards'
                }}
            >
                <b>Reci.</b><span>Fyi</span>
                {/* Inline styles for the keyframes */}
                <style>
                    {`
                        @keyframes fadeIn {
                            0% { opacity: 0; }
                            100% { opacity: 1; }
                        }
                    `}
                </style>
            </div>
        );
    };

export default Logo;