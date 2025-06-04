import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MovieCountryGrid.module.scss';
import MovieListByCountry from './MovieListByCountry';
import { countryItems } from '~/data/countryList';
import { fakeMoviesByCountry } from '~/data/fakeMoviesByCountry';

const cx = classNames.bind(styles);

function MovieCountryGrid() {
    // Chỉ hiển thị các quốc gia có dữ liệu phim giả
    const displayedCountries = countryItems.filter(c => fakeMoviesByCountry[c.path.replace('/quoc-gia/', '')]);

    return (
        <div className={cx('movie-country-grid')}>
            {displayedCountries.map((country) => {
                const countryKey = country.path.replace('/quoc-gia/', '');
                return (
                    <div key={countryKey} className={cx('country-block')}>
                        <div className={cx('country-info')}>
                            <h3 className={cx('section-title')}>
                                Phim {country.label} mới
                            </h3>
                            <Link to={country.path} className={cx('view-all-link')}>
                                Xem toàn bộ &gt;
                            </Link>
                        </div>
                        <MovieListByCountry movies={fakeMoviesByCountry[countryKey] || []} />
                    </div>
                );
            })}
        </div>
    );
}

export default MovieCountryGrid;
