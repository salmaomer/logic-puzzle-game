import { useNavigate } from 'react-router-dom';
import './css/Navigate.css';

export default function Navigate({ to = '/' }) {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2 className="game-logo"></h2>
      <div className="home-button" onClick={() => navigate(to)}>
        ⬅ Home
      </div>
    </div>
  );
}