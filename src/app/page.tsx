import BannerCarousel from "./_components/BannerCarousel";
import ListCarousel from "./_components/ListCarousel";
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import { MdOutlineLocalMovies } from "react-icons/md";
import { PiPopcorn } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

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
  const dummyAnimes = [
    {
      title: "Demon Slayer",
      image: "/assets/poster.jpg",
      year: 2020,
      type: "Movie",
    },
    {
      title: "Attack on Titan",
      image: "/assets/poster.jpg",
      year: 2020,
      type: "Movie",
    },
    {
      title: "Jujutsu Kaisen",
      image: "/assets/poster.jpg",
      year: 2020,
      type: "Movie",
    },
    {
      title: "One Piece",
      image: "/assets/poster.jpg",
      year: 2020,
      type: "Movie",
    },
    {
      title: "Spy x Family",
      image: "/assets/poster.jpg",
      year: 2020,
      type: "Movie",
    },
    { title: "Naruto", image: "/assets/poster.jpg", year: 2020, type: "Movie" },
  ];

  return (
    <div className="w-[80%] mx-auto pb-[10vh]">
      <BannerCarousel movies={movies} />
      <ListCarousel
        animes={dummyAnimes}
        title={"Continue Watching"}
        icon={<IoPlayCircleOutline />}
        height={"40"}
        itemsCountPerPage={6}
      />
      <ListCarousel
        animes={dummyAnimes}
        title={"trending now"}
        icon={<IoIosTrendingUp />}
        height={"80"}
        itemsCountPerPage={4}
      />
      <ListCarousel
        animes={dummyAnimes}
        title={"new releases"}
        icon={<IoAddCircleOutline />}
        height={"50"}
        itemsCountPerPage={2}
      />
      <ListCarousel
        animes={dummyAnimes}
        title={"popular shows"}
        icon={<MdOutlineLocalMovies />}
        height={"80"}
        itemsCountPerPage={4}
      />
      <ListCarousel
        animes={dummyAnimes}
        title={"coming soon"}
        icon={<PiPopcorn />}
        height={"80"}
        itemsCountPerPage={4}
      />
      <ListCarousel
        animes={dummyAnimes}
        title={"top rated shows"}
        icon={<FaRegStar />}
        height={"80"}
        itemsCountPerPage={4}
      />
      <ListCarousel
        animes={dummyAnimes}
        title={"what's popular"}
        icon={<MdOutlineLocalFireDepartment />}
        height={"30"}
        itemsCountPerPage={3}
      />
    </div>
  );
}
