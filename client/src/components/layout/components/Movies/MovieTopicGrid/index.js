import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MovieTopicGrid.module.scss';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

// Dữ liệu tất cả các chủ đề
const allTopics = [
    { id: 1, name: 'Marvel', path: '/movies/marvel', color: '#4A90E2' },
    { id: 2, name: '4K', path: '/movies/4k', color: '#6C5CE7' },
    { id: 3, name: 'Sitcom', path: '/movies/sitcom', color: '#50E3C2' },
    { id: 4, name: 'Lồng Tiếng Cục', path: '/movies/long-tieng-cuc', color: '#9B59B6' },
    { id: 5, name: 'Xuyên Không', path: '/movies/xuyen-khong', color: '#E67E22' },
    { id: 6, name: 'Cổ Trang', path: '/movies/co-trang', color: '#E74C3C' },
    { id: 7, name: 'Phim Hành Động', path: '/movies/hanh-dong', color: '#F1C40F' },
    { id: 8, name: 'Kinh Dị', path: '/movies/kinh-di', color: '#8E44AD' },
    { id: 9, name: 'Hài Hước', path: '/movies/hai-huoc', color: '#27AE60' },
    { id: 10, name: 'Tài Liệu', path: '/movies/tai-lieu', color: '#D35400' },
];

function MovieTopicGrid({ showAll = false, title = 'Bạn đang quan tâm gì?' }) {
    // Lấy số lượng chủ đề cần hiển thị (6 nếu không showAll, tất cả nếu showAll)
    const displayedTopics = showAll ? allTopics : allTopics.slice(0, 6);

    return (
        <div className={cx('movie-topic-grid')}>
            <h3 className={cx('section-title')}>{title}</h3>
            <div className={cx('grid')}>
                {displayedTopics.map((topic) => (
                    <Link
                        key={topic.id}
                        to={topic.path}
                        className={cx('movie-topic-grid__item')}
                        style={{ backgroundColor: topic.color }}
                    >
                        <div className={cx('movie-topic-grid__item__title')}>
                            {topic.name}
                        </div>
                        <span className={cx('movie-topic-grid__item__view-all')}>
                            Xem chủ đề
                            <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                    </Link>
                ))}
            </div>
            {!showAll && (
                <Link to="/chu-de" className={cx('show-more-btn')}>
                    +4 chủ đề
                </Link>
            )}
        </div>
    );
}

export default MovieTopicGrid;