import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar /> {/* not doing any composition */}
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
