import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classes from '../../styles/route-loading-indicator.module.css';

function RouteLoadingIndicator() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function showLoader(nextUrl) {
      if (nextUrl === router.asPath) {
        return;
      }

      setIsVisible(true);
    }

    function hideLoader() {
      setIsVisible(false);
    }

    router.events.on('routeChangeStart', showLoader);
    router.events.on('routeChangeComplete', hideLoader);
    router.events.on('routeChangeError', hideLoader);

    return () => {
      router.events.off('routeChangeStart', showLoader);
      router.events.off('routeChangeComplete', hideLoader);
      router.events.off('routeChangeError', hideLoader);
    };
  }, [router.asPath, router.events]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={classes.backdrop}
      role='status'
      aria-live='polite'
      aria-label='Loading next note'
    >
      <img
        className={classes.loaderImage}
        src='/images/site/loader.gif'
        alt=''
        aria-hidden='true'
      />
      <span className={classes.label}>Loading...</span>
    </div>
  );
}

export default RouteLoadingIndicator;
