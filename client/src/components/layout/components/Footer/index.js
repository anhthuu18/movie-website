import classNames from "classnames/bind";
import styles from './Footer.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTelegram, faThreads, faTiktok, faXing, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('row')}>
                    <div className={cx('top-banner')}>
                        <FontAwesomeIcon icon={faStar} className={cx('star-icon')} />
                        Hoàng Sa - Trường Sa là của Việt Nam!
                    </div>

                    <div className={cx('footer-1')}>
                        <div className={cx('logo')}>
                            <img src={images.logo1} alt="RoPhim" />
                        </div>
                        <div className={cx('social-links')}>
                            <a href="#" title="Telegram"><FontAwesomeIcon icon={faTelegram} /></a>
                            <a href="#" title="Twitter"><FontAwesomeIcon icon={faXing} /></a>
                            <a href="#" title="Facebook"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#" title="TikTok"><FontAwesomeIcon icon={faTiktok} /></a>
                            <a href="#" title="YouTube"><FontAwesomeIcon icon={faYoutube} /></a>
                            <a href="#" title="Threads"><FontAwesomeIcon icon={faThreads} /></a>
                            <a href="#" title="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                        </div>
                    </div>

                    <div className={cx('footer-menu')}>
                        <Link to="/hoi-dap">Hỏi Đáp</Link>
                        <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
                        <Link to="/dieu-khoan-su-dung">Điều khoản sử dụng</Link>
                        <Link to="/gioi-thieu">Giới thiệu</Link>
                        <Link to="/lien-he">Liên hệ</Link>
                    </div>
                    <div className={cx('footer-menu')}>
                        <Link to="/dongphim">Dongphim</Link>
                        <Link to="/ghienphim">Ghienphim</Link>
                        <Link to="/motphim">Motphim</Link>
                        <Link to="/subnhanh">Subnhanh</Link>
                    </div>
                </div>

                <div className={cx('footer-description')}>
                    RoPhim – Phim hay cả rổ - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
                </div>

                <div className={cx('footer-copyright')}>
                    © 2024 RoPhim
                </div>
            </div>
        </div>
    );
}

export default Footer;