import styles from '../styles/Modal.module.css';

export default function Modal({ showModal, setShowModal, content, source }) {

    const parseContent = (content) => {
        let text = [];
        for (let i = 0; i < content.length; i++) {
            let c = content[i];
            if (c.type == 'bold') {
                text.push(<span className={styles.bold}>{c.text}</span>)
            }
            if (c.type == 'italic') {
                text.push(<span className={styles.italic}>{c.text}</span>)
            }
            if (c.type == 'plain') {
                text.push(<span>{c.text}</span>)
            }
            if (c.type == 'text_link') {
                text.push(<a href={c.href} className={styles.link} target="_blank" rel="noopener noreferrer">{c.text}</a>)
            }
            if (c.type == 'link') {
                text.push(<a href={c.text} className={styles.link} target="_blank" rel="noopener noreferrer">{c.text}</a>)
            }
            if (c.type == 'hashtag') {
                text.push(<span className={styles.hashtag}>{c.text}</span>)
            }
            if (c.type == 'mention') {
                text.push(<span className={styles.mention}>{c.text}</span>)
            }
            if (c.type == 'email') {
                text.push(<a href={"mailto:" + c.text} className={styles.link} target="_blank" rel="noopener noreferrer">{c.text}</a>)
            }
        }
        return text;
    }

    return (
        <div id="msgModal" className={styles.modal + " " + (showModal ? styles.show : "")}>
            <div className={styles.modal_content}>
                <div>{parseContent(content)}</div>
            </div>
            <div className={styles.btn_wrapper}>
                <a onClick={() => setShowModal(false)} className={styles.btn + " " + styles.right} href={source} target="_blank" rel="noopener noreferrer">مشاهده در منبع</a>
                <a onClick={() => setShowModal(false)} className={styles.btn + " " + styles.left}>بستن</a>
            </div>
        </div>
    )
}