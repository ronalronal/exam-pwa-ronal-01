/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-return-assign */

import React, { useRef } from 'react';
import Slider from 'react-slick';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { generateThumborUrl } from '@helpers/image';
import { features } from '@config';
import { getStoreHost } from '@helpers/config';
import MagezonHeading from '@core_modules/cms/components/cms-renderer/magezon/MagezonHeading';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';

const MagezonSliderContent = (props) => {
    const {
        heading, heading_animation, heading_animation_delay, heading_bg_color,
        heading_color, heading_font_size, heading_line_height,
        heading_padding, heading_font_weight, heading_type,
        caption1, caption1_animation, caption1_animation_delay, caption1_bg_color,
        caption1_color, caption1_font_size, caption1_font_weight,
        caption1_line_height, caption1_padding, caption1_type,
        caption2, caption2_animation, caption2_animation_delay, caption2_bg_color,
        caption2_color, caption2_font_size, caption2_font_weight,
        caption2_line_height, caption2_padding, caption2_type,
        content_align, content_padding, content_position,
        content_width, content_wrapper_width,
        youtube_id,
        image, background_type, slider_height,
    } = props;
    const animationStyles = 'animate__animated animate__';
    const mediaUrl = `${getStoreHost()}media`;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const slideHeight = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].height;
    const slideWidth = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].width;

    const getBackgroundImageUrl = (backgroundType, img) => {
        if (backgroundType === 'image') {
            const thumborUrl = generateThumborUrl(`${mediaUrl}/${img}`, slideWidth, slideHeight);
            return `url("${thumborUrl}")`;
        }
        return 'url()';
    };

    return (
        <>
            {background_type === 'youtube' ? (
                <div style={{ height: `${slider_height}px` }}>
                    <iframe
                        style={{ width: '100%', height: '100%' }}
                        src={`https://www.youtube.com/embed/${youtube_id}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded Video"
                    />
                </div>
            ) : (
                <div
                    className="magezon-slide"
                    style={{ backgroundImage: getBackgroundImageUrl(background_type, image) }}
                >
                    <div className={`magezon-slide-captions ${content_position}`}>
                        <div>
                            {heading && (
                                <div className="magezon-slide-heading" data-animate={heading_animation}>
                                    <MagezonHeading
                                        text={heading}
                                        heading_type={heading_type}
                                        font_size={heading_font_size}
                                        color={heading_color}
                                        font_weight={heading_font_weight}
                                    />
                                </div>
                            )}
                            {caption1 && (
                                <div className="magezon-slide-caption1" data-animate={caption1_animation}>
                                    <MagezonHeading
                                        text={caption1}
                                        heading_type={caption1_type}
                                        font_size={caption1_font_size}
                                        color={caption1_color}
                                        font_weight={caption1_font_weight}
                                    />
                                </div>
                            )}
                            {caption2 && (
                                <div className="magezon-slide-caption2" data-animate={caption2_animation}>
                                    <MagezonHeading
                                        text={caption2}
                                        heading_type={caption2_type}
                                        font_size={caption2_font_size}
                                        color={caption2_color}
                                        font_weight={caption2_font_weight}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <style jsx>
                {`
                    .magezon-slide-content-wrapper {
                        display: flex;
                        justify-content: flex-start;
                    }
                    .magezon-slide-captions {
                        max-width: ${content_wrapper_width}px;
                        display: flex;
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        margin: 0 auto;
                        top: 0;
                        left: 0;
                        right: 0;
                    }
                    .magezon-slide-captions > div {
                        max-width: ${content_width}px;
                        text-align: ${content_align};
                        padding: ${content_padding}px;
                    }
                    .magezon-slide-heading {
                        background-color: ${heading_bg_color};
                    }
                    .magezon-slide-caption1 {
                        background-color: ${caption1_bg_color};
                    }
                    .magezon-slide-caption2 {
                        background-color: ${caption2_bg_color};
                    }
                    .magezon-slide-heading, .magezon-slide-caption1, .magezon-slide-caption2 {
                        margin-bottom: 5px;
                    }
                    .magezon-slide-heading :global(.magezone-heading :is(h1, h2, h3, h4, h5, h6)) {
                        line-height: ${heading_line_height}px;
                        padding: ${heading_padding}px;
                        margin: 0;
                    }
                    .magezon-slide-caption1 :global(.magezone-heading :is(h1, h2, h3, h4, h5, h6)) {
                        line-height: ${caption1_line_height}px;
                        padding: ${caption1_padding}px;
                        margin: 0;
                    }
                    .magezon-slide-caption2 :global(.magezone-heading :is(h1, h2, h3, h4, h5, h6)) {
                        line-height: ${caption2_line_height}px;
                        padding: ${caption2_padding}px;
                        margin: 0;
                    }
                    .magezon-slide-captions :global(.magezone-heading) {
                        justify-content: center;
                    }
                    .middle-center {
                        align-items: center;
                        justify-content: center;
                    }
                    .middle-left {
                        align-items: center;
                        justify-content: flex-start;
                    }
                    .middle-right {
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .top-left {
                        align-items: flex-start;
                        justify-content: flex-start;
                    }
                    .top-center {
                        align-items: flex-start;
                        justify-content: center;
                    }
                    .top-right {
                        align-items: flex-start;
                        justify-content: flex-end;
                    }
                    .bottom-left {
                        align-items: flex-end;
                        justify-content: flex-start;
                    }
                    .bottom-center {
                        align-items: flex-end;
                        justify-content: center;
                    }
                    .bottom-right {
                        align-items: flex-end;
                        justify-content: flex-end;
                    }
                `}
            </style>
        </>
    );
};

const useHoverStyle = (hoverEffect) => {
    let unhoverStyle = '';
    let hoverStyle = '';
    if (hoverEffect === 'zoomin' || hoverEffect === 'zoomout') {
        unhoverStyle = 'transition: transform 1s, filter 2s ease-in-out; transform-origin: center; transform: scale(1);';
        hoverStyle = 'transition: transform 1s, filter 2s ease-in-out; transform-origin: center;';
    }
    if (hoverEffect === 'zoomin') hoverStyle += 'transform: scale(1.02);';
    if (hoverEffect === 'zoomout') hoverStyle += 'transform: scale(0.98);';

    return { unhoverStyle, hoverStyle };
};

const MagezonSlider = (props) => {
    const {
        items, image_hover_effect,
        owl_nav, owl_dots, owl_lazyLoad, owl_loop, owl_autoplay, owl_autoplay_timeout, owl_rtl,
        owl_nav_position, owl_animate_in, owl_animate_out,
        slider_height,
    } = props;
    const { unhoverStyle, hoverStyle } = useHoverStyle(image_hover_effect);
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const slideHeight = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].height;
    const slideWidth = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].width;
    let sliderRef = useRef();

    console.log(props);

    const settings = {
        arrows: owl_nav_position === 'center_split',
        infinite: owl_loop,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: owl_autoplay,
        autoplaySpeed: owl_autoplay_timeout || 2000,
        pauseOnHover: true,
        lazyLoad: owl_lazyLoad,
        rtl: owl_rtl,
        beforeChange: (oldIdx, newIdx) => {
            const containerEl = sliderRef.innerSlider.list.querySelector(`[data-index="${newIdx}"] > div > div`);
            const prevContainerEl = sliderRef.innerSlider.list.querySelector(`[data-index="${oldIdx}"] > div > div`);

            if (owl_animate_out) {
                prevContainerEl.classList.add('animate__animated', `animate__${owl_animate_out}`);
                containerEl.classList.add('animate__animated', `animate__${owl_animate_in}`);

                if (prevContainerEl.classList.contains(`animate__${owl_animate_in}`)) {
                    prevContainerEl.classList.remove('animate__animated', `animate__${owl_animate_in}`);
                    prevContainerEl.classList.add('animate__animated', `animate__${owl_animate_out}`);
                }

                if (containerEl.classList.contains(`animate__${owl_animate_out}`)) {
                    containerEl.classList.remove('animate__animated', `animate__${owl_animate_out}`);
                    containerEl.classList.add('animate__animated', `animate__${owl_animate_in}`);
                }
            }

            const el = sliderRef.innerSlider.list.querySelectorAll(`
                [data-index="${newIdx}"] .magezon-slide-heading,
                [data-index="${newIdx}"] .magezon-slide-caption1,
                [data-index="${newIdx}"] .magezon-slide-caption2
            `);
            const prevEl = sliderRef.innerSlider.list.querySelectorAll(`
                [data-index="${oldIdx}"] .magezon-slide-heading,
                [data-index="${oldIdx}"] .magezon-slide-caption1,
                [data-index="${oldIdx}"] .magezon-slide-caption2
            `);

            prevEl.forEach((element) => {
                element.classList.remove('animate__animated', `animate__${element.dataset.animate}`);
            });

            setTimeout(() => {
                el.forEach((element) => {
                    const animValue = element.dataset.animate;
                    if (animValue) {
                        element.classList.add('animate__animated', `animate__${element.dataset.animate}`);
                    }
                });
            }, 1000);
        },
    };

    return (
        <>
            <div className="magezon-slider">
                {owl_nav_position.includes('top') && (
                    <div className="magezon-slider-nav-top-arrow">
                        <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickPrev()}>
                            <LeftArrowIcon />
                        </div>
                        <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickNext()}>
                            <RightArrowIcon />
                        </div>
                    </div>
                )}
                <div className="magezon-slider-inner">
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {items.map((item, i) => (
                            <MagezonSliderContent key={i} slider_height={slider_height} {...item} />
                        ))}
                    </Slider>
                </div>
                <div className="magezon-slider-nav-bottom">
                    {owl_nav_position.includes('bottom') && (
                        <div className="magezon-slider-nav-bottom-arrow">
                            <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickPrev()}>
                                <LeftArrowIcon />
                            </div>
                            <div className="magezon-slider-button-nav" onClick={() => sliderRef.slickNext()}>
                                <RightArrowIcon />
                            </div>
                        </div>
                    )}
                    {owl_dots && (
                        <div className="magezon-slider-nav-dots">
                            {items.map((item, index) => (
                                <div className="magezon-slider-nav-dots-item" key={index} onClick={() => sliderRef.slickGoTo(index)}>
                                    <span />
                                </div>
                            ))}
                        </div>

                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .magezon-slider-inner {
                        height: ${slider_height}px;
                    }
                    .magezon-slider-inner :global(.slick-slide) {
                        height: auto;
                    }
                    .magezon-slider-inner :global(.slick-track) {
                        height: ${slider_height}px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: center;
                        justify-content: center;
                    }
                    .magezon-slider-inner :global(.slick-arrow:before) {
                        font-size: 20px;
                    }
                    .magezon-slider-inner :global(.slick-arrow) {
                        z-index: 99;
                        ${owl_nav ? '' : 'display: none !important;'}
                    }
                    .magezon-slider-inner :global(.slick-arrow.slick-prev) {
                        left: 12px;
                    }
                    .magezon-slider-inner :global(.slick-arrow.slick-next) {
                        right: 12px;
                    }
                    .magezon-slider-inner :global(.magezon-slide) {
                        text-align: center;
                        position: relative;
                        padding-bottom: ${100 * (slideHeight / slideWidth)}%;
                        background-color: #ddd;
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        margin: 0 1px;
                        ${unhoverStyle}
                    }
                    .magezon-slider-inner :global(.magezon-slide:hover) {
                        ${hoverStyle}
                    }
                    @media screen and (min-width: 768px) {
                        .magezon-slider-inner :global(.slick-arrow:before) {
                            font-size: 24px;
                        }
                        .magezon-slider-inner :global(.slick-arrow.slick-prev) {
                            left: 16px;
                        }
                        .magezon-slider-inner :global(.slick-arrow.slick-next) {
                            right: 16px;
                        }
                    }
                    .magezon-slider-nav-top-arrow {
                        display: flex;
                        justify-content: ${owl_nav_position === 'top_left' ? 'flex-start' : owl_nav_position === 'top_right' ? 'flex-end' : 'space-between'};
                    }
                    .magezon-slider-nav-bottom-arrow {
                        display: flex;
                        justify-content: ${owl_nav_position === 'bottom_left' ? 'flex-start' : owl_nav_position === 'bottom_right' ? 'flex-end' : owl_nav_position === 'bottom_center' ? 'center' : 'space-between'};
                    }
                    .magezon-slider-button-nav {
                        background-color: #eee;
                        margin: 10px;
                        padding: 10px;
                    }
                    .magezon-slider-button-nav:hover {
                        cursor: pointer;
                    }
                    .magezon-slider-nav-bottom {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .magezon-slider-nav-dots {
                        min-width: 100px;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                    }
                    .magezon-slider-nav-dots-item {
                        background-color: black;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .magezon-slider-nav-dots-item span {
                        display: block;
                        width: 10px;
                        height: 10px;
                        background-color: #eee;
                        border-radius: 50px;
                    }
                    .magezon-slider-nav-dots-item:hover {
                        cursor: pointer;
                        background-color: white;
                    }
                    .magezon-slider-nav-dots-item:hover span {
                        background-color: black;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonSlider;
