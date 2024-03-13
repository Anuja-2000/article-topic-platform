import styles from "../styles/loginlayout.module.css";

export default function LoginLayout2({ children }) {
  return (
    <div className={styles.screen2}>
      <div className={styles.column}>
        <div className={styles.imgstyle}>
          <div className={styles.img2}></div>
        </div>

        <div className={styles.rightcol2}>
          <div className={styles.blurcol}>
            <div className={styles.whitebox}>{children}</div>
          </div>
          <div className={styles.padding}></div>
        </div>
      </div>
    </div>
  );
}
