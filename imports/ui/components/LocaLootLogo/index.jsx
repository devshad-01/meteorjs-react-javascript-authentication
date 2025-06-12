import React from 'react';

const LocaLootLogo = ({ width = 300, height = 120, className = "" }) => {
    return (
        <div className={className} style={{ textAlign: 'center' }}>
            <img 
                src="/logo.svg" 
                alt="LocaLoot - Find it around the corner" 
                width={width}
                height={height}
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        </div>
    );
};

export default LocaLootLogo;
