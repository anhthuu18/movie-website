import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Dropdown from "~/components/Dropdown";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const countryItems = [
  { label: 'Anh', path: '/quoc-gia/anh' },
  { label: 'Canada', path: '/quoc-gia/canada' },
  { label: 'Hàn Quốc', path: '/quoc-gia/han-quoc' },
  { label: 'Hồng Kông', path: '/quoc-gia/hong-kong' },
  { label: 'Mỹ', path: '/quoc-gia/my' },
  { label: 'Nhật Bản', path: '/quoc-gia/nhat-ban' },
  { label: 'Pháp', path: '/quoc-gia/phap' },
  { label: 'Thái', path: '/quoc-gia/thai' },
  { label: 'Trung Quốc', path: '/quoc-gia/trung-quoc' },
  { label: 'Úc', path: '/quoc-gia/uc' },
  { label: 'Đài Loan', path: '/quoc-gia/dai-loan' },
  { label: 'Đức', path: '/quoc-gia/duc' },
];

const genreItems = [
  { label: 'Anime', path: '/the-loai/anime' },
  { label: 'Bí Ẩn', path: '/the-loai/bi-an' },
  { label: 'Chiến Tranh', path: '/the-loai/chien-tranh' },
  { label: 'Chiếu Rạp', path: '/the-loai/chieu-rap' },
  { label: 'Chuyển Thể', path: '/the-loai/chuyen-the' },
  { label: 'Chính Kịch', path: '/the-loai/chinh-kich' },
  { label: 'Chính Luận', path: '/the-loai/chinh-luan' },
  { label: 'Chính Trị', path: '/the-loai/chinh-tri' },
  { label: 'Cung Đấu', path: '/the-loai/cung-dau' },
  { label: 'Cuối Tuần', path: '/the-loai/cuoi-tuan' },
  { label: 'Cách Mạng', path: '/the-loai/cach-mang' },
  { label: 'Cổ Trang', path: '/the-loai/co-trang' },
  { label: 'Cổ Tích', path: '/the-loai/co-tich' },
  { label: 'Cổ Điển', path: '/the-loai/co-dien' },
  { label: 'DC', path: '/the-loai/dc' },
  { label: 'Disney', path: '/the-loai/disney' },
  { label: 'Gay Cấn', path: '/the-loai/gay-can' },
  { label: 'Gia Đình', path: '/the-loai/gia-dinh' },
  { label: 'Giáng Sinh', path: '/the-loai/giang-sinh' },
  { label: 'Giả Tưởng', path: '/the-loai/gia-tuong' },
  { label: 'Hoàng Cung', path: '/the-loai/hoang-cung' },
  { label: 'Hoạt Hình', path: '/the-loai/hoat-hinh' },
  { label: 'Hài', path: '/the-loai/hai' },
  { label: 'Hành Động', path: '/the-loai/hanh-dong' },
  { label: 'Hình Sự', path: '/the-loai/hinh-su' },
  { label: 'Học Đường', path: '/the-loai/hoc-duong' },
  { label: 'Khoa Học', path: '/the-loai/khoa-hoc' },
  { label: 'Kinh Dị', path: '/the-loai/kinh-di' },
  { label: 'Kinh Điển', path: '/the-loai/kinh-dien' },
  { label: 'Kịch Nói', path: '/the-loai/kich-noi' },
  { label: 'Kỳ Ảo', path: '/the-loai/ky-ao' },
  { label: 'LGBT+', path: '/the-loai/lgbt' },
  { label: 'Lãng Mạn', path: '/the-loai/lang-man' },
  { label: 'Lịch Sử', path: '/the-loai/lich-su' },
  { label: 'Marvel', path: '/the-loai/marvel' },
  { label: 'Miền Viễn Tây', path: '/the-loai/mien-vien-tay' },
  { label: 'Nghề Nghiệp', path: '/the-loai/nghe-nghiep' },
  { label: 'Nhạc Kịch', path: '/the-loai/nhac-kich' },
  { label: 'Phiêu Lưu', path: '/the-loai/phieu-luu' },
  { label: 'Phép Thuật', path: '/the-loai/phep-thuat' },
  { label: 'Siêu Anh Hùng', path: '/the-loai/sieu-anh-hung' },
  { label: 'Thiếu Nhi', path: '/the-loai/thieu-nhi' },
  { label: 'Thần Thoại', path: '/the-loai/than-thoai' },
  { label: 'Thể Thao', path: '/the-loai/the-thao' },
  { label: 'Truyền Hình Thực Tế', path: '/the-loai/truyen-hinh-thuc-te' },
  { label: 'Tuổi Trẻ', path: '/the-loai/tuoi-tre' },
  { label: 'Tài Liệu', path: '/the-loai/tai-lieu' },
  { label: 'Tâm Lý', path: '/the-loai/tam-ly' },
  { label: 'Tình Cảm', path: '/the-loai/tinh-cam' },
  { label: 'Tập Luyện', path: '/the-loai/tap-luyen' },
  { label: 'Viễn Tưởng', path: '/the-loai/vien-tuong' },
  { label: 'Võ Thuật', path: '/the-loai/vo-thuat' },
  { label: 'Xuyên Không', path: '/the-loai/xuyen-khong' },
  { label: 'Đau Thương', path: '/the-loai/dau-thuong' },
  { label: 'Đời Thường', path: '/the-loai/doi-thuong' },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cx("wrapper", {
      transparent: !isScrolled,
      scrolled: isScrolled
    })}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <img src={images.logo1} alt="Logo" />
        </div>
        <div className={cx("search")}>
          <FontAwesomeIcon icon={faSearch} className={cx("search-icon")} />
          <input
            type="text"
            placeholder="Tìm kiếm phim, diễn viên"
            className={cx("search-input")}
          />
        </div>
        <div className={cx("main-menu")}>
          <ul className={cx("menu-list")}>
            <li className={cx("menu-item")}>
              <Link to="/chu-de" className={cx("menu-link")}>
                Chủ Đề
              </Link>
            </li>
            <li className={cx("menu-item")}>
              <Dropdown title="Thể Loại" items={genreItems} type="genre" />
            </li>
            <li className={cx("menu-item")}>
              <Link to="/phim-le" className={cx("menu-link")}>
                Phim Lẻ
              </Link>
            </li>
            <li className={cx("menu-item")}>
              <Link to="/phim-bo" className={cx("menu-link")}>
                Phim Bộ
              </Link>
            </li>
            <li className={cx("menu-item")}>
              <Dropdown title="Quốc gia" items={countryItems} />
            </li>
            <li className={cx("menu-item")}>
              <Link to="/dien-vien" className={cx("menu-link")}>
                Diễn Viên
              </Link>
            </li>
            <li className={cx("menu-item")}>
              <Link to="/lic-chieu" className={cx("menu-link")}>
                Lịch chiếu
              </Link>
            </li>
          </ul>
          <div className={cx("download")}>
            <img
              src={images.download}
              alt="Download"
              className={cx("download-icon")}
            />
            <div className={cx("download-text")}>
              <span className={cx("download-text-1")}>Tải ứng dụng</span>
              <span className={cx("download-text-2")}>RoPhim</span>
            </div>
          </div>
          <div className={cx("member")}>
            <button className={cx("auth-button")}>
              <FontAwesomeIcon icon={faUser} className={cx("auth-icon")} />
              <span>Thành viên</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
