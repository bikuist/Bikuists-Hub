// games.js

const GAMES_MANIFEST = [
    {
        id: 1,
        name: "1v1.LoL",
        url: "/assets/games/1v1.LoL.html"
    },
    {
        id: 2, 
        name: "2048",
        url: "/assets/games/2048.html"
    },
    {
        id: 3,
        name: "Basket Random",
        url: "/assets/games/Basket Random.html"
    },
    {
        id: 4, 
        name: "Buckshot Roulette",
        url: "/assets/games/Buckshot Roulette.html"
    },
    {
        id: 5, 
        name: "Car Rush",
        url: "/assets/games/Car Rush.html"
    },
    {
        id: 6,
        name: "Crazy Cars",
        url: "/assets/games/Crazy Cars.html"
    },
    {
        id: 7,
        name: "Crazy Cattle 3d",
        url: "/assets/games/Crazy Cattle 3d.html"
    },
    {
        id: 8,
        name: "Five Nights at Freddy's",
        url: "/assets/games/Five Nights at Freddy's.html"
    },
    {
        id: 9, 
        name: "Geometry Dash Lite",
        url: "/assets/games/Geometry Dash Lite.html"
    },
    {
        id: 10,
        name: "Half Life",
        url: "/assets/games/Half Life.html"
    },
    {
        id: 11, 
        name: "Minecraft 1.8.8",
        url: "/assets/games/Minecraft 1.8.8(1).html"
    },
    {
        id: 12, 
        name: "Monkey Mart",
        url: "/assets/games/Monkey Mart.html"
    },
    {
        id: 13,
        name: "Monster Tracks",
        url: "/assets/games/Monster Tracks.html"
    },
    {
        id: 14, 
        name: "Moto X3M",
        url: "/assets/games/Moto X3M 3.html"
    },
    {
        id: 15,
        name: "OvO",
        url: "/assets/games/OvO.html"
    },
    {
        id: 16, 
        name: "Paper.io 2",
        url: "/assets/games/Paper.io 2.html"
    },
    {
        id: 16.1,
        name: "Pizza Tower",
        url: "/assets/games/Pizza Tower.html"
    },
    {
        id: 17, 
        name: "Retro Bowl College",
        url: "/assets/games/Retro Bowl College.html"
    },
    {
        id: 18,
        name: "Sandboxels",
        url: "/assets/games/Sandboxels.html"
    },
    {
        id: 19,
        name: "Sandtris",
        url: "/assets/games/Sandtris.html"
    },
    {
        id: 20,
        name: "Slice It All",
        url: "/assets/games/Slice it All.html"
    },
    {
        id: 21,
        name: "Slope",
        url: "/assets/games/Slope.html"
    },
    {
        id: 22,
        name: "Snow Rider 3D",
        url: "/assets/games/Snow Rider 3D.html"
    },
    {
        id: 23, 
        name: "Soundboard",
        url: "/assets/games/Soundboard.html"
    },
    {
        id: 24, 
        name: "Stickman Hook",
        url: "/assets/games/Stickman Hook.html"
    },
    {
        id: 25,
        name: "Subway Surfers Houston",
        url: "/assets/games/Subway Surfers_ Houston.html"
    },
    {
        id: 26,
        name: "Superhot",
        url: "/assets/games/Superhot.html"
    },
    {
        id: 27,
        name: "The World's Hardest Game",
        url: "/assets/games/The World's Hardest Game.html"
    },
    {
        id: 28,
        name: "Time Shooter 2",
        url: "/assets/games/Time Shooter 2.html"
    },
    {
        id: 29,
        name: "Time Shooter 3 SWAT",
        url: "/assets/games/Time Shooter 3_ SWAT.html"
    },
    {
        id: 30, 
        name: "ULTRAKILL",
        url: "/assets/games/ULTRAKILL.html"
    },
    {
        id: 31,
        name: "Undertale",
        url: "/assets/games/Undertale.html"
    },
    {
        id: 32, 
        name: "Wordle",
        url: "/assets/games/Wordle.html"
    },
    {
        id: "34",
        name: "OMORI",
        url: "/assets/games/OMORI/index.html"
    }
];

function getGameDataById(id) {
    return GAMES_MANIFEST.find(game => game.id === parseInt(id));

}











