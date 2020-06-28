import Head from "next/head";
import Header from "../components/header";
import { attributes, react as HomeContent } from "../content/home.md";
import { Container } from "@material-ui/core";

export default function Home() {
  let { title, cats } = attributes;
  return (
    <div className="container">
      <Head>
        <title>Puro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Container>
          <article>
            <h1>{title}</h1>
            <HomeContent />
            <ul>
              {cats.map((cat, k) => (
                <li key={k}>
                  <h2>{cat.name}</h2>
                  <p>{cat.description}</p>
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </main>
    </div>
  );
}
