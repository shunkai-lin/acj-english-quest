// 題庫：每題只描述「內容」，難度由前端依當下等級即時決定（見 docs/設計.md）
// kind: emoji=用 emoji 當圖 / color=色塊 / count=數量
// level: 這題最早在第幾級出現（1 最基礎）

const TOPICS = [
  {
    id: "animal", name: "動物", icon: "🐶", kind: "emoji",
    items: [
      { word: "cat",   zh: "貓",   img: "🐱", level: 1, nearMiss: ["cap", "cow"] },
      { word: "dog",   zh: "狗",   img: "🐶", level: 1, nearMiss: ["duck", "doll"] },
      { word: "pig",   zh: "豬",   img: "🐷", level: 1, nearMiss: ["big", "pen"] },
      { word: "bird",  zh: "鳥",   img: "🐦", level: 1, nearMiss: ["bear", "bed"] },
      { word: "fish",  zh: "魚",   img: "🐟", level: 1, nearMiss: ["frog", "five"] },
      { word: "duck",  zh: "鴨",   img: "🦆", level: 2, nearMiss: ["dog", "dark"] },
      { word: "bear",  zh: "熊",   img: "🐻", level: 2, nearMiss: ["bird", "blue"] },
      { word: "frog",  zh: "青蛙", img: "🐸", level: 2, nearMiss: ["fish", "four"] },
      { word: "cow",   zh: "牛",   img: "🐮", level: 2, nearMiss: ["cat", "car"] },
      { word: "rabbit",zh: "兔子", img: "🐰", level: 3, nearMiss: ["red", "rat"] }
    ]
  },
  {
    id: "color", name: "顏色", icon: "🎨", kind: "color",
    items: [
      { word: "red",    zh: "紅色", img: "#e63946", level: 1, nearMiss: ["pink", "orange"] },
      { word: "blue",   zh: "藍色", img: "#1d6fe0", level: 1, nearMiss: ["black", "green"] },
      { word: "yellow", zh: "黃色", img: "#ffd60a", level: 1, nearMiss: ["orange", "white"] },
      { word: "green",  zh: "綠色", img: "#2eb872", level: 1, nearMiss: ["blue", "gray"] },
      { word: "black",  zh: "黑色", img: "#222831", level: 1, nearMiss: ["blue", "brown"] },
      { word: "white",  zh: "白色", img: "#f8f9fa", level: 2, nearMiss: ["yellow", "gray"] },
      { word: "pink",   zh: "粉紅", img: "#ff8fb1", level: 2, nearMiss: ["red", "purple"] },
      { word: "orange", zh: "橘色", img: "#ff8c42", level: 2, nearMiss: ["yellow", "red"] },
      { word: "purple", zh: "紫色", img: "#8b5cf6", level: 3, nearMiss: ["pink", "blue"] },
      { word: "brown",  zh: "棕色", img: "#8b5e34", level: 3, nearMiss: ["black", "orange"] }
    ]
  },
  {
    id: "number", name: "數字", icon: "🔢", kind: "count",
    items: [
      { word: "one",   zh: "1",  img: 1,  level: 1, nearMiss: ["on", "own"] },
      { word: "two",   zh: "2",  img: 2,  level: 1, nearMiss: ["ten", "too"] },
      { word: "three", zh: "3",  img: 3,  level: 1, nearMiss: ["free", "tree"] },
      { word: "four",  zh: "4",  img: 4,  level: 1, nearMiss: ["five", "for"] },
      { word: "five",  zh: "5",  img: 5,  level: 1, nearMiss: ["four", "fish"] },
      { word: "six",   zh: "6",  img: 6,  level: 2, nearMiss: ["seven", "sit"] },
      { word: "seven", zh: "7",  img: 7,  level: 2, nearMiss: ["six", "eleven"] },
      { word: "eight", zh: "8",  img: 8,  level: 2, nearMiss: ["eighty", "ate"] },
      { word: "nine",  zh: "9",  img: 9,  level: 3, nearMiss: ["five", "night"] },
      { word: "ten",   zh: "10", img: 10, level: 3, nearMiss: ["two", "tent"] }
    ]
  }
];

const COUNT_EMOJI = ["🍎", "⭐", "🐟", "🎈", "🍓"];
