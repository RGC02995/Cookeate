import Logo from "../../../img/Wallpaper.jpg";
function Slider() {
  return (
    <div className="">
      <img
        src={Logo}
        alt={`Image`}
        style={{ width: "100%", height: "100%", padding: 0, margin: 0 }}
      />
    </div>
  );
}

export default Slider;
