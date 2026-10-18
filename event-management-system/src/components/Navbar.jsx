import { CalendarDays, Compass, Ticket, LogOut, UserRound } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(logoutUser());
    navigate('/');
  }

  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <span className="brand-mark">
          <CalendarDays size={19} />
        </span>
        gather<span className="brand-dot">.</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/events">
          <Compass size={16} /> Explore
        </NavLink>
        {user && (
          <NavLink to="/my-events">
            <Ticket size={16} /> My events
          </NavLink>
        )}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-chip">
              <UserRound size={15} />
              {user.name.split(' ')[0]}
            </span>
            <button className="button button-ghost button-small" onClick={logout}>
              <LogOut size={15} /> Log out
            </button>
          </>
        ) : (
          <>
            <Link className="nav-login" to="/login">
              Log in
            </Link>
            <Link className="button button-primary button-small" to="/register">
              Get started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}