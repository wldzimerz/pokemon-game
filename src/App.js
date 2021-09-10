// import s from "./App.module.css";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import background from "./assets/bg3.jpg";

function App() {
  return (
    <>
      <Header title="Pokemon game" descr="Simple Triple Triad Card Game" />
      <Layout title="firstLayout title" descr="firstLayout descr" urlBg={background} />
      <Layout title="secondLayout title" descr="secondLayout descr" colorBg="#e2e2e2" />
      <Layout title="thirdLayout title" descr="thirdLayout descr" urlBg={background} />
      <Footer />
    </>
  );
}

export default App;
