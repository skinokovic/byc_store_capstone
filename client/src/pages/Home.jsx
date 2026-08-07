import Blog from "../components/Blog";
import Collections from "../components/Collections";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
// import ShopByCategory from "../components/ShopByCategory";
import ShopByCategory from "../components/shopByCategory/ShopByCategory";

function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <Collections />
      <ShopByCategory />
      <Blog />
    </>
  );
}

export default Home;
