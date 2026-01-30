/**
 * Navbar Component - Exact Facebook Style
 * Matches screenshot perfectly
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { getImageUrl } from '../config';

function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);



    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fb-navbar">
            {/* Left - Logo & Search */}
            <div className="navbar-left">
                <Link to="/" className="fb-logo-link">
                    <svg viewBox="0 0 36 36" className="fb-logo-svg" fill="url(#fb-gradient)" height="40" width="40">
                        <defs>
                            <linearGradient id="fb-gradient" x1="50%" x2="50%" y1="97.078%" y2="0%">
                                <stop offset="0%" stopColor="#0062E0" />
                                <stop offset="100%" stopColor="#19AFFF" />
                            </linearGradient>
                        </defs>
                        <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 4.921 1.974 9.382 5.17 12.638L4 35l5.458-1.615A17.921 17.921 0 0018 35.87c.744 0 1.478-.038 2.181-.114V22h-4v-4h4v-3c0-3.866 2.239-6 5.83-6 1.647 0 3.17.122 3.17.122v3.8h-1.785c-1.757 0-2.215.866-2.215 1.753V18h4.24l-.68 4h-3.56v13.87z" />
                    </svg>
                </Link>
                <div className="search-container">
                    <div className="search-icon-wrapper">
                        <svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16" className="search-icon">
                            <g fillRule="evenodd" transform="translate(-448 -544)">
                                <g fillRule="nonzero">
                                    <path d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.365 4.5 4.5 0 0 0 6.364-6.364z" transform="translate(448 544)" />
                                    <path d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004 1.07 1.07 0 0 1-.235-.416 1.09 1.09 0 0 1 .006-.527c.036-.137.094-.271.2-.415a.75.75 0 1 0-1.252-.457z" transform="translate(448 544)" />
                                    <path d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077a.75.75 0 1 0 .895-1.204 1.84 1.84 0 0 0-.549-.248 2.75 2.75 0 0 0-.651-.08 2.12 2.12 0 0 0-.865.208.75.75 0 0 0 .26 1.403z" transform="translate(448 544)" />
                                    <path d="M15.011 14.155a.75.75 0 0 0-1.06-1.06l-4.25 4.25a.75.75 0 0 0 1.06 1.06l4.25-4.25z" transform="translate(448 544)" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <input type="text" placeholder="Search Facebook" className="search-input" />
                </div>
            </div>

            {/* Center - Navigation */}
            <div className="navbar-center">
                <Link to="/" className={`nav-btn ${isActive('/') ? 'active' : ''}`} title="Home">
                    <svg viewBox="0 0 28 28" height="28" width="28" fill="currentColor">
                        <path d="M25.825 12.29C25.825 12.29 25.782 12.245 25.782 12.245L14.873 2.334C14.382 1.886 13.618 1.886 13.127 2.334L2.218 12.245C2.218 12.245 2.175 12.29 2.175 12.29C1.732 12.749 1.773 13.48 2.265 13.889C2.529 14.108 2.859 14.227 3.2 14.227L4 14.227 4 24.75C4 25.993 5.007 27 6.25 27L10 27C10.552 27 11 26.552 11 26L11 19.5C11 18.948 11.448 18.5 12 18.5L16 18.5C16.552 18.5 17 18.948 17 19.5L17 26C17 26.552 17.448 27 18 27L21.75 27C22.993 27 24 25.993 24 24.75L24 14.227 24.8 14.227C25.141 14.227 25.471 14.108 25.735 13.889C26.227 13.48 26.268 12.749 25.825 12.29Z" />
                    </svg>
                </Link>
                <button className="nav-btn" title="Watch">
                    <svg viewBox="0 0 28 28" height="28" width="28" fill="currentColor">
                        <path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5C8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5C20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.163 12.846L12.055 9.545C11.554 9.225 10.91 9.234 10.419 9.57C9.928 9.906 9.67 10.493 9.75 11.09L9.75 17.41C9.67 18.007 9.928 18.594 10.419 18.93C10.91 19.266 11.554 19.275 12.055 18.955L17.163 15.654C17.612 15.365 17.877 14.871 17.877 14.25C17.877 13.629 17.612 13.135 17.163 12.846L17.163 12.846ZM24.5 7.25C24.5 5.593 23.157 4.25 21.5 4.25L6.5 4.25C4.843 4.25 3.5 5.593 3.5 7.25L3.5 18.25C3.5 19.907 4.843 21.25 6.5 21.25L21.5 21.25C23.157 21.25 24.5 19.907 24.5 18.25L24.5 7.25Z" />
                    </svg>
                </button>
                <button className="nav-btn" title="Marketplace">
                    <svg viewBox="0 0 28 28" height="28" width="28" fill="currentColor">
                        <path d="M17.5 23.75 21.75 23.75C22.164 23.75 22.5 23.414 22.5 23L22.5 14 22.531 14C22.364 13.917 22.206 13.81 22.061 13.679L21.66 13.322 17.5 17.538 17.5 23.75ZM10.5 23.75 10.5 17.536 6.34 13.321 5.938 13.678C5.793 13.81 5.636 13.917 5.469 14L5.5 14 5.5 23C5.5 23.414 5.836 23.75 6.25 23.75L10.5 23.75ZM6.5 8.75 7.615 8.75 7.615 3C7.615 2.31 8.175 1.75 8.865 1.75L19.135 1.75C19.825 1.75 20.385 2.31 20.385 3L20.385 8.75 21.5 8.75C22.409 8.75 22.635 8.963 23.139 9.4L26.178 12.053C26.728 12.542 27 13.24 27 14L27 14C27 15.19 26.04 16.15 24.85 16.15L23.75 16.15 23.75 23.75C23.75 24.578 23.078 25.25 22.25 25.25L5.75 25.25C4.922 25.25 4.25 24.578 4.25 23.75L4.25 16.15 3.15 16.15C1.96 16.15 1 15.19 1 14L1 14C1 13.24 1.272 12.542 1.822 12.053L4.861 9.4C5.365 8.963 5.591 8.75 6.5 8.75ZM9.115 8.75 18.885 8.75 18.885 3.25 9.115 3.25 9.115 8.75ZM16 23.75 16 17 12 17 12 23.75 16 23.75Z" />
                    </svg>
                </button>
                <button className="nav-btn" title="Groups">
                    <svg viewBox="0 0 28 28" height="28" width="28" fill="currentColor">
                        <path d="M21.5 4C23.433 4 25 5.567 25 7.5L25 20.5C25 22.433 23.433 24 21.5 24L6.5 24C4.567 24 3 22.433 3 20.5L3 7.5C3 5.567 4.567 4 6.5 4L21.5 4ZM21.5 5.5L6.5 5.5C5.395 5.5 4.5 6.395 4.5 7.5L4.5 20.5C4.5 21.605 5.395 22.5 6.5 22.5L21.5 22.5C22.605 22.5 23.5 21.605 23.5 20.5L23.5 7.5C23.5 6.395 22.605 5.5 21.5 5.5ZM9.25 17C9.94 17 10.5 17.56 10.5 18.25L10.5 19L7.5 19 7.5 18.25C7.5 17.56 8.06 17 8.75 17L9.25 17ZM13.75 17C14.44 17 15 17.56 15 18.25L15 19L12 19 12 18.25C12 17.56 12.56 17 13.25 17L13.75 17ZM18.25 17C18.94 17 19.5 17.56 19.5 18.25L19.5 19L16.5 19 16.5 18.25C16.5 17.56 17.06 17 17.75 17L18.25 17ZM9 13.5C9.828 13.5 10.5 14.172 10.5 15C10.5 15.828 9.828 16.5 9 16.5C8.172 16.5 7.5 15.828 7.5 15C7.5 14.172 8.172 13.5 9 13.5ZM13.5 13.5C14.328 13.5 15 14.172 15 15C15 15.828 14.328 16.5 13.5 16.5C12.672 16.5 12 15.828 12 15C12 14.172 12.672 13.5 13.5 13.5ZM18 13.5C18.828 13.5 19.5 14.172 19.5 15C19.5 15.828 18.828 16.5 18 16.5C17.172 16.5 16.5 15.828 16.5 15C16.5 14.172 17.172 13.5 18 13.5ZM20.5 8.5C20.776 8.5 21 8.724 21 9C21 9.276 20.776 9.5 20.5 9.5L7.5 9.5C7.224 9.5 7 9.276 7 9C7 8.724 7.224 8.5 7.5 8.5L20.5 8.5Z" />
                    </svg>
                </button>
                <button className="nav-btn" title="Gaming">
                    <svg viewBox="0 0 28 28" height="28" width="28" fill="currentColor">
                        <path d="M23.5 9.5H22.25V8.25C22.25 6.317 20.683 4.75 18.75 4.75H9.25C7.317 4.75 5.75 6.317 5.75 8.25V9.5H4.5C2.567 9.5 1 11.067 1 13V20.5C1 22.433 2.567 24 4.5 24H23.5C25.433 24 27 22.433 27 20.5V13C27 11.067 25.433 9.5 23.5 9.5ZM8.5 18.5H7V20H5.5V18.5H4V17H5.5V15.5H7V17H8.5V18.5ZM12.25 18.75C11.56 18.75 11 18.19 11 17.5C11 16.81 11.56 16.25 12.25 16.25C12.94 16.25 13.5 16.81 13.5 17.5C13.5 18.19 12.94 18.75 12.25 18.75ZM15.75 15.5C15.06 15.5 14.5 14.94 14.5 14.25C14.5 13.56 15.06 13 15.75 13C16.44 13 17 13.56 17 14.25C17 14.94 16.44 15.5 15.75 15.5ZM15.75 21.5C15.06 21.5 14.5 20.94 14.5 20.25C14.5 19.56 15.06 19 15.75 19C16.44 19 17 19.56 17 20.25C17 20.94 16.44 21.5 15.75 21.5ZM19.25 18.75C18.56 18.75 18 18.19 18 17.5C18 16.81 18.56 16.25 19.25 16.25C19.94 16.25 20.5 16.81 20.5 17.5C20.5 18.19 19.94 18.75 19.25 18.75ZM20.75 9.5H7.25V8.25C7.25 7.145 8.145 6.25 9.25 6.25H18.75C19.855 6.25 20.75 7.145 20.75 8.25V9.5Z" />
                    </svg>
                </button>
            </div>

            {/* Right - Actions */}
            <div className="navbar-right">
                <button className="action-btn" title="Menu">
                    <svg viewBox="0 0 44 44" height="20" width="20" fill="currentColor">
                        <circle cx="7" cy="7" r="6" />
                        <circle cx="22" cy="7" r="6" />
                        <circle cx="37" cy="7" r="6" />
                        <circle cx="7" cy="22" r="6" />
                        <circle cx="22" cy="22" r="6" />
                        <circle cx="37" cy="22" r="6" />
                        <circle cx="7" cy="37" r="6" />
                        <circle cx="22" cy="37" r="6" />
                        <circle cx="37" cy="37" r="6" />
                    </svg>
                </button>
                <button className="action-btn" title="Messenger">
                    <svg viewBox="0 0 28 28" height="20" width="20" fill="currentColor">
                        <path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z" />
                    </svg>
                </button>
                <button
                    className="action-btn"
                    title="Notifications"
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <svg viewBox="0 0 28 28" height="20" width="20" fill="currentColor">
                        <path d="M7.847 23.488C9.207 23.488 11.443 23.988 14 23.988s4.793-.5 6.153-.5c1.446 0 2.847.771 2.847 1.678 0 .815-.452 1.333-1.333 1.333H6.333C5.452 26.5 5 25.981 5 25.166c0-.907 1.401-1.678 2.847-1.678zM24 17.5a1.5 1.5 0 0 1-1.5 1.5h-17a1.5 1.5 0 0 1-1.5-1.5v-.5c0-1.654 1.346-3 3-3 0-4.142 2.686-7.5 7.5-7.5s7.5 3.358 7.5 7.5c1.654 0 3 1.346 3 3v.5z" />
                    </svg>
                    <span className="notif-badge">9</span>
                </button>

                <button
                    className="profile-avatar-btn"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                    <div
                        className="avatar-img"
                        style={{
                            backgroundImage: user?.profilePhoto ? `url(${getImageUrl(user.profilePhoto)})` : undefined
                        }}
                    >
                        {!user?.profilePhoto && (user?.displayName?.[0] || '?')}
                    </div>
                </button>

                {showProfileMenu && (
                    <div className="profile-menu">
                        <Link
                            to={`/profile/${user?.id}`}
                            className="menu-item profile-link"
                            onClick={() => setShowProfileMenu(false)}
                        >
                            <div className="menu-avatar">
                                {user?.displayName?.[0] || '?'}
                            </div>
                            <div>
                                <div className="menu-name">{user?.displayName || user?.username}</div>
                                <div className="menu-sub">See your profile</div>
                            </div>
                        </Link>
                        <div className="menu-divider"></div>
                        <button className="menu-item"><span className="menu-icon">⚙</span> Settings & privacy</button>
                        <button className="menu-item"><span className="menu-icon">?</span> Help & support</button>
                        <button className="menu-item"><span className="menu-icon">◐</span> Display & accessibility</button>
                        <button className="menu-item" onClick={logout}><span className="menu-icon">→</span> Log Out</button>
                    </div>
                )}

                {showNotifications && (
                    <div className="notif-panel">
                        <h3>Notifications</h3>
                        <div className="notif-item unread">
                            <div className="notif-av">J</div>
                            <div><strong>John Doe</strong> liked your post<br /><span className="notif-time">2h</span></div>
                        </div>
                        <div className="notif-item unread">
                            <div className="notif-av">S</div>
                            <div><strong>Sarah Smith</strong> commented on your photo<br /><span className="notif-time">5h</span></div>
                        </div>
                        <div className="notif-item">
                            <div className="notif-av">M</div>
                            <div><strong>Mike Johnson</strong> sent you a friend request<br /><span className="notif-time">1d</span></div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
