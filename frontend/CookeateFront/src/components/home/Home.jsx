import ExplainAboutUs from "./componentsHome/ExplainAboutUs"
import LastPublications from "./componentsHome/LastPublications"
import Navbar from "./componentsHome/Navbar"
import Slider from "./componentsHome/Slider"
const Home =() => {
    return (
        <div>
            <Navbar />
            <Slider />
            <ExplainAboutUs/>
            <LastPublications/>
        </div>
    )
}

export default Home