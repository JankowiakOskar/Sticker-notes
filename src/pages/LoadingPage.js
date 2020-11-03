import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LoaderElement from 'components/molecules/LoaderElement/LoaderElement';
import { connect } from 'react-redux';
import { hideLoader as hideLoaderAction } from 'actions/authActions';
import PageRedirect from 'providers/PageRedirect';
import gsap from 'gsap';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  background-color: ${({ theme }) => theme.dark};
`;

const LoadingPage = ({ isShownLoader, hideLoader }) => {
  const wrapperRef = useRef(null);

  const showUpAnimation = () => {
    const wrapper = wrapperRef.current;
    const [loaderElements] = wrapper.children;

    const loaderTitle = loaderElements.querySelector(`[data-id='loaderTitle']`);
    const loader = loaderElements.querySelector('div');

    const tl = gsap.timeline({ defaults: { ease: 'Power3.inOut' } });

    gsap.set([wrapper, loaderTitle, loader], { autoAlpha: 0 });

    tl.to(wrapper, { autoAlpha: 1, duration: 1 })
      .fromTo(
        loaderTitle,
        { scale: 0.7, y: '-50' },
        { y: '0', scale: 1, autoAlpha: 1, duration: 1.3 },
      )
      .fromTo(loader, { scale: 0.7 }, { scale: 1, autoAlpha: 1, duration: 1 })
      .to(loaderElements, { scale: 0.7, autoAlpha: 0, duration: 1, ease: 'bounce.out' })
      .to(wrapper, { autoAlpha: 0, duration: 0.5 });
  };

  useEffect(() => {
    let hidding;
    if (isShownLoader && wrapperRef) {
      showUpAnimation();
      hidding = setTimeout(() => hideLoader(), 4500);
    }
    return () => {
      clearTimeout(hidding);
    };
  }, [isShownLoader, hideLoader]);
  return (
    <>
      {isShownLoader ? (
        <PageRedirect>
          <Wrapper ref={wrapperRef}>
            <LoaderElement />
          </Wrapper>
        </PageRedirect>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { isShownLoader, hideLoader } = state.auth;
  return { isShownLoader, hideLoader };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideLoader: () => dispatch(hideLoaderAction()),
  };
};

LoadingPage.propTypes = {
  isShownLoader: PropTypes.bool.isRequired,
  hideLoader: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
