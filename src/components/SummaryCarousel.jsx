import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SUMMARY_ITEMS = [
  {
    label: "Start",
    title: "Kuala Lumpur → Cam Ranh",
    description: "Land 1 Aug 11:00. Mud bath same day; VinWonders full day on 2 Aug."
  },
  {
    label: "Longest leg",
    title: "Da Lat → Hoi An",
    description: "Sleeper bus target window: about 10 hours overnight."
  },
  {
    label: "Final full day",
    title: "Da Nang on 7 Aug",
    description: "Marble Mountains, My Khe Beach, Han River, and Dragon Bridge."
  }
];

export default function SummaryCarousel() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!slide) return;

    slide.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      inline: "center",
      block: "nearest"
    });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = [...track.children];
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisible) return;

        const index = slides.indexOf(mostVisible.target);
        if (index >= 0) setActiveIndex(index);
      },
      { root: track, threshold: [0.55, 0.75, 0.95] }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goNext = () => scrollToIndex(Math.min(SUMMARY_ITEMS.length - 1, activeIndex + 1));

  return (
    <section className="summary-carousel" aria-label="Trip summary">
      <div className="summary-carousel__header">
        <span className="eyebrow">Trip highlights</span>
        <div className="summary-carousel__controls">
          <button
            type="button"
            className="summary-carousel__arrow"
            aria-label="Previous highlight"
            onClick={goPrev}
            disabled={activeIndex === 0}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="summary-carousel__arrow"
            aria-label="Next highlight"
            onClick={goNext}
            disabled={activeIndex === SUMMARY_ITEMS.length - 1}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className="summary-carousel__track"
        ref={trackRef}
        role="list"
        aria-live="polite"
        aria-atomic="true"
      >
        {SUMMARY_ITEMS.map((item, index) => (
          <article
            key={item.label}
            className="summary-carousel__slide"
            role="listitem"
            aria-label={`${item.label}: ${item.title}`}
          >
            <span className="label">{item.label}</span>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="summary-carousel__dots" role="tablist" aria-label="Trip highlight slides">
        {SUMMARY_ITEMS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            className={`summary-carousel__dot${activeIndex === index ? " active" : ""}`}
            aria-label={`Show ${item.label}`}
            aria-selected={activeIndex === index}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
