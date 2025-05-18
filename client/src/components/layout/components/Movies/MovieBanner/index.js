import React from 'react';
import classNames from 'classnames/bind';
import styles from './MovieBanner.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

// Mock data - sẽ được thay thế bằng dữ liệu từ database sau này
const bannerMovies = [
    {
        id: 1,
        title: 'Snow White',
        backgroundImage: 'https://static.nutscdn.com/vimg/1920-0/14b31bb07f6db250fd72b91f468f930b.jpg',
        thumbnail: 'https://static.nutscdn.com/vimg/400-0/14b31bb07f6db250fd72b91f468f930b.jpg',
        imdb: '1.7',
        quality: '4K',
        duration: 'T13',
        year: '2025',
        genres: ['Chiếu Rạp', 'Gia Đình', 'Kỳ Ảo', 'Cổ Tích', 'Viễn Tưởng'],
        overview: 'Chuyển thể live-action của bộ phim hoạt hình Disney năm 1937 "Bạch Tuyết và bảy chú lùn".'
    },
    {
        id: 2,
        title: 'Kung Fu Panda 4',
        backgroundImage: 'https://static.nutscdn.com/vimg/1920-0/3f912f6db5f248397fe4140f01c1c374.jpg',
        thumbnail: 'https://static.nutscdn.com/vimg/400-0/3f912f6db5f248397fe4140f01c1c374.jpg',
        imdb: '1.7',
        quality: '4K',
        duration: 'T13',
        year: '2025',
        genres: ['Chiếu Rạp', 'Gia Đình', 'Kỳ Ảo', 'Cổ Tích', 'Viễn Tưởng'],
        overview: 'Chuyển thể live-action của bộ phim hoạt hình Disney năm 1937 "Bạch Tuyết và bảy chú lùn".'
    },
    {
        id: 3,
        title: 'Dune: Part Two',
        backgroundImage: 'https://static.nutscdn.com/vimg/1920-0/9ba596b8967e83efb593dede1641ad39.jpg',
        thumbnail: 'https://static.nutscdn.com/vimg/1920-0/9ba596b8967e83efb593dede1641ad39.jpg',
        imdb: '1.7',
        quality: '4K',
        duration: 'T13',
        year: '2025',
        genres: ['Chiếu Rạp', 'Gia Đình', 'Kỳ Ảo', 'Cổ Tích', 'Viễn Tưởng'],
        overview: 'Chuyển thể live-action của bộ phim hoạt hình Disney năm 1937 "Bạch Tuyết và bảy chú lùn".'
    },
    {
        id: 4,
        title: 'Civil War',
        backgroundImage: 'https://static.nutscdn.com/vimg/1920-0/9ba596b8967e83efb593dede1641ad39.jpg',
        thumbnail: 'https://static.nutscdn.com/vimg/1920-0/9ba596b8967e83efb593dede1641ad39.jpg',
        imdb: '1.7',
        quality: '4K',
        duration: 'T13',
        year: '2025',
        genres: ['Chiếu Rạp', 'Gia Đình', 'Kỳ Ảo', 'Cổ Tích', 'Viễn Tưởng'],
        overview: 'Chuyển thể live-action của bộ phim hoạt hình Disney năm 1937 "Bạch Tuyết và bảy chú lùn".'
    }
];

function MovieBanner() {
    const [currentMovie, setCurrentMovie] = React.useState(bannerMovies[0]);

    const handleThumbnailClick = (movie) => {
        setCurrentMovie(movie);
    };

    return (
        <div className={cx('wrapper', 'movie-banner')}>
            <div
                className={cx('banner')}
                style={{ backgroundImage: `url(${currentMovie.backgroundImage})` }}
            />
            <div className={cx('overlay')} />
            <div className={cx('content')}>
                <h1 className={cx('title')}>{currentMovie.title}</h1>
                <div className={cx('metadata')}>
                    <span className={cx('imdb')}>IMDB {currentMovie.imdb}</span>
                    <span className={cx('quality')}>{currentMovie.quality}</span>
                    <span className={cx('duration')}>{currentMovie.duration}</span>
                    <span className={cx('year')}>{currentMovie.year}</span>
                </div>
                <div className={cx('genres')}>
                    {currentMovie.genres?.map((genre, index) => (
                        <span key={index} className={cx('genre')}>{genre}</span>
                    ))}
                </div>
                <p className={cx('overview')}>{currentMovie.overview}</p>
            </div>
            <div className={cx('actions-thumbnails')}>
                <div className={cx('actions')}>
                    <button className={cx('play-btn')}>
                        <FontAwesomeIcon icon={faPlay} />
                        <span>Xem phim</span>
                    </button>
                    <button className={cx('favorite-btn')}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className={cx('info-btn')}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                </div>
                <div className={cx('thumbnails')}>
                    {bannerMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className={cx('thumbnail', { active: currentMovie.id === movie.id })}
                            onClick={() => handleThumbnailClick(movie)}
                        >
                            <img src={movie.thumbnail} alt={movie.title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieBanner; 