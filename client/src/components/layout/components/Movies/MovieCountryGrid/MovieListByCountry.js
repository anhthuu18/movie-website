import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MovieCountryGrid.module.scss';

const cx = classNames.bind(styles);
const CARD_WIDTH = 340;
const CARD_GAP = 32;
const VISIBLE_COUNT = 3;

function MovieListByCountry({ movies = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const maxIndex = Math.max(0, movies.length - VISIBLE_COUNT);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };
    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    return (
        <div className={cx('movie-slider-wrap')}>
            <button
                className={cx('slider-btn', 'slider-btn-prev')}
                onClick={handlePrev}
                disabled={currentIndex === 0}
            >
                &#60;
            </button>
            <div className={cx('movie-list-row', 'slider-row')} style={{ width: (CARD_WIDTH + CARD_GAP) * VISIBLE_COUNT - CARD_GAP }}>
                <div
                    className={cx('slider-inner')}
                    style={{
                        width: (CARD_WIDTH + CARD_GAP) * movies.length - CARD_GAP,
                        transform: `translateX(-${currentIndex * (CARD_WIDTH + CARD_GAP)}px)`
                    }}
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className={cx('movie-card')}>
                            <div className={cx('movie-thumb-wrap')}>
                                <img src={movie.thumb} alt={movie.title} className={cx('movie-thumb')} />
                            </div>
                            <div className={cx('movie-title')}>{movie.title}</div>
                            <div className={cx('movie-en-title')}>{movie.enTitle}</div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className={cx('slider-btn', 'slider-btn-next')}
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
            >
                &#62;
            </button>
        </div>
    );
}

export default MovieListByCountry; 