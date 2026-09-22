import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <h1>Главная страница</h1>

      <div className="home__buttons">
        <button className="home__button" onClick={() => navigate('/stage1')}>
          Создать карточку товара
        </button>
        <button className="home__button" onClick={() => navigate('/stage2')}>
          Черновики
        </button>
        <button className="home__button" onClick={() => navigate('/stage3')}>
          Объединение товара
        </button>
      </div>
    </div>
  )
}

export default Home