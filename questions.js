// 題庫：每題只描述「內容」，難度由前端依當下等級即時決定（見 docs/設計.md）
//
// kind    emoji=用 emoji 當圖 / color=色塊 / count=數量
// batch   第幾批。第一批一開始就能玩；第二批要三個第一批關卡都達 L3 才解鎖
// minLev  這個關卡的「起跳難度」——第二批從 L2 起跳（一開始就沒有中文提示）
// level   這題最早在第幾級出現

const TOPICS = [

  // ───────────── 第一批：起跳 L1，永遠開著，可以隨時回來複習 ─────────────
  {
    id: "animal", name: "動物", icon: "🐶", kind: "emoji", batch: 1, minLev: 1,
    items: [
      { word: "cat",    zh: "貓",   img: "🐱", level: 1, nearMiss: ["cap", "cow"] },
      { word: "dog",    zh: "狗",   img: "🐶", level: 1, nearMiss: ["duck", "doll"] },
      { word: "pig",    zh: "豬",   img: "🐷", level: 1, nearMiss: ["big", "pen"] },
      { word: "bird",   zh: "鳥",   img: "🐦", level: 1, nearMiss: ["bear", "bed"] },
      { word: "fish",   zh: "魚",   img: "🐟", level: 1, nearMiss: ["frog", "five"] },
      { word: "duck",   zh: "鴨",   img: "🦆", level: 2, nearMiss: ["dog", "dark"] },
      { word: "bear",   zh: "熊",   img: "🐻", level: 2, nearMiss: ["bird", "blue"] },
      { word: "frog",   zh: "青蛙", img: "🐸", level: 2, nearMiss: ["fish", "four"] },
      { word: "cow",    zh: "牛",   img: "🐮", level: 2, nearMiss: ["cat", "car"] },
      { word: "rabbit", zh: "兔子", img: "🐰", level: 3, nearMiss: ["red", "rat"] },
      { word: "tiger",  zh: "老虎", img: "🐯", level: 3, nearMiss: ["ten", "table"] },
      { word: "monkey", zh: "猴子", img: "🐵", level: 4, nearMiss: ["milk", "mouth"] }
    ]
  },
  {
    id: "color", name: "顏色", icon: "🎨", kind: "color", batch: 1, minLev: 1,
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
      { word: "brown",  zh: "棕色", img: "#8b5e34", level: 3, nearMiss: ["black", "orange"] },
      { word: "gray",   zh: "灰色", img: "#94a3b8", level: 4, nearMiss: ["green", "great"] },
      { word: "gold",   zh: "金色", img: "#d4af37", level: 4, nearMiss: ["cold", "green"] }
    ]
  },
  {
    id: "number", name: "數字", icon: "🔢", kind: "count", batch: 1, minLev: 1,
    items: [
      { word: "one",    zh: "1",  img: 1,  level: 1, nearMiss: ["on", "own"] },
      { word: "two",    zh: "2",  img: 2,  level: 1, nearMiss: ["ten", "too"] },
      { word: "three",  zh: "3",  img: 3,  level: 1, nearMiss: ["free", "tree"] },
      { word: "four",   zh: "4",  img: 4,  level: 1, nearMiss: ["five", "for"] },
      { word: "five",   zh: "5",  img: 5,  level: 1, nearMiss: ["four", "fish"] },
      { word: "six",    zh: "6",  img: 6,  level: 2, nearMiss: ["seven", "sit"] },
      { word: "seven",  zh: "7",  img: 7,  level: 2, nearMiss: ["six", "eleven"] },
      { word: "eight",  zh: "8",  img: 8,  level: 2, nearMiss: ["eighty", "ate"] },
      { word: "nine",   zh: "9",  img: 9,  level: 3, nearMiss: ["five", "night"] },
      { word: "ten",    zh: "10", img: 10, level: 3, nearMiss: ["two", "tent"] },
      { word: "eleven", zh: "11", img: 11, level: 4, nearMiss: ["seven", "elephant"] },
      { word: "twelve", zh: "12", img: 12, level: 4, nearMiss: ["twenty", "two"] }
    ]
  },

  // ───────────── 第二批：三個第一批關卡都到 L3 才解鎖，起跳 L2（沒有中文提示） ─────────────
  {
    id: "food", name: "食物", icon: "🍎", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "apple",  zh: "蘋果",   img: "🍎", level: 2, nearMiss: ["ant", "and"] },
      { word: "banana", zh: "香蕉",   img: "🍌", level: 2, nearMiss: ["bandana", "bag"] },
      { word: "milk",   zh: "牛奶",   img: "🥛", level: 2, nearMiss: ["silk", "monkey"] },
      { word: "egg",    zh: "蛋",     img: "🥚", level: 2, nearMiss: ["leg", "ear"] },
      { word: "rice",   zh: "飯",     img: "🍚", level: 2, nearMiss: ["mice", "nice"] },
      { word: "bread",  zh: "麵包",   img: "🍞", level: 3, nearMiss: ["red", "bird"] },
      { word: "water",  zh: "水",     img: "💧", level: 3, nearMiss: ["walk", "winter"] },
      { word: "cake",   zh: "蛋糕",   img: "🍰", level: 3, nearMiss: ["cat", "car"] },
      { word: "candy",  zh: "糖果",   img: "🍬", level: 4, nearMiss: ["cat", "sandy"] },
      { word: "noodle", zh: "麵",     img: "🍜", level: 4, nearMiss: ["nose", "needle"] }
    ]
  },
  {
    id: "body", name: "身體", icon: "🖐️", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "hand",  zh: "手",   img: "🖐️", level: 2, nearMiss: ["head", "hat"] },
      { word: "eye",   zh: "眼睛", img: "👁️", level: 2, nearMiss: ["ear", "I"] },
      { word: "ear",   zh: "耳朵", img: "👂", level: 2, nearMiss: ["eye", "eat"] },
      { word: "nose",  zh: "鼻子", img: "👃", level: 2, nearMiss: ["mouth", "no"] },
      { word: "mouth", zh: "嘴巴", img: "👄", level: 2, nearMiss: ["mouse", "month"] },
      { word: "foot",  zh: "腳",   img: "🦶", level: 3, nearMiss: ["food", "four"] },
      { word: "hair",  zh: "頭髮", img: "💇", level: 3, nearMiss: ["hand", "chair"] },
      { word: "tooth", zh: "牙齒", img: "🦷", level: 3, nearMiss: ["two", "tool"] },
      { word: "arm",   zh: "手臂", img: "💪", level: 4, nearMiss: ["ant", "art"] },
      { word: "leg",   zh: "腿",   img: "🦵", level: 4, nearMiss: ["egg", "let"] }
    ]
  },
  {
    id: "family", name: "家人", icon: "👨‍👩‍👧", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "mom",     zh: "媽媽",   img: "👩", level: 2, nearMiss: ["mouth", "man"] },
      { word: "dad",     zh: "爸爸",   img: "👨", level: 2, nearMiss: ["duck", "bad"] },
      { word: "baby",    zh: "寶寶",   img: "👶", level: 2, nearMiss: ["bear", "bay"] },
      { word: "sister",  zh: "姊妹",   img: "👧", level: 2, nearMiss: ["six", "sit"] },
      { word: "brother", zh: "兄弟",   img: "👦", level: 2, nearMiss: ["bread", "bird"] },
      { word: "grandma", zh: "奶奶",   img: "👵", level: 3, nearMiss: ["grandpa", "green"] },
      { word: "grandpa", zh: "爺爺",   img: "👴", level: 3, nearMiss: ["grandma", "grape"] },
      { word: "family",  zh: "家人",   img: "👨‍👩‍👧", level: 3, nearMiss: ["funny", "fish"] },
      { word: "friend",  zh: "朋友",   img: "🧒", level: 4, nearMiss: ["find", "frog"] },
      { word: "teacher", zh: "老師",   img: "🧑‍🏫", level: 4, nearMiss: ["tiger", "ten"] }
    ]
  },
  {
    id: "transport", name: "交通", icon: "🚗", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "car",   zh: "汽車",   img: "🚗", level: 2, nearMiss: ["cat", "cow"] },
      { word: "bus",   zh: "公車",   img: "🚌", level: 2, nearMiss: ["bird", "bag"] },
      { word: "bike",  zh: "腳踏車", img: "🚲", level: 2, nearMiss: ["bird", "back"] },
      { word: "train", zh: "火車",   img: "🚆", level: 2, nearMiss: ["rain", "tree"] },
      { word: "plane", zh: "飛機",   img: "✈️", level: 2, nearMiss: ["plate", "pink"] },
      { word: "boat",  zh: "船",     img: "⛵", level: 3, nearMiss: ["bird", "goat"] },
      { word: "truck", zh: "卡車",   img: "🚚", level: 3, nearMiss: ["train", "duck"] },
      { word: "taxi",  zh: "計程車", img: "🚕", level: 3, nearMiss: ["ten", "tiger"] },
      { word: "ship",  zh: "大船",   img: "🚢", level: 4, nearMiss: ["sheep", "shop"] },
      { word: "rocket",zh: "火箭",   img: "🚀", level: 4, nearMiss: ["rabbit", "red"] }
    ]
  },
  {
    id: "shape", name: "形狀", icon: "⭐", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "circle",   zh: "圓形",   img: "⭕", level: 2, nearMiss: ["cat", "color"] },
      { word: "square",   zh: "正方形", img: "🟥", level: 2, nearMiss: ["star", "sister"] },
      { word: "triangle", zh: "三角形", img: "🔺", level: 2, nearMiss: ["train", "three"] },
      { word: "star",     zh: "星形",   img: "⭐", level: 2, nearMiss: ["square", "sit"] },
      { word: "heart",    zh: "愛心",   img: "❤️", level: 2, nearMiss: ["hand", "hair"] },
      { word: "moon",     zh: "月形",   img: "🌙", level: 3, nearMiss: ["mom", "mouth"] },
      { word: "diamond",  zh: "菱形",   img: "🔷", level: 3, nearMiss: ["dad", "dog"] },
      { word: "line",     zh: "線",     img: "➖", level: 3, nearMiss: ["nine", "lion"] },
      { word: "oval",     zh: "橢圓",   img: "🥚", level: 4, nearMiss: ["apple", "over"] },
      { word: "arrow",    zh: "箭頭",   img: "➡️", level: 4, nearMiss: ["arm", "apple"] }
    ]
  },
  {
    id: "school", name: "學校", icon: "🎒", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "book",   zh: "書",   img: "📖", level: 2, nearMiss: ["boat", "bus"] },
      { word: "pen",    zh: "筆",   img: "🖊️", level: 2, nearMiss: ["pig", "pan"] },
      { word: "bag",    zh: "書包", img: "🎒", level: 2, nearMiss: ["bus", "big"] },
      { word: "chair",  zh: "椅子", img: "🪑", level: 2, nearMiss: ["hair", "cheer"] },
      { word: "desk",   zh: "桌子", img: "🗄️", level: 2, nearMiss: ["duck", "dog"] },
      { word: "pencil", zh: "鉛筆", img: "✏️", level: 3, nearMiss: ["pen", "pink"] },
      { word: "ruler",  zh: "尺",   img: "📏", level: 3, nearMiss: ["red", "rule"] },
      { word: "clock",  zh: "時鐘", img: "🕐", level: 3, nearMiss: ["black", "cloud"] },
      { word: "paper",  zh: "紙",   img: "📄", level: 4, nearMiss: ["pen", "pepper"] },
      { word: "scissors", zh: "剪刀", img: "✂️", level: 4, nearMiss: ["sister", "six"] }
    ]
  },
  {
    id: "weather", name: "天氣", icon: "☀️", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "sunny",  zh: "晴天",   img: "☀️", level: 2, nearMiss: ["snowy", "sun"] },
      { word: "rainy",  zh: "雨天",   img: "🌧️", level: 2, nearMiss: ["windy", "train"] },
      { word: "cloudy", zh: "陰天",   img: "☁️", level: 2, nearMiss: ["cold", "clock"] },
      { word: "windy",  zh: "颳風",   img: "🌬️", level: 2, nearMiss: ["rainy", "window"] },
      { word: "snowy",  zh: "下雪",   img: "❄️", level: 2, nearMiss: ["sunny", "slow"] },
      { word: "hot",    zh: "熱",     img: "🥵", level: 3, nearMiss: ["hat", "cold"] },
      { word: "cold",   zh: "冷",     img: "🥶", level: 3, nearMiss: ["gold", "cloudy"] },
      { word: "rainbow",zh: "彩虹",   img: "🌈", level: 3, nearMiss: ["rainy", "window"] },
      { word: "storm",  zh: "暴風雨", img: "⛈️", level: 4, nearMiss: ["star", "stone"] },
      { word: "foggy",  zh: "起霧",   img: "🌫️", level: 4, nearMiss: ["frog", "foot"] }
    ]
  }
];

const COUNT_EMOJI = ["🍎", "⭐", "🐟", "🎈", "🍓"];

// 第一批三個關卡都達到這個等級，就解鎖第二批
const UNLOCK_LEVEL = 3;
