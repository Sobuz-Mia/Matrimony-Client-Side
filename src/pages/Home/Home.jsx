import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import HowItWorkSection from "./HowItWorkSection";
import SuccessCounterSection from "./SuccessCounterSection";
import SuccessStory from "./SuccessStory";

const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWorkSection/>
            <SuccessCounterSection/>
            <SuccessStory/>
            <Footer/>
        </div>
    );
};

export default Home;