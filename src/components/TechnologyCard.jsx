import { useEffect, useRef } from "react";
import { animate } from "animejs";
import "./TechnologyCard.css";

const TechnologyCard = ({ icon: Icon, title }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const cardEl = cardRef.current;
        const iconEl = cardEl?.querySelector(".tech-icon");
        if (!cardEl || !iconEl) return;

        const handleEnter = () => {
            animate(iconEl, {
                scale: 1.18,
                duration: 320,
                easing: "out(3)",
            });
        };

        const handleLeave = () => {
            animate(iconEl, {
                scale: 1,
                duration: 250,
                easing: "outQuad",
            });
        };

        cardEl.addEventListener("mouseenter", handleEnter);
        cardEl.addEventListener("mouseleave", handleLeave);

        return () => {
            cardEl.removeEventListener("mouseenter", handleEnter);
            cardEl.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    return (
        <div className="technology-card" ref={cardRef}>
            <Icon className="tech-icon" />
            <span className="tech-label">{title}</span>
        </div>
    )
}

export default TechnologyCard;