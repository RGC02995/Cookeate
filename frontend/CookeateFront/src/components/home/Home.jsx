import ExplainAboutUs from "./ExplainAboutUs"
import LastPublications from "./LastPublications"
import Navbar from "./Navbar"
import Slider from "./Slider"
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