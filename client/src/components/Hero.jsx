import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { getSlidersApi } from "../services/heroSliderApi";
import "./Hero.css";

function Hero() {
  const [sliders, setSliders] = useState([]);
  const [order, setOrder] = useState(["left", "center", "right"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSliders() {
      try {
        const data = await getSlidersApi();

        const active = data
          .filter((s) => s.isActive)
          .sort((a, b) => a.order - b.order);

        setSliders(active);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSliders();
  }, []);

  const slider = sliders[0];

  // Rotate which image (left/center/right) sits in the focused center slot
  useEffect(() => {
    if (!slider) return;

    const intervalID = setInterval(() => {
      setOrder((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first]; // shift left → e.g. [left, center, right] becomes [center, right, left]
      });
    }, slider.duration || 5000);

    return () => clearInterval(intervalID);
  }, [slider]);

  if (loading || !slider) return null;

  const { title, subtitle, animatedWords, images, buttons, duration } = slider;

  // order[0] = left slot, order[1] = center/focused slot, order[2] = right slot
  const figuresArray = order.map((side, slotIndex) => ({
    image: images?.[side]?.url,
    alt: `${title} - ${side}`,
    key: side,
    isCenter: slotIndex === 1,
  }));

  return (
    <section id="hero" className="py-4 py-md-5">
      <div className="container mb-4 mb-md-5">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <p className="hero-subtitle mb-2 mb-md-3">{subtitle}</p>

            <h1 className="hero-title mb-3 mb-md-5 ">
              {title} <AnimatedText words={animatedWords} duration={duration} />
            </h1>

            {/* was: className="d-flex gap-3 mb-7 gap-md-4 flex-row justify-content-center align-items-center" */}
            <div className="hero-actions d-flex gap-2 gap-md-3 flex-row justify-content-center align-items-center">
              <Link to={buttons?.primary?.link || "/shop"}>
                <Button variant="solid-btn" className="action-btn shop-btn">
                  {buttons?.primary?.text || "Shop Now"}
                </Button>
              </Link>

              <Link to={buttons?.secondary?.link || "/about"}>
                <Button
                  variant="outline-btn"
                  className="action-btn learn-more-btn"
                >
                  {buttons?.secondary?.text || "Learn more"}
                </Button>
              </Link>
            </div>

            {/* <div className="col-xl-10 mt-4 mt-md-5 mx-auto"> */}
            <div className="hero-images-wrapper col-xl-10 mx-auto">
              <div className="row align-items-end justify-content-center gx-2 gx-sm-3">
                {figuresArray.map(
                  (fig) =>
                    fig.image && (
                      <div className="col-4" key={fig.key}>
                        <img
                          src={fig.image}
                          alt={fig.alt}
                          className={`w-100 hero-figure ${
                            fig.isCenter
                              ? "hero-figure-center"
                              : "hero-figure-side"
                          }`}
                        />
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

function AnimatedText({ words = [], duration = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);

    if (!words.length) return;

    const intervalID = setInterval(
      () => setCurrentIndex((prev) => (prev < words.length - 1 ? prev + 1 : 0)),
      duration,
    );

    return () => clearInterval(intervalID);
  }, [words, duration]);

  if (!words.length) return null;

  return words[currentIndex];
}
