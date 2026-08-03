import Header from "./components/Header";
import SearchZone from "./components/SearchZone";

export default function App() {
  function handleSearch(city) {
    console.log("Search submitted:", city);
  }

  return (
    <div
      id="top"
      data-theme="scandium"
      className="min-h-screen text-base-content"
    >
      <Header />

      <main>
        <SearchZone onSearch={handleSearch} />
      </main>
    </div>
  );
}