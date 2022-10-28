import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Image from 'next/future/image';
import mahsaPic from '../public/mahsaamini.jpeg';
import wlfPic from '../public/wlf.png';
import Timeline from '../components/timeline';
import * as gtag from '../lib/gtag';

export default function Home() {
  const [detail, setDetail] = useState("1");

  const handleDetail = (value) => {
    gtag.event({
      action: 'set_detail',
      category: 'Engagement',
      label: value,
    });

    setDetail(value);
  }

  return (
    <div className={styles.main}>
      <div className={styles.vline}></div>
      <div className={styles.intro}>
        <div className={styles.imageContainer}>
          <Image
            src={mahsaPic}
            alt="Mahsa Amini"
            className={styles.introImage}
            width={700}
            height={394}
            priority={true}
          />
        </div>
        <div className={styles.introText}>
          <p className={styles.mahsaAmini}>مهسا (ژینا) امینی</p>
          <p className={styles.mahsaDate}>۳۰ شهریور ۱۳۷۹ - ۲۵ شهریور ۱۴۰۱</p>
          <p>دختر ۲۲ سالهٔ ایرانی بود که در ۲۲ شهریور ۱۴۰۱ پس از دستگیری از سوی گشت ارشاد در تهران، در اثر ضربات مأموران گشت ارشاد و پلیس امنیت اخلاقی نظام جمهوری اسلامی ایران دچار شکستگی جمجمه و مرگ مغزی شد.</p>
          <p>مهسا امینی سه روز بعد، در ۲۵ شهریور ۱۴۰۱، بر اثر شدت جراحات ناشی از ضربات وارده در بیمارستان کسری تهران درگذشت. مرگ او موجب بروز واکنش‌ها و اعتراضات گسترده‌ای در نقاط مختلف ایران و جهان شد.</p>
          <div className={styles.introSource}>
            <span>از: </span>
            <a href="https://fa.wikipedia.org/wiki/%D9%85%D9%87%D8%B3%D8%A7_%D8%A7%D9%85%DB%8C%D9%86%DB%8C" target="_blank" rel="noopener noreferrer">ویکی‌پدیا</a>
          </div>
          <span className={styles.introDisclaimer}>* این روزشمار تنها تصویری کلی از روزهایی که گذشت ارائه می‌دهد و به مرور، تکمیل و اصلاح خواهد شد.</span>
        </div>
      </div>
      <div className={styles.settings}>
        <label className={styles.setting}><span>سطح جزئیات</span></label>
        <div id={styles.radios}>
          <label htmlFor="1" className={styles.option}>
            <input type="radio" name="mode" className={styles.input} id="1" value="1" onClick={() => handleDetail("1")} defaultChecked />
            <span>۱</span>
          </label>
          <label htmlFor="2" className={styles.option}>
            <input type="radio" name="mode" className={styles.input} id="2" value="2" onClick={() => handleDetail("2")} />
            <span>۲</span>
          </label>
          <label htmlFor="3" className={styles.option}>
            <input type="radio" name="mode" className={styles.input} id="3" value="3" onClick={() => handleDetail("3")} />
            <span>۳</span>
          </label>
        </div>
      </div>
      <Timeline detail={detail} />
      <div className={styles.wlfContainer}>
        <Image
          src={wlfPic}
          alt="Mahsa Amini"
          className={styles.wlfImage}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.footerSlogan}>
          <span className={styles.leftSlogan}>برای زن، زندگی، آزادی✌️ </span>
          <span className={styles.rightSlogan}>به نام ژینا</span>
        </div>
        <div className={styles.footerCredit}>
          <span>دیتا از کانال تلگرام <a href="https://t.me/VahidOnline" target="_blank" rel="noopener noreferrer">VahidOnline</a></span>
          <span>با الهام از ایده <a href="https://mahsaamini.notion.site/" target="_blank" rel="noopener noreferrer">روزشمار</a> <a href="https://twitter.com/cryptosamz">cryptosamz@</a></span>
          <span>با یاد <a href="https://youtu.be/zDSUzyUwOGQ?t=927" target="_blank" rel="noopener noreferrer">جادی</a> در آبان ۱۴۰۱ روی گیتهاب قرار گرفت</span>
        </div>
      </div>
    </div>
  );
}
