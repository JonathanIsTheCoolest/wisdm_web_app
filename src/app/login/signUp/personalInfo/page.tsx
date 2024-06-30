import styles from '@/styles/Onboarding.module.scss'
import Link from 'next/link'

const PersonalInfoPage = () => (
  <div className={styles.personalInfoPage}>
    <Link href='/login/signUp' className={styles.backButton}>
      ←
    </Link>
    <h2>Tell us a little about yourself</h2>
    <label>
      Choose a unique username
      <input
        type="text"
        placeholder="teacher.s_pet123"
        className={styles.inputField}
      />
    </label>
    <p>Want to go anonymous? You can change it in the settings.</p>
    <h3>What is your gender?</h3>
    <div className={styles.genderButtons}>
      <button className={styles.genderButton}>Female</button>
      <button className={styles.genderButton}>Male</button>
      <button className={styles.genderButton}>Other</button>
      <button className={styles.genderButton}>Don't want to specify</button>
    </div>
    <p className={styles.infoText}>
      You can customize the visibility of your information in the settings
    </p>
    <Link href='/login/signUp/locationInfo' className={styles.nextButton}>
      Next
    </Link>
  </div>
);

export default PersonalInfoPage