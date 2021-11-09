import React from 'react';
import styles from './App.module.scss';
import Form from 'containers/Form';
import { getLocale } from 'locales';

const App = (): JSX.Element => {
  const loc = getLocale('en');
  
  return (
    <>
      <div className={styles.title}>{loc.title}</div>
      <Form/>
    </>
  );
}

export default App;
