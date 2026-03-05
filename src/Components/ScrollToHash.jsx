import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const sectionId = decodeURIComponent(hash.slice(1));
    if (!sectionId) return;

    let tries = 0;
    const maxTries = 120;

    const scrollWhenReady = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      tries += 1;
      if (tries < maxTries) {
        requestAnimationFrame(scrollWhenReady);
      }
    };

    requestAnimationFrame(scrollWhenReady);
  }, [hash, pathname]);

  return null;
}

export default ScrollToHash;
