import React from 'react';
import styles from "../../assets/css/modules/Layout.module.css/Navbar.module.css"
import LogoImg from "../../assets/images/tamayoz-logo.png"

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarLeft}>
        <div className={styles.logo}>
          <img src={LogoImg} alt='Tamayoz' />

          </div>
      </div>
      {/* ================ */}
      <div className={styles.navbarRight}>

      </div>
    </div>
  )
}

export default Navbar
