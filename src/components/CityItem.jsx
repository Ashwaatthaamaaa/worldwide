import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, _id, id, position } = city;
  const cityId = _id || id; // Use MongoDB _id or fallback to id

  function handleClick(e) {
    e.preventDefault();
    deleteCity(cityId);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          cityId === (currentCity._id || currentCity.id) ? styles["cityItem--active"] : ""
        }`}
        to={`${cityId}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
