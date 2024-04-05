import ExplainAboutUs from "./componentsHome/ExplainAboutUs";
import LastPublications from "./componentsHome/LastPublications";
import Navbar from "./componentsHome/Navbar";
import Slider from "./componentsHome/Slider";
import { useState } from "react";

const Home = () => {
  const [searchPage, setSearchPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <Navbar
        onChangeSearchPage={(searchStatus, searchQuery) => {
          setSearchPage(searchStatus);
          setSearchQuery(searchQuery);
        }}
      />
      {searchPage && <div style={{ color: "black" }}> {searchQuery}</div>}
      {!searchPage && (
        <div>
          <Slider />
          <ExplainAboutUs />
          <LastPublications />
        </div>
      )}
    </div>
  );
};

export default Home;
