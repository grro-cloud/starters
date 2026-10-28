import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <Layout title="Home" description="A Docusaurus documentation site running on Grro">
      <main className={styles.hero}>
        <h1>Docusaurus is running on Grro</h1>
        <p>
          Write Markdown in <code>docs/</code> and push. Edit <code>src/pages/index.tsx</code> to change
          this page.
        </p>
        <Link className="button button--primary button--lg" to="/docs/intro">
          Read the docs
        </Link>
      </main>
    </Layout>
  );
}
