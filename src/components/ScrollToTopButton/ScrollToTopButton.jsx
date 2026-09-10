import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Повернутися нагору"
      title="Повернутися нагору"
    >
      &uarr;
    </button>
  );
};

export default ScrollToTopButton;