import styles from "@/styles/Onboarding.module.scss";
import Link from "next/link";

interface NavigationActions {
  [key: string]: () => void
}

const TagsInfoPage = ({ locationInfo, interestsInfo }: NavigationActions) => (
  <div className={styles.tagsInfoPage}>
    <Link href='/login/signUp/locationInfo' className={styles.backButton}>
      ←
    </Link>
    <h2>Where do you stand?</h2>
    <p>Choose the tags below that you think best describes yourself</p>
    <div className={styles.tagsButtons}>
      {[
        "Left Liberal",
        "Right Rebel",
        "Middle Man",
        "Eco Warrior",
        "Tech Geek",
        "Fiscal Hawk",
        "Socialist Spark",
        "Diplomacy Devotee",
        "Freedom Fanatic",
        "Capitalist Crusader",
        "Green Guardian",
        "Rural Revolutionary",
        "Planet Preserver",
        "Urban Utopian",
        "Cultural Creative",
        "Justice Juggernaut",
        "Equality Evangelist",
      ].map((tag) => (
        <button key={tag} className={styles.tagButton}>
          {tag}
        </button>
      ))}
    </div>
    <Link href='/login/signUp/interests' className={styles.nextButton}>
      Next
    </Link>
  </div>
);

export default TagsInfoPage