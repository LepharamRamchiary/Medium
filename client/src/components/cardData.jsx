import scren1 from "../assets/download.png";
import scren2 from "../assets/CSS-1600x900.png";
import avatar1 from "../assets/photo.jpg";
import avatar2 from "../assets/photo2.jpg";



export const cardData = [
    {
      id: 1,
      name: "Lepharam Ramchiary",
      title: "10 powerful phrases for proactive communication",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, deserunt tenetur est delectus temporibus accusantium atque voluptates veritatis quis dignissimos.",
      imageSrc: scren2,
      autherImage: avatar1,
      publicationDate: "2024-08-31"
    },
    {
      id: 2,
      name: "John Doe",
      title: "Understanding React Hooks",
      description: "Explore the basics of React Hooks and how they can simplify state management in functional components.",
      imageSrc: scren1,
      autherImage: avatar2, 
      publicationDate: "2024-08-31"
    },
    {
      id: 3,
      name: "John Wagen",
      title: " React Hooks",
      description: "Explore the basics of React Hooks and how they can simplify state management in functional components. You can import images in the way you described, but you should modify the cardData object to properly use the imported image variables. In your current approach, you're using curly braces around the image variables, which isn't necessary. Instead, use the variables directly.",
      imageSrc: scren1,
      autherImage: avatar1, 
      publicationDate: "2024-08-31"
    },
    {
      id: 4,
      name: "Manash Wary",
      title: "Css",
      description: "Explore the basics of React Hooks and how they can simplify state management in functional components. You don't need to change much here since ContentCard already accepts props for id, title, description, imageSrc, autherName, and autherImage. Make sure it's correctly using these props.",
      imageSrc: scren1,
      autherImage: avatar2, 
      publicationDate: "2024-08-31"
    },
  ];
  