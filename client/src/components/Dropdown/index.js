import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Dropdown({ title, items, type = 'default' }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const menuClasses = cx('menu', {
        show: isOpen,
        'genre-menu': type === 'genre'
    });

    return (
        <div className={cx('wrapper')} ref={dropdownRef}>
            <button
                className={cx('dropdown-btn', { active: isOpen })}
                onClick={toggleDropdown}
            >
                {title}
                <FontAwesomeIcon icon={faCaretDown} className={cx('icon')} />
            </button>

            <div className={menuClasses}>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={cx('menu-item')}
                        onClick={() => setIsOpen(false)}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dropdown; 