import BannerCarousel from "./_components/BannerCarousel";

export default function Home() {
  const movies = [
    {
      name: "Demon Slayer: Kimetsu no Yaiba",
      date: "June 13, 2025",
      type: "Series",
      rating: "6.8/10",
      about:
        "After a demon attack leaves his family slain and his sister cursed, Tanjiro embarks upon a perilous journey to find a cure and to avenge.",
      img: "/assets/poster.jpg",
    },
    {
      name: "echo valley2",
      date: "June 13, 2025",
      type: "Movie",
      rating: "6.8/10",
      about:
        "Kate lives a secluded life—until her troubled daughter shows up, frightened and covered in someone else's blood. As Kate unravels the shocking truth, she learns just how far a mother will go to try to save her child.",
      img: "/assets/poster.jpg",
    },
    {
      name: "echo valley3",
      date: "June 13, 2025",
      type: "Movie",
      rating: "6.8/10",
      about:
        "Kate lives a secluded life—until her troubled daughter shows up, frightened and covered in someone else's blood. As Kate unravels the shocking truth, she learns just how far a mother will go to try to save her child.",
      img: "/assets/poster.jpg",
    },
  ];

  return (
    <div className="w-[80%] mx-auto">
      <BannerCarousel movies={movies} />
    </div>
  );
}
