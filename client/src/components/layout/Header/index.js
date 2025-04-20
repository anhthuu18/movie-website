import classNames from "classnames/bind";
import styles from './Header.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faDownload, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);
function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Logo" />
                </div>
                <div className={cx('search')}>
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Tìm kiếm phim, diễn viên" className={cx('search-input')} />
                </div>
                <nav className={cx('main-menu')}>
                    <ul className={cx('menu-list')}>
                        <li className={cx('menu-item')}>
                            <Link to="/chu-de" className={cx('menu-link')}>Chủ Đề</Link>
                        </li>
                        <li className={cx('menu-item')}>
                            <Link to="/duyet-tim" className={cx('menu-link')}>Duyệt tìm</Link>
                        </li>
                        <li className={cx('menu-item')}>
                            <Link to="/phim-le" className={cx('menu-link')}>Phim Lẻ</Link>
                        </li>
                        <li className={cx('menu-item')}>
                            <Link to="/phim-bo" className={cx('menu-link')}>Phim Bộ</Link>
                        </li>
                        <li className={cx('menu-item')}>
                            <Link to="/quoc-gia" className={cx('menu-link')}>Quốc gia</Link>
                            <FontAwesomeIcon icon={faCaretDown}/>
                        </li>
                        <li className={cx('menu-item')}>
                            <Link to="/dien-vien" className={cx('menu-link')}>Diễn Viên</Link>
                        </li>
                        <li className={cx('menu-item')}>
                            <Link to="/lic-chieu" className={cx('menu-link')}>Lịch chiếu</Link>
                        </li>
                    </ul>
                    <div className={cx('download')}>
                        <FontAwesomeIcon icon={faDownload} />
                        <div>
                            <span>Tải ứng dụng</span>
                            <span>RoPhim</span>
                        </div>
                    </div>
                    <div className={cx('member')}>
                        <button className={cx('auth-button')}>
                            <FontAwesomeIcon icon={faUser} />
                            <span>Thành viên</span>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;