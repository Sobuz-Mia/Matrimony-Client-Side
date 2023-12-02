import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import HowItWorkSection from "./HowItWorkSection";
import SuccessCounterSection from "./SuccessCounterSection";
import SuccessStory from "./SuccessStory";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Matri-marry || Home</title>
            </Helmet>
            <Banner/>
            <HowItWorkSection/>
            <SuccessCounterSection/>
            <SuccessStory/>
            <Footer/>
        </div>
    );
};

export default Home;