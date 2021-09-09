// import s from "./App.module.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import background from "./assets/bg3.jpg";

function App() {
  return (
    <>
      <Header title="Pokemon game" descr="Simple Triple Triad Card Game" />
      <Layout title="firstLayout title" descr="firstLayout descr" urlBg={background} colorBg="" />
      <Layout title="secondLayout title" descr="secondLayout descr" urlBg="" colorBg="#e2e2e2" />
      <Layout title="thirdLayout title" descr="thirdLayout descr" urlBg={background} colorBg="" />
      <Footer />
    </>
  );
}

export default App;
