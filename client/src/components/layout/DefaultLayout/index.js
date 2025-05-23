import classNames from "classnames/bind";
import styles from './DefaultLayout.module.scss';
import Header from "../components/Header";
import Footer from "../components/Footer";


const cx = classNames.bind(styles)
function DefaultLayout({children}) {
    //console.log('Rendering DefaultLayout');
    return ( 
        <div className={cx('wrapper')}>
            <Header/>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
     );
}

export default DefaultLayout;
