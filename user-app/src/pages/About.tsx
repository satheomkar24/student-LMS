import SectionHeading from "../reusables/SectionHeading";
import AboutSection from "../components/about/AboutSection";
import Instructors from "../components/about/Instructors";

const About = () => {
  return (
    <>
      <SectionHeading name="About Us" />
      <Instructors />
      <AboutSection />
    </>
  );
};

export default About;
