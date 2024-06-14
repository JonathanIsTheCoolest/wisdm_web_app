import { useState, useEffect } from "react";

import styles from "../styles/Onboarding.module.scss";
import Image from "next/image";
import wisdm_logo_white from "../assets/logos/wisdm_logo_white.svg";
import tech from "../assets/images/tech.png";

const OnboardingPage = ({ signup, login }) => (
  <div className={styles.signupWrapper}>
    <Image src={wisdm_logo_white} alt="Wisdm Logo" />
    <h2>WISDM</h2>
    <button onClick={signup} className={styles.signupButton}>
      Sign Up
    </button>
    <button onClick={login} className={styles.loginButton}>
      Log In
    </button>
  </div>
);

const SignUpPage = ({ onboarding, personalInfo }) => (
  <div className={styles.signupPage}>
    <button onClick={onboarding} className={styles.backButton}>
      ←
    </button>
    <h2>Let's Get Started</h2>
    <label>
      Full Name
      <input
        type="text"
        placeholder="Insert Name"
        className={styles.inputField}
      />
    </label>
    <label>
      Email
      <input type="email" placeholder="Email" className={styles.inputField} />
    </label>
    <label>
      Password
      <input
        type="password"
        placeholder="Password"
        className={styles.inputField}
      />
    </label>
    <div className={styles.orDivider}>
      <span>OR</span>
    </div>
    <button className={styles.authButton}>Continue with Google</button>
    <button className={styles.authButton}>Continue with Apple</button>
    <button className={styles.authButton}>Continue with Facebook</button>
    <p className={styles.termsText}>
      By continuing you agree to our <a href="/terms">Terms of Service</a> and{" "}
      <a href="/privacy">Privacy Policy</a>.
    </p>
    <button onClick={personalInfo} className={styles.nextButton}>
      Next
    </button>
  </div>
);

const LoginPage = ({ onboarding, forgotPassword }) => (
  <div className={styles.loginPage}>
    <button onClick={onboarding} className={styles.backButton}>
      ←
    </button>
    <Image src={wisdm_logo_white} alt="Wisdm Logo" className={styles.logo} />
    <h2>Welcome Back</h2>
    <p>Please enter your credentials to Log in</p>
    <label>
      Username or Email
      <input
        type="text"
        placeholder="Username or Email"
        className={styles.inputField}
      />
    </label>
    <label>
      Password
      <input
        type="password"
        placeholder="Password"
        className={styles.inputField}
      />
    </label>
    <a href="#" onClick={forgotPassword} className={styles.forgotPassword}>
      Forgot Password?
    </a>
    <button onClick={onboarding} className={styles.nextButton}>
      Log in
    </button>
  </div>
);

const ForgotPasswordPage = ({ login }) => (
  <div className={styles.forgotPasswordPage}>
    <button onClick={login} className={styles.backButton}>
      ←
    </button>
    <h2>Forgot Password?</h2>
    <p>A verification code will be sent to your email</p>
    <label>
      Email
      <input type="email" placeholder="Email" className={styles.inputField} />
    </label>
    <p className={styles.termsText}>
      By continuing you agree to our <a href="/terms">Terms of Service</a> and{" "}
      <a href="/privacy">Privacy Policy</a>.
    </p>
    <button onClick={login} className={styles.nextButton}>
      Next
    </button>
  </div>
);

const PersonalInfoPage = ({ signup, locationInfo }) => (
  <div className={styles.personalInfoPage}>
    <button onClick={signup} className={styles.backButton}>
      ←
    </button>
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
    <button onClick={locationInfo} className={styles.nextButton}>
      Next
    </button>
  </div>
);

const LocationInfoPage = ({ personalInfo, tagsInfo }) => (
  <div className={styles.locationInfoPage}>
    <button onClick={personalInfo} className={styles.backButton}>
      ←
    </button>
    <h2>Where do you live?</h2>
    <p>This helps us personalize your feed with more relevant content.</p>
    <label>
      <select className={styles.inputField}>
        <option>United States</option>
        <option>Canada</option>
        <option>United Kingdom</option>
        <option>Australia</option>
        <option>Other</option>
      </select>
    </label>
    <p className={styles.infoText}>
      You can customize the visibility of your information in the settings
    </p>
    <button onClick={tagsInfo} className={styles.nextButton}>
      Next
    </button>
  </div>
);

const TagsInfoPage = ({ locationInfo, interestsInfo }) => (
  <div className={styles.tagsInfoPage}>
    <button onClick={locationInfo} className={styles.backButton}>
      ←
    </button>
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
    <button onClick={interestsInfo} className={styles.nextButton}>
      Next
    </button>
  </div>
);

const InterestsPage = ({ tagsInfo, setCurrentStep }) => (
  <div className={styles.interestsPage}>
    <button onClick={tagsInfo} className={styles.backButton}>
      ←
    </button>
    <h2>What are you interested in?</h2>
    <p>Pick 5 to customize your news feed</p>
    <div className={styles.interestsGrid}>
      {[
        { label: "Domestic Politics", image: tech.src },
        { label: "International Relations", image: tech.src },
        { label: "Policy & Legislation", image: tech.src },
        { label: "AI & Technology", image: tech.src },
        { label: "Elections & Campaigns", image: tech.src },
        { label: "Human Rights", image: tech.src },
        { label: "Entertainment Industry", image: tech.src },
        { label: "Social Media", image: tech.src },
        { label: "Environmental Policy", image: tech.src },
        { label: "Economics", image: tech.src },
        { label: "Global Health", image: tech.src },
        { label: "Peace & Justice", image: tech.src },
      ].map((interest) => (
        <div key={interest.label} className={styles.interestItem}>
          <img src={interest.image} alt={interest.label} />
          <p>{interest.label}</p>
        </div>
      ))}
    </div>
    <button onClick={() => setCurrentStep(9)} className={styles.finishButton}>
      Finish
    </button>
  </div>
);

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onBoarding = () => setCurrentStep(0);
  const signUp = () => setCurrentStep(2);
  const login = () => setCurrentStep(3);
  const personalInfo = () => setCurrentStep(4);
  const locationInfo = () => setCurrentStep(5);
  const tagsInfo = () => setCurrentStep(6);
  const interestsInfo = () => setCurrentStep(8);
  const forgotPassword = () => setCurrentStep(7);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingPage signup={signUp} login={login} />;
      case 2:
        return (
          <SignUpPage onboarding={onBoarding} personalInfo={personalInfo} />
        );
      case 3:
        return (
          <LoginPage onboarding={onBoarding} forgotPassword={forgotPassword} />
        );
      case 4:
        return <PersonalInfoPage signup={signUp} locationInfo={locationInfo} />;
      case 5:
        return (
          <LocationInfoPage personalInfo={personalInfo} tagsInfo={tagsInfo} />
        );
      case 6:
        return (
          <TagsInfoPage
            locationInfo={locationInfo}
            interestsInfo={interestsInfo}
          />
        );
      case 7:
        return <ForgotPasswordPage login={login} />;
      case 8:
        return <InterestsPage tagsInfo={tagsInfo} setCurrentStep={setCurrentStep} />;
      default:
        return <OnboardingPage signup={signUp} login={login} />;
    }
  };

  useEffect(() => {
    if (currentStep === 9) { // Change to a new step after InterestsPage
      onComplete();
    }
  }, [currentStep, onComplete]);

  return <div className={styles.onboardingWrapper}>{renderStep()}</div>;
};

export default Onboarding;
