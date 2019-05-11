import React, { Component } from "react";

import styles from "../styles/pages/PageNotFound.module.css";

class PageNotFound extends Component{
    


    render() {
        return (
            <div className={styles.PageNotFound}>
            <section className={styles.Main}>
                <div>
                <h1 className={styles.header}>Page Not Found</h1>
                <h1 className={styles.smiley}> :( </h1>
                <h2 className={styles.info1}>
                The item or page you’re looking for
                </h2>
                <h2 className={styles.info2}>
                doesn’t exist, sorry. 
                </h2>
                <h2 className={styles.info3}>
                Please re-check your entries. 
                </h2>
                </div>
            </section>
            <aside className={styles.Illust}>
                <aside className={styles.image} />
            </aside>
            </div>
        );
        
    }
}
export default PageNotFound;
