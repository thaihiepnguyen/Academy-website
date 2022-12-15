import db from "../utils/db.js";

export default {
  findGeneralData() {
    return [
      {
        urlImage:
          "https://media.sketchfab.com/models/3f49271eb0dc404e87333baebca59886/thumbnails/914bdb37755946e8813325f9592bb0da/c09eace2ef6942268f325c369b1043e3.jpeg",
        nameCourse: "Unity 3D for dummies",
        level: "Beginner",
        star: ["checked", "checked", "checked", "checked", ""],
        reviews: 276,
        duration: 2,
        weekly: 3,
        enrolled: 4033,
        price: 20,
        discountTo: 5,
        timeLeft: "1 day 04:09:07",
        shortInfo:
          "You want to create your own game but dont know where to begin your journey? <br /> This is the course for you!",
        requirements:
          "_Basic knowledge about computer <br />_Have good internet connection",
        overview:
          "_In this course you will learn: <br />+Basic programming using C#, +Popular tools in Unity 3D <br />+Making 3 simple games with concept: 3d racing game, 2d action game and a top down rpg",
        includedItem:
          "_20 hours on-demand video <br />_2 articles <br />_10 quizzes <br />_Full lifetime access all resources in this course",
      },
    ];
  },
  findClip() {},
};
