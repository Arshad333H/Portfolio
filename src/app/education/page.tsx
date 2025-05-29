import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
const Education = () => {
  const testimonials = [
    {
      quote:
        "I completed my schooling from Grade 1 to Grade 8 at Ravindra Bharathi School, located in Dilsuknagar,Hyderabad. Where I developed early interest in STEM subjects.",
      name: "Ravindra Bharathi School",
      designation: "Product Manager at TechFlow",
      src: "/RBS.png",
    },
    {
      quote:
        "I completed my 9th and 10th grade at Oxford Grammar High School, located in Hyderabad. Where I continued to strengthen my foundation in science and mathematics, and participated in various academic and co-curricular activities.",
      name: "Oxford Grammer High School",
      designation: "CTO at InnovateSphere",
      src: "/Oxford.avif",
    },
    {
      quote:
        "I completed my Intermediate education in the MPC (Maths, Physics, Chemistry) stream at Narayana Junior College, located in Dilsuknagar, Hyderabad.",
      name: "Narayana Junior College",
      designation: "Operations Director at CloudScale",
      src: "/Mpc.jpeg",
    },
    {
      quote:
        "I’m pursuing a Bachelor of Technology (B.Tech) in Computer Science at Sree Dattha Institute of Engineering and Science, located in Ibrahimpatnam.",
      name: "Sree Dattha Institute of Engineering and Science",
      designation: "Engineering Lead at DataPro",
      src: "/SDES.avif",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
};

export default Education;