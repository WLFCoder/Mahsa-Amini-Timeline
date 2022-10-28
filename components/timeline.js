import { DateTime } from "luxon";
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import Modal from '../components/modal';
import * as gtag from '../lib/gtag';
import styles from '../styles/Timeline.module.css';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Timeline({ detail }) {
    const { data, error } = useSWR('/api/staticdata', fetcher);
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [contentSource, setContentSource] = useState('');

    const toPersianNumeral = (en) => {
        return ("" + en).replace(/[0-9]/g, function (t) {
            return "۰۱۲۳۴۵۶۷۸۹".slice(+t, +t + 1);
        });
    }

    useEffect(() => {
        let items = []
        let date = '';
        let origin = DateTime.fromISO('2022-09-15');
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const f = i == 0 ? { year: 'numeric', month: 'long', day: 'numeric' } : { month: 'long', day: 'numeric' };
                let item = data[i];
                if (data && item.rank <= detail) {
                    const dt = DateTime.fromISO(item.event_date).setLocale('per');
                    const pd = dt.toLocaleString(f);
                    const w = dt.toFormat('ccc');
                    const endDate = dt.startOf('day');
                    const diff = endDate.diff(origin, 'days').days.toFixed();
                    if (pd != date) {
                        if (diff > 0) {
                            items.push(
                                <div className={styles.dateCol} key={item.id}>
                                    <span className={styles.date}>{w + ' ' + pd}</span>
                                    {diff > 0 && <span className={styles.day}>{diff > 0 ? "روز " + toPersianNumeral(diff) : ''}</span>}
                                </div>
                            );
                        } else {
                            items.push(
                                <div className={styles.dateCol} key={item.id}>
                                    <span className={styles.date + " " + styles.noDiff}>{w + ' ' + pd}</span>
                                </div>
                            );
                        }
                    }
                    if (item.branch == 1) {
                        items.push(
                            <div className={styles.events} key={'L' + item.id}>
                                <div className={styles.leftCol}>
                                    <span className={styles.title + " " + styles["r" + item.rank]} onClick={() => handleModal(item.title, item.text_entities, item.source)}>{item.title}</span>
                                </div>
                                <div className={styles.rightCol}>
                                    <span className={styles.title}></span>
                                </div>
                            </div>
                        );
                    } else {
                        items.push(
                            <div className={styles.events} key={'R' + item.id}>
                                <div className={styles.leftCol}>
                                    <span className={styles.title}></span>
                                </div>
                                <div className={styles.rightCol}>
                                    <span className={styles.title + " " + styles["r" + item.rank]} onClick={() => handleModal(item.title, item.text_entities, item.source)}>{item.title}</span>
                                </div>
                            </div>
                        );
                    }
                    if (pd != date) {
                        date = pd;
                    }
                }
            }
        }

        setItems(items);
    }, [data, detail]);

    const handleModal = (title, content, source) => {
        gtag.event({
            action: 'title_click',
            category: 'Engagement',
            label: title,
        });

        setShowModal(true);
        setModalContent(content);
        setContentSource(source);
    }

    //Handle the error state
    if (error) return <div>Failed to load</div>;
    //Handle the loading state
    if (!data) return <div>Loading...</div>;
    //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
    return (
        <div className={styles.container}>
            {contentSource && <Modal showModal={showModal} setShowModal={setShowModal} content={modalContent} source={contentSource} />}
            {items}
        </div>
    )
}