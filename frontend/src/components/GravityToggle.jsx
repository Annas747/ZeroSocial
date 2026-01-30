/**
 * GravityToggle Component
 * Floating button to turn animations on/off
 */

import { useGravity } from '../App';

function GravityToggle() {
    const { gravityOn, toggleGravity } = useGravity();

    return (
        <button
            className={`gravity-toggle ${gravityOn ? 'on' : ''}`}
            onClick={toggleGravity}
            title={gravityOn ? 'Turn on anti-gravity' : 'Turn on gravity'}
        >
            <span className="gravity-toggle-indicator"></span>
            <span className="gravity-toggle-label">
                GRAVITY {gravityOn ? 'ON' : 'OFF'}
            </span>
        </button>
    );
}

export default GravityToggle;
