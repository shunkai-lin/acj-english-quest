// 題庫：每題只描述「內容」，難度由前端依當下等級即時決定（見 docs/設計.md）
//
// kind    emoji=用 emoji 當圖 / color=色塊 / count=數量
// batch   第幾批。第一批一開始就能玩；第二批要三個第一批關卡都達 L3 才解鎖
// minLev  這個關卡的「起跳難度」——第二批從 L2 起跳（一開始就沒有中文提示）
// level   這題最早在第幾級出現
//
// 每個關卡固定 30 張字卡；每次出哪幾張由 SRS 間隔重複決定（見 index.html 的 pickCards）

// 寶可夢關卡用的小工具：只寫「英文名 + 圖鑑編號 + 等級」，中文名與官方美術圖直接吃 POKEMON_LIST
// （index.html 先載 pokemon-data.js 再載 questions.js，所以這裡拿得到）
const pk = (word, id, level) => {
  const p = POKEMON_LIST.find(x => x.id === id) || {};
  return { word, zh: p.name, img: p.img, level };
};

const TOPICS = [

  // ───────────── 第一批：起跳 L1，永遠開著，可以隨時回來複習 ─────────────
  {
    id: "animal", name: "動物", icon: "🐶", kind: "emoji", batch: 1, minLev: 1,
    items: [
      { word: "cat",     zh: "貓",     img: "🐱", level: 1, nearMiss: ["cap", "cow"] },
      { word: "dog",     zh: "狗",     img: "🐶", level: 1, nearMiss: ["duck", "doll"] },
      { word: "pig",     zh: "豬",     img: "🐷", level: 1, nearMiss: ["big", "pen"] },
      { word: "bird",    zh: "鳥",     img: "🐦", level: 1, nearMiss: ["bear", "bed"] },
      { word: "fish",    zh: "魚",     img: "🐟", level: 1, nearMiss: ["frog", "five"] },
      { word: "cow",     zh: "牛",     img: "🐮", level: 1, nearMiss: ["cat", "car"] },
      { word: "duck",    zh: "鴨",     img: "🦆", level: 2, nearMiss: ["dog", "dark"] },
      { word: "bear",    zh: "熊",     img: "🐻", level: 2, nearMiss: ["bird", "blue"] },
      { word: "frog",    zh: "青蛙",   img: "🐸", level: 2, nearMiss: ["fish", "four"] },
      { word: "horse",   zh: "馬",     img: "🐴", level: 2, nearMiss: ["house", "hot"] },
      { word: "sheep",   zh: "綿羊",   img: "🐑", level: 2, nearMiss: ["ship", "shop"] },
      { word: "mouse",   zh: "老鼠",   img: "🐭", level: 2, nearMiss: ["mouth", "monkey"] },
      { word: "lion",    zh: "獅子",   img: "🦁", level: 2, nearMiss: ["line", "light"] },
      { word: "bee",     zh: "蜜蜂",   img: "🐝", level: 2, nearMiss: ["bear", "big"] },
      { word: "rabbit",  zh: "兔子",   img: "🐰", level: 3, nearMiss: ["red", "rat"] },
      { word: "tiger",   zh: "老虎",   img: "🐯", level: 3, nearMiss: ["ten", "table"] },
      { word: "panda",   zh: "貓熊",   img: "🐼", level: 3, nearMiss: ["pan", "pink"] },
      { word: "snake",   zh: "蛇",     img: "🐍", level: 3, nearMiss: ["snack", "sneak"] },
      { word: "chicken", zh: "雞",     img: "🐔", level: 3, nearMiss: ["kitchen", "chick"] },
      { word: "turtle",  zh: "烏龜",   img: "🐢", level: 3, nearMiss: ["little", "tall"] },
      { word: "fox",     zh: "狐狸",   img: "🦊", level: 3, nearMiss: ["box", "four"] },
      { word: "owl",     zh: "貓頭鷹", img: "🦉", level: 3, nearMiss: ["all", "old"] },
      { word: "crab",    zh: "螃蟹",   img: "🦀", level: 3, nearMiss: ["cab", "grab"] },
      { word: "monkey",  zh: "猴子",   img: "🐵", level: 4, nearMiss: ["milk", "mouth"] },
      { word: "elephant",zh: "大象",   img: "🐘", level: 4, nearMiss: ["eleven", "egg"] },
      { word: "giraffe", zh: "長頸鹿", img: "🦒", level: 4, nearMiss: ["grape", "girl"] },
      { word: "zebra",   zh: "斑馬",   img: "🦓", level: 4, nearMiss: ["zero", "bear"] },
      { word: "whale",   zh: "鯨魚",   img: "🐳", level: 4, nearMiss: ["well", "wheel"] },
      { word: "penguin", zh: "企鵝",   img: "🐧", level: 4, nearMiss: ["pencil", "pen"] },
      { word: "butterfly", zh: "蝴蝶", img: "🦋", level: 4, nearMiss: ["butter", "bus"] }
    ]
  },
  {
    id: "color", name: "顏色", icon: "🎨", kind: "color", batch: 1, minLev: 1,
    items: [
      { word: "red",       zh: "紅色",     img: "#e63946", level: 1, nearMiss: ["pink", "orange"] },
      { word: "blue",      zh: "藍色",     img: "#1d6fe0", level: 1, nearMiss: ["black", "green"] },
      { word: "yellow",    zh: "黃色",     img: "#ffd60a", level: 1, nearMiss: ["orange", "white"] },
      { word: "green",     zh: "綠色",     img: "#2eb872", level: 1, nearMiss: ["blue", "gray"] },
      { word: "black",     zh: "黑色",     img: "#222831", level: 1, nearMiss: ["blue", "brown"] },
      { word: "white",     zh: "白色",     img: "#f8f9fa", level: 1, nearMiss: ["yellow", "gray"] },
      { word: "pink",      zh: "粉紅",     img: "#ff8fb1", level: 2, nearMiss: ["red", "purple"] },
      { word: "orange",    zh: "橘色",     img: "#ff8c42", level: 2, nearMiss: ["yellow", "red"] },
      { word: "purple",    zh: "紫色",     img: "#8b5cf6", level: 2, nearMiss: ["pink", "blue"] },
      { word: "brown",     zh: "棕色",     img: "#8b5e34", level: 2, nearMiss: ["black", "orange"] },
      { word: "gray",      zh: "灰色",     img: "#94a3b8", level: 2, nearMiss: ["green", "great"] },
      { word: "gold",      zh: "金色",     img: "#d4af37", level: 2, nearMiss: ["cold", "green"] },
      { word: "silver",    zh: "銀色",     img: "#c0c6cf", level: 2, nearMiss: ["seven", "sister"] },
      { word: "sky blue",  zh: "天藍",     img: "#7dd3fc", level: 3, nearMiss: ["blue", "sky"] },
      { word: "navy",      zh: "深藍",     img: "#1e3a8a", level: 3, nearMiss: ["nine", "nice"] },
      { word: "mint",      zh: "薄荷綠",   img: "#a7f3d0", level: 3, nearMiss: ["milk", "mind"] },
      { word: "lime",      zh: "萊姆綠",   img: "#a3e635", level: 3, nearMiss: ["line", "time"] },
      { word: "teal",      zh: "藍綠",     img: "#0d9488", level: 3, nearMiss: ["tail", "ten"] },
      { word: "peach",     zh: "蜜桃色",   img: "#ffcdb2", level: 3, nearMiss: ["pink", "beach"] },
      { word: "cream",     zh: "奶油色",   img: "#fff4d6", level: 3, nearMiss: ["green", "dream"] },
      { word: "coral",     zh: "珊瑚紅",   img: "#ff7f6e", level: 3, nearMiss: ["color", "car"] },
      { word: "rose",      zh: "玫瑰紅",   img: "#f43f5e", level: 3, nearMiss: ["nose", "red"] },
      { word: "olive",     zh: "橄欖綠",   img: "#7d8f28", level: 4, nearMiss: ["all", "oval"] },
      { word: "maroon",    zh: "暗紅",     img: "#7f1d1d", level: 4, nearMiss: ["moon", "brown"] },
      { word: "violet",    zh: "紫羅蘭",   img: "#7c3aed", level: 4, nearMiss: ["purple", "little"] },
      { word: "indigo",    zh: "靛藍",     img: "#4338ca", level: 4, nearMiss: ["window", "into"] },
      { word: "turquoise", zh: "土耳其藍", img: "#40e0d0", level: 4, nearMiss: ["teal", "tour"] },
      { word: "beige",     zh: "米色",     img: "#e8dcc0", level: 4, nearMiss: ["bag", "page"] },
      { word: "amber",     zh: "琥珀色",   img: "#f59e0b", level: 4, nearMiss: ["apple", "under"] },
      { word: "jade",      zh: "玉綠",     img: "#00a86b", level: 4, nearMiss: ["jam", "shade"] }
    ]
  },
  {
    id: "number", name: "數字", icon: "🔢", kind: "count", batch: 1, minLev: 1,
    items: [
      { word: "one",         zh: "1",   img: 1,   level: 1, nearMiss: ["on", "own"] },
      { word: "two",         zh: "2",   img: 2,   level: 1, nearMiss: ["ten", "too"] },
      { word: "three",       zh: "3",   img: 3,   level: 1, nearMiss: ["free", "tree"] },
      { word: "four",        zh: "4",   img: 4,   level: 1, nearMiss: ["five", "for"] },
      { word: "five",        zh: "5",   img: 5,   level: 1, nearMiss: ["four", "fish"] },
      { word: "zero",        zh: "0",   img: 0,   level: 1, nearMiss: ["hero", "six"] },
      { word: "six",         zh: "6",   img: 6,   level: 2, nearMiss: ["seven", "sit"] },
      { word: "seven",       zh: "7",   img: 7,   level: 2, nearMiss: ["six", "eleven"] },
      { word: "eight",       zh: "8",   img: 8,   level: 2, nearMiss: ["eighty", "ate"] },
      { word: "nine",        zh: "9",   img: 9,   level: 2, nearMiss: ["five", "night"] },
      { word: "ten",         zh: "10",  img: 10,  level: 2, nearMiss: ["two", "tent"] },
      { word: "eleven",      zh: "11",  img: 11,  level: 2, nearMiss: ["seven", "elephant"] },
      { word: "twelve",      zh: "12",  img: 12,  level: 2, nearMiss: ["twenty", "two"] },
      { word: "thirteen",    zh: "13",  img: 13,  level: 3, nearMiss: ["thirty", "three"] },
      { word: "fourteen",    zh: "14",  img: 14,  level: 3, nearMiss: ["forty", "four"] },
      { word: "fifteen",     zh: "15",  img: 15,  level: 3, nearMiss: ["fifty", "five"] },
      { word: "sixteen",     zh: "16",  img: 16,  level: 3, nearMiss: ["sixty", "six"] },
      { word: "seventeen",   zh: "17",  img: 17,  level: 3, nearMiss: ["seventy", "seven"] },
      { word: "eighteen",    zh: "18",  img: 18,  level: 3, nearMiss: ["eighty", "eight"] },
      { word: "nineteen",    zh: "19",  img: 19,  level: 3, nearMiss: ["ninety", "nine"] },
      { word: "twenty",      zh: "20",  img: 20,  level: 3, nearMiss: ["twelve", "ten"] },
      { word: "thirty",      zh: "30",  img: 30,  level: 4, nearMiss: ["thirteen", "three"] },
      { word: "forty",       zh: "40",  img: 40,  level: 4, nearMiss: ["fourteen", "four"] },
      { word: "fifty",       zh: "50",  img: 50,  level: 4, nearMiss: ["fifteen", "five"] },
      { word: "sixty",       zh: "60",  img: 60,  level: 4, nearMiss: ["sixteen", "six"] },
      { word: "seventy",     zh: "70",  img: 70,  level: 4, nearMiss: ["seventeen", "seven"] },
      { word: "eighty",      zh: "80",  img: 80,  level: 4, nearMiss: ["eighteen", "eight"] },
      { word: "ninety",      zh: "90",  img: 90,  level: 4, nearMiss: ["nineteen", "nine"] },
      { word: "one hundred", zh: "100", img: 100, level: 4, nearMiss: ["one", "hundred"] },
      { word: "one thousand",zh: "1000",img: 1000,level: 4, nearMiss: ["hundred", "thousand"] }
    ]
  },

  // ───────────── 第二批：三個第一批關卡都到 L3 才解鎖，起跳 L2（沒有中文提示） ─────────────
  {
    id: "food", name: "食物", icon: "🍎", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "apple",      zh: "蘋果",   img: "🍎", level: 2, nearMiss: ["ant", "and"] },
      { word: "banana",     zh: "香蕉",   img: "🍌", level: 2, nearMiss: ["bandana", "bag"] },
      { word: "milk",       zh: "牛奶",   img: "🥛", level: 2, nearMiss: ["silk", "monkey"] },
      { word: "egg",        zh: "蛋",     img: "🥚", level: 2, nearMiss: ["leg", "ear"] },
      { word: "rice",       zh: "飯",     img: "🍚", level: 2, nearMiss: ["mice", "nice"] },
      { word: "bread",      zh: "麵包",   img: "🍞", level: 2, nearMiss: ["red", "bird"] },
      { word: "water",      zh: "水",     img: "💧", level: 2, nearMiss: ["walk", "winter"] },
      { word: "cake",       zh: "蛋糕",   img: "🍰", level: 2, nearMiss: ["cat", "car"] },
      { word: "meat",       zh: "肉",     img: "🥩", level: 2, nearMiss: ["milk", "mat"] },
      { word: "juice",      zh: "果汁",   img: "🧃", level: 2, nearMiss: ["June", "use"] },
      { word: "soup",       zh: "湯",     img: "🍲", level: 2, nearMiss: ["soap", "shop"] },
      { word: "candy",      zh: "糖果",   img: "🍬", level: 3, nearMiss: ["cat", "sandy"] },
      { word: "noodle",     zh: "麵",     img: "🍜", level: 3, nearMiss: ["nose", "needle"] },
      { word: "grape",      zh: "葡萄",   img: "🍇", level: 3, nearMiss: ["grass", "great"] },
      { word: "orange",     zh: "柳橙",   img: "🍊", level: 3, nearMiss: ["apple", "onion"] },
      { word: "strawberry", zh: "草莓",   img: "🍓", level: 3, nearMiss: ["star", "berry"] },
      { word: "watermelon", zh: "西瓜",   img: "🍉", level: 3, nearMiss: ["water", "melon"] },
      { word: "cookie",     zh: "餅乾",   img: "🍪", level: 3, nearMiss: ["cake", "cool"] },
      { word: "ice cream",  zh: "冰淇淋", img: "🍦", level: 3, nearMiss: ["ice", "cream"] },
      { word: "cheese",     zh: "起司",   img: "🧀", level: 3, nearMiss: ["chair", "chess"] },
      { word: "carrot",     zh: "紅蘿蔔", img: "🥕", level: 3, nearMiss: ["car", "parrot"] },
      { word: "lemon",      zh: "檸檬",   img: "🍋", level: 3, nearMiss: ["melon", "lion"] },
      { word: "tomato",     zh: "番茄",   img: "🍅", level: 4, nearMiss: ["potato", "toy"] },
      { word: "potato",     zh: "馬鈴薯", img: "🥔", level: 4, nearMiss: ["tomato", "pot"] },
      { word: "corn",       zh: "玉米",   img: "🌽", level: 4, nearMiss: ["cold", "cone"] },
      { word: "hamburger",  zh: "漢堡",   img: "🍔", level: 4, nearMiss: ["ham", "hand"] },
      { word: "pizza",      zh: "披薩",   img: "🍕", level: 4, nearMiss: ["piece", "peas"] },
      { word: "chocolate",  zh: "巧克力", img: "🍫", level: 4, nearMiss: ["cookie", "clock"] },
      { word: "sandwich",   zh: "三明治", img: "🥪", level: 4, nearMiss: ["sand", "candy"] },
      { word: "honey",      zh: "蜂蜜",   img: "🍯", level: 4, nearMiss: ["money", "many"] }
    ]
  },
  {
    id: "body", name: "身體", icon: "🖐️", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "hand",     zh: "手",     img: "🖐️", level: 2, nearMiss: ["head", "hat"] },
      { word: "eye",      zh: "眼睛",   img: "👁️", level: 2, nearMiss: ["ear", "ice"] },
      { word: "ear",      zh: "耳朵",   img: "👂", level: 2, nearMiss: ["eye", "eat"] },
      { word: "nose",     zh: "鼻子",   img: "👃", level: 2, nearMiss: ["mouth", "rose"] },
      { word: "mouth",    zh: "嘴巴",   img: "👄", level: 2, nearMiss: ["mouse", "month"] },
      { word: "foot",     zh: "腳",     img: "🦶", level: 2, nearMiss: ["food", "four"] },
      { word: "hair",     zh: "頭髮",   img: "💇", level: 2, nearMiss: ["hand", "chair"] },
      { word: "tooth",    zh: "牙齒",   img: "🦷", level: 2, nearMiss: ["two", "tool"] },
      { word: "arm",      zh: "手臂",   img: "💪", level: 2, nearMiss: ["ant", "art"] },
      { word: "leg",      zh: "腿",     img: "🦵", level: 2, nearMiss: ["egg", "let"] },
      { word: "face",     zh: "臉",     img: "😊", level: 2, nearMiss: ["fish", "five"] },
      { word: "head",     zh: "頭",     img: "🧠", level: 3, nearMiss: ["hand", "hair"] },
      { word: "finger",   zh: "手指",   img: "☝️", level: 3, nearMiss: ["singer", "flower"] },
      { word: "toe",      zh: "腳趾",   img: "👣", level: 3, nearMiss: ["two", "toy"] },
      { word: "palm",     zh: "手掌",   img: "🤚", level: 3, nearMiss: ["park", "pam"] },
      { word: "tongue",   zh: "舌頭",   img: "👅", level: 3, nearMiss: ["tooth", "long"] },
      { word: "neck",     zh: "脖子",   img: "🧣", level: 3, nearMiss: ["nose", "net"] },
      { word: "back",     zh: "背",     img: "🔙", level: 3, nearMiss: ["bag", "black"] },
      { word: "tummy",    zh: "肚子",   img: "🫃", level: 3, nearMiss: ["mummy", "funny"] },
      { word: "heart",    zh: "心臟",   img: "❤️", level: 3, nearMiss: ["hair", "hurt"] },
      { word: "bone",     zh: "骨頭",   img: "🦴", level: 3, nearMiss: ["bowl", "phone"] },
      { word: "skin",     zh: "皮膚",   img: "🧴", level: 3, nearMiss: ["ski", "sing"] },
      { word: "shoulder", zh: "肩膀",   img: "🙆", level: 4, nearMiss: ["soldier", "should"] },
      { word: "lungs",    zh: "肺",     img: "🫁", level: 4, nearMiss: ["long", "lunch"] },
      { word: "eyebrow",  zh: "眉毛",   img: "🤨", level: 4, nearMiss: ["eye", "brown"] },
      { word: "cheek",    zh: "臉頰",   img: "😗", level: 4, nearMiss: ["chick", "cheese"] },
      { word: "chin",     zh: "下巴",   img: "🧔", level: 4, nearMiss: ["chick", "china"] },
      { word: "thumb",    zh: "大拇指", img: "👍", level: 4, nearMiss: ["drum", "dumb"] },
      { word: "blood",    zh: "血",     img: "🩸", level: 4, nearMiss: ["bread", "blue"] },
      { word: "nail",     zh: "指甲",   img: "💅", level: 4, nearMiss: ["mail", "name"] }
    ]
  },
  {
    // 「人物」：emoji 一定要每張都長得不一樣，否則同一張圖出現兩個選項就變成無解題。
    // 原本的 man/woman/son/daughter/uncle/aunt/cousin 在 emoji 上跟 mom/dad/sister/brother
    // 幾乎同圖（👩👧👦），六歲根本分不出來，改成圖像明確可辨的角色與職業。
    id: "family", name: "人物", icon: "👨‍👩‍👧", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "mom",        zh: "媽媽",   img: "👩", level: 2, nearMiss: ["mouth", "man"] },
      { word: "dad",        zh: "爸爸",   img: "👨", level: 2, nearMiss: ["duck", "bad"] },
      { word: "baby",       zh: "寶寶",   img: "👶", level: 2, nearMiss: ["bear", "bay"] },
      { word: "sister",     zh: "姊妹",   img: "👧", level: 2, nearMiss: ["six", "sit"] },
      { word: "brother",    zh: "兄弟",   img: "👦", level: 2, nearMiss: ["bread", "bird"] },
      { word: "grandma",    zh: "奶奶",   img: "👵", level: 2, nearMiss: ["grandpa", "green"] },
      { word: "grandpa",    zh: "爺爺",   img: "👴", level: 2, nearMiss: ["grandma", "grape"] },
      { word: "family",     zh: "一家人", img: "👨‍👩‍👧", level: 2, nearMiss: ["funny", "fish"] },
      { word: "friend",     zh: "朋友",   img: "🧑‍🤝‍🧑", level: 2, nearMiss: ["find", "frog"] },
      { word: "twins",      zh: "雙胞胎", img: "👯", level: 2, nearMiss: ["twelve", "wins"] },
      { word: "king",       zh: "國王",   img: "🤴", level: 2, nearMiss: ["ring", "kind"] },
      { word: "queen",      zh: "皇后",   img: "👸", level: 3, nearMiss: ["green", "clean"] },
      { word: "teacher",    zh: "老師",   img: "👩‍🏫", level: 3, nearMiss: ["tiger", "ten"] },
      { word: "doctor",     zh: "醫生",   img: "👨‍⚕️", level: 3, nearMiss: ["daughter", "dog"] },
      { word: "police",     zh: "警察",   img: "👮", level: 3, nearMiss: ["please", "place"] },
      { word: "worker",     zh: "工人",   img: "👷", level: 3, nearMiss: ["water", "walker"] },
      { word: "guard",      zh: "衛兵",   img: "💂", level: 3, nearMiss: ["garden", "hard"] },
      { word: "cook",       zh: "廚師",   img: "👨‍🍳", level: 3, nearMiss: ["book", "cookie"] },
      { word: "farmer",     zh: "農夫",   img: "👩‍🌾", level: 3, nearMiss: ["father", "far"] },
      { word: "singer",     zh: "歌手",   img: "👩‍🎤", level: 3, nearMiss: ["finger", "sister"] },
      { word: "pilot",      zh: "機師",   img: "👨‍✈️", level: 3, nearMiss: ["pile", "pirate"] },
      { word: "dancer",     zh: "舞者",   img: "💃", level: 3, nearMiss: ["danger", "dance"] },
      { word: "astronaut",  zh: "太空人", img: "👨‍🚀", level: 4, nearMiss: ["astro", "ant"] },
      { word: "scientist",  zh: "科學家", img: "👩‍🔬", level: 4, nearMiss: ["silent", "science"] },
      { word: "artist",     zh: "畫家",   img: "👨‍🎨", level: 4, nearMiss: ["art", "arm"] },
      { word: "judge",      zh: "法官",   img: "👩‍⚖️", level: 4, nearMiss: ["jump", "juice"] },
      { word: "student",    zh: "學生",   img: "🧑‍🎓", level: 4, nearMiss: ["stand", "study"] },
      { word: "clown",      zh: "小丑",   img: "🤡", level: 4, nearMiss: ["cloud", "crown"] },
      { word: "ninja",      zh: "忍者",   img: "🥷", level: 4, nearMiss: ["nine", "ginger"] },
      { word: "superhero",  zh: "超人",   img: "🦸", level: 4, nearMiss: ["super", "hero"] }
    ]
  },
  {
    id: "transport", name: "交通", icon: "🚗", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "car",        zh: "汽車",   img: "🚗", level: 2, nearMiss: ["cat", "cow"] },
      { word: "bus",        zh: "公車",   img: "🚌", level: 2, nearMiss: ["bird", "bag"] },
      { word: "bike",       zh: "腳踏車", img: "🚲", level: 2, nearMiss: ["bird", "back"] },
      { word: "train",      zh: "火車",   img: "🚆", level: 2, nearMiss: ["rain", "tree"] },
      { word: "plane",      zh: "飛機",   img: "✈️", level: 2, nearMiss: ["plate", "pink"] },
      { word: "boat",       zh: "船",     img: "⛵", level: 2, nearMiss: ["bird", "goat"] },
      { word: "truck",      zh: "卡車",   img: "🚚", level: 2, nearMiss: ["train", "duck"] },
      { word: "taxi",       zh: "計程車", img: "🚕", level: 2, nearMiss: ["ten", "tiger"] },
      { word: "ship",       zh: "大船",   img: "🚢", level: 2, nearMiss: ["sheep", "shop"] },
      { word: "rocket",     zh: "火箭",   img: "🚀", level: 2, nearMiss: ["rabbit", "red"] },
      { word: "scooter",    zh: "機車",   img: "🛵", level: 2, nearMiss: ["school", "shooter"] },
      { word: "helicopter", zh: "直升機", img: "🚁", level: 3, nearMiss: ["hello", "helper"] },
      { word: "subway",     zh: "捷運",   img: "🚇", level: 3, nearMiss: ["Sunday", "way"] },
      { word: "ambulance",  zh: "救護車", img: "🚑", level: 3, nearMiss: ["apple", "animal"] },
      { word: "fire truck", zh: "消防車", img: "🚒", level: 3, nearMiss: ["truck", "fire"] },
      { word: "police car", zh: "警車",   img: "🚓", level: 3, nearMiss: ["police", "car"] },
      { word: "tractor",    zh: "耕耘機", img: "🚜", level: 3, nearMiss: ["truck", "track"] },
      { word: "van",        zh: "廂型車", img: "🚐", level: 3, nearMiss: ["fan", "man"] },
      { word: "wheel",      zh: "輪子",   img: "🛞", level: 3, nearMiss: ["whale", "well"] },
      { word: "road",       zh: "馬路",   img: "🛣️", level: 3, nearMiss: ["red", "rode"] },
      { word: "bridge",     zh: "橋",     img: "🌉", level: 3, nearMiss: ["bread", "fridge"] },
      { word: "station",    zh: "車站",   img: "🚉", level: 3, nearMiss: ["stop", "nation"] },
      { word: "airport",    zh: "機場",   img: "🛫", level: 4, nearMiss: ["air", "port"] },
      { word: "ticket",     zh: "車票",   img: "🎫", level: 4, nearMiss: ["tiger", "pocket"] },
      { word: "sled",       zh: "雪橇",   img: "🛷", level: 4, nearMiss: ["sad", "slide"] },
      { word: "skateboard", zh: "滑板",   img: "🛹", level: 4, nearMiss: ["skate", "board"] },
      { word: "traffic light", zh: "紅綠燈", img: "🚦", level: 4, nearMiss: ["traffic", "light"] },
      { word: "seat belt",  zh: "安全帶", img: "💺", level: 4, nearMiss: ["seat", "belt"] },
      { word: "motorcycle", zh: "重機",   img: "🏍️", level: 4, nearMiss: ["motor", "bicycle"] },
      { word: "hot air balloon", zh: "熱氣球", img: "🎈", level: 4, nearMiss: ["ball", "moon"] }
    ]
  },
  {
    id: "shape", name: "形狀", icon: "⭐", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "circle",    zh: "圓形",   img: "⭕", level: 2, nearMiss: ["cat", "color"] },
      { word: "square",    zh: "正方形", img: "🟥", level: 2, nearMiss: ["star", "sister"] },
      { word: "triangle",  zh: "三角形", img: "🔺", level: 2, nearMiss: ["train", "three"] },
      { word: "star",      zh: "星形",   img: "⭐", level: 2, nearMiss: ["square", "sit"] },
      { word: "heart",     zh: "愛心",   img: "❤️", level: 2, nearMiss: ["hand", "hair"] },
      { word: "moon",      zh: "月形",   img: "🌙", level: 2, nearMiss: ["mom", "mouth"] },
      { word: "diamond",   zh: "菱形",   img: "🔷", level: 2, nearMiss: ["dad", "dog"] },
      { word: "line",      zh: "線",     img: "➖", level: 2, nearMiss: ["nine", "lion"] },
      { word: "oval",      zh: "橢圓",   img: "🥚", level: 2, nearMiss: ["apple", "over"] },
      { word: "arrow",     zh: "箭頭",   img: "➡️", level: 2, nearMiss: ["arm", "apple"] },
      { word: "big",       zh: "大的",   img: "🔵", level: 2, nearMiss: ["pig", "bag"] },
      { word: "small",     zh: "小的",   img: "🔹", level: 2, nearMiss: ["smell", "ball"] },
      { word: "long",      zh: "長的",   img: "📏", level: 3, nearMiss: ["line", "song"] },
      { word: "short",     zh: "短的",   img: "📐", level: 3, nearMiss: ["shirt", "sort"] },
      { word: "round",     zh: "圓的",   img: "🟠", level: 3, nearMiss: ["ground", "sound"] },
      { word: "flat",      zh: "扁的",   img: "🟨", level: 3, nearMiss: ["fat", "flag"] },
      { word: "thick",     zh: "厚的",   img: "📚", level: 3, nearMiss: ["chick", "thin"] },
      { word: "thin",      zh: "薄的",   img: "📃", level: 3, nearMiss: ["thick", "think"] },
      { word: "cube",      zh: "立方體", img: "🧊", level: 3, nearMiss: ["tube", "cup"] },
      { word: "ball",      zh: "球形",   img: "⚽", level: 3, nearMiss: ["bell", "bowl"] },
      { word: "box",       zh: "方盒",   img: "📦", level: 3, nearMiss: ["fox", "bus"] },
      { word: "ring",      zh: "環形",   img: "💍", level: 3, nearMiss: ["king", "rain"] },
      { word: "cross",     zh: "十字",   img: "✖️", level: 4, nearMiss: ["class", "grass"] },
      { word: "curve",     zh: "曲線",   img: "〰️", level: 4, nearMiss: ["cube", "cover"] },
      { word: "cylinder",  zh: "圓柱",   img: "🥫", level: 4, nearMiss: ["circle", "finder"] },
      { word: "wide",      zh: "寬的",   img: "🟫", level: 4, nearMiss: ["white", "ride"] },
      { word: "narrow",    zh: "窄的",   img: "🟩", level: 4, nearMiss: ["arrow", "nature"] },
      { word: "spiral",    zh: "螺旋",   img: "🌀", level: 4, nearMiss: ["spider", "square"] },
      { word: "rectangle", zh: "長方形", img: "🟦", level: 4, nearMiss: ["triangle", "tangle"] },
      { word: "pentagon",  zh: "五角形", img: "⬟", level: 4, nearMiss: ["penguin", "pencil"] }
    ]
  },
  {
    id: "school", name: "學校", icon: "🎒", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "book",       zh: "書",     img: "📖", level: 2, nearMiss: ["boat", "bus"] },
      { word: "pen",        zh: "筆",     img: "🖊️", level: 2, nearMiss: ["pig", "pan"] },
      { word: "bag",        zh: "書包",   img: "🎒", level: 2, nearMiss: ["bus", "big"] },
      { word: "chair",      zh: "椅子",   img: "🪑", level: 2, nearMiss: ["hair", "cheer"] },
      { word: "desk",       zh: "桌子",   img: "🗄️", level: 2, nearMiss: ["duck", "dog"] },
      { word: "pencil",     zh: "鉛筆",   img: "✏️", level: 2, nearMiss: ["pen", "pink"] },
      { word: "ruler",      zh: "尺",     img: "📏", level: 2, nearMiss: ["red", "rule"] },
      { word: "clock",      zh: "時鐘",   img: "🕐", level: 2, nearMiss: ["black", "cloud"] },
      { word: "paper",      zh: "紙",     img: "📄", level: 2, nearMiss: ["pen", "pepper"] },
      { word: "scissors",   zh: "剪刀",   img: "✂️", level: 2, nearMiss: ["sister", "six"] },
      { word: "eraser",     zh: "橡皮擦", img: "🧽", level: 2, nearMiss: ["ruler", "razor"] },
      { word: "crayon",     zh: "蠟筆",   img: "🖍️", level: 3, nearMiss: ["cry", "canyon"] },
      { word: "glue",       zh: "膠水",   img: "🧴", level: 3, nearMiss: ["blue", "glass"] },
      { word: "notebook",   zh: "筆記本", img: "📓", level: 3, nearMiss: ["book", "note"] },
      { word: "board",      zh: "黑板",   img: "🖼️", level: 3, nearMiss: ["bird", "bored"] },
      { word: "dictionary", zh: "字典",   img: "📕", level: 3, nearMiss: ["diary", "different"] },
      { word: "school",     zh: "學校",   img: "🏫", level: 3, nearMiss: ["cool", "spoon"] },
      { word: "teacher",    zh: "老師",   img: "🧑‍🏫", level: 3, nearMiss: ["tiger", "ten"] },
      { word: "student",    zh: "學生",   img: "🧑‍🎓", level: 3, nearMiss: ["stand", "study"] },
      { word: "homework",   zh: "作業",   img: "📝", level: 3, nearMiss: ["home", "work"] },
      { word: "test",       zh: "考試",   img: "🧾", level: 3, nearMiss: ["best", "text"] },
      { word: "library",    zh: "圖書館", img: "📚", level: 3, nearMiss: ["berry", "liberty"] },
      { word: "playground", zh: "遊樂場", img: "🛝", level: 4, nearMiss: ["play", "ground"] },
      { word: "lunch box",  zh: "便當盒", img: "🍱", level: 4, nearMiss: ["lunch", "box"] },
      { word: "bell",       zh: "鐘",     img: "🔔", level: 4, nearMiss: ["ball", "belt"] },
      { word: "calendar",   zh: "日曆",   img: "📅", level: 4, nearMiss: ["color", "cylinder"] },
      { word: "stapler",    zh: "釘書機", img: "📎", level: 4, nearMiss: ["staple", "simple"] },
      { word: "computer",   zh: "電腦",   img: "💻", level: 4, nearMiss: ["counter", "commuter"] },
      { word: "map",        zh: "地圖",   img: "🗺️", level: 4, nearMiss: ["mop", "cap"] },
      { word: "globe",      zh: "地球儀", img: "🌍", level: 4, nearMiss: ["glue", "glove"] }
    ]
  },
  {
    id: "weather", name: "天氣", icon: "☀️", kind: "emoji", batch: 2, minLev: 2,
    items: [
      { word: "sunny",     zh: "晴天",   img: "☀️", level: 2, nearMiss: ["snowy", "sun"] },
      { word: "rainy",     zh: "雨天",   img: "🌧️", level: 2, nearMiss: ["windy", "train"] },
      { word: "cloudy",    zh: "陰天",   img: "⛅", level: 2, nearMiss: ["cold", "clock"] },
      { word: "windy",     zh: "颳風",   img: "🌬️", level: 2, nearMiss: ["rainy", "window"] },
      { word: "snowy",     zh: "下雪",   img: "❄️", level: 2, nearMiss: ["sunny", "slow"] },
      { word: "hot",       zh: "熱",     img: "🥵", level: 2, nearMiss: ["hat", "cold"] },
      { word: "cold",      zh: "冷",     img: "🥶", level: 2, nearMiss: ["gold", "cloudy"] },
      { word: "rainbow",   zh: "彩虹",   img: "🌈", level: 2, nearMiss: ["rainy", "window"] },
      { word: "storm",     zh: "暴風雨", img: "⛈️", level: 2, nearMiss: ["star", "stone"] },
      { word: "foggy",     zh: "起霧",   img: "🌫️", level: 2, nearMiss: ["frog", "foot"] },
      { word: "warm",      zh: "溫暖",   img: "🌤️", level: 2, nearMiss: ["arm", "worm"] },
      { word: "cool",      zh: "涼爽",   img: "🌥️", level: 3, nearMiss: ["cold", "school"] },
      { word: "wet",       zh: "濕",     img: "💦", level: 3, nearMiss: ["net", "wait"] },
      { word: "dry",       zh: "乾",     img: "🏜️", level: 3, nearMiss: ["cry", "try"] },
      { word: "sun",       zh: "太陽",   img: "🌞", level: 3, nearMiss: ["son", "sunny"] },
      { word: "cloud",     zh: "雲",     img: "☁️", level: 3, nearMiss: ["cloudy", "loud"] },
      { word: "rain",      zh: "雨",     img: "💧", level: 3, nearMiss: ["train", "rainy"] },
      { word: "snow",      zh: "雪",     img: "🌨️", level: 3, nearMiss: ["slow", "know"] },
      { word: "wind",      zh: "風",     img: "🍃", level: 3, nearMiss: ["window", "windy"] },
      { word: "thunder",   zh: "打雷",   img: "🌩️", level: 3, nearMiss: ["under", "wonder"] },
      { word: "ice",       zh: "冰",     img: "🧊", level: 3, nearMiss: ["eyes", "nice"] },
      { word: "sky",       zh: "天空",   img: "🌌", level: 3, nearMiss: ["ski", "star"] },
      { word: "umbrella",  zh: "雨傘",   img: "☂️", level: 4, nearMiss: ["under", "brella"] },
      { word: "typhoon",   zh: "颱風",   img: "🌀", level: 4, nearMiss: ["balloon", "spoon"] },
      { word: "lightning", zh: "閃電",   img: "⚡", level: 4, nearMiss: ["light", "night"] },
      { word: "season",    zh: "季節",   img: "🍂", level: 4, nearMiss: ["reason", "sea"] },
      { word: "spring",    zh: "春天",   img: "🌸", level: 4, nearMiss: ["string", "sprint"] },
      { word: "summer",    zh: "夏天",   img: "🏖️", level: 4, nearMiss: ["swimmer", "winter"] },
      { word: "autumn",    zh: "秋天",   img: "🍁", level: 4, nearMiss: ["auto", "album"] },
      { word: "winter",    zh: "冬天",   img: "⛄", level: 4, nearMiss: ["water", "windy"] }
    ]
  },

  // ───────────── 第三批：新題型，起跳 L1（句子本身就比單字難，輔助先給滿） ─────────────
  //
  // kind=talk：上面先出一張情境圖 + 唸出「別人說的話」（ask），下面選正確的回答（word）
  //   ask/askZh = 對方說的話與中文；word/zh = 正確回答與中文；img = 回答用的小圖；scene = 上方情境圖
  // kind=pic ：圖是寶可夢官方美術圖（吃 POKEMON_LIST，questions.js 在 pokemon-data.js 之後載入）
  {
    id: "talk", name: "生活對話", icon: "💬", kind: "talk", batch: 3, minLev: 1,
    items: [
      { ask: "How are you?",            askZh: "你好嗎？",           scene: "🙋‍♀️",
        word: "I'm fine, thank you.",   zh: "我很好，謝謝",          img: "😊", level: 1 },
      { ask: "What's your name?",       askZh: "你叫什麼名字？",     scene: "👧",
        word: "My name is Amy.",        zh: "我叫 Amy",              img: "🪪", level: 1 },
      { ask: "How old are you?",        askZh: "你幾歲？",           scene: "🎈",
        word: "I'm six years old.",     zh: "我六歲",                img: "6️⃣", level: 1 },
      { ask: "Good morning!",           askZh: "早安！",             scene: "🌞",
        word: "Good morning, teacher!", zh: "老師早安！",            img: "🌅", level: 1 },
      { ask: "Thank you!",              askZh: "謝謝你！",           scene: "🎁",
        word: "You're welcome.",        zh: "不客氣",                img: "🤗", level: 1 },
      { ask: "Goodbye!",                askZh: "再見！",             scene: "🚶",
        word: "Bye-bye! See you tomorrow.", zh: "掰掰，明天見",      img: "👋", level: 1 },

      { ask: "What color is it?",       askZh: "這是什麼顏色？",     scene: "🖍️",
        word: "It's red.",              zh: "是紅色的",              img: "🔴", level: 2 },
      { ask: "What's this?",            askZh: "這是什麼？",         scene: "❓",
        word: "It's a dog.",            zh: "這是一隻狗",            img: "🐶", level: 2 },
      { ask: "How's the weather?",      askZh: "天氣怎麼樣？",       scene: "🌤️",
        word: "It's sunny today.",      zh: "今天是晴天",            img: "☀️", level: 2 },
      { ask: "Are you hungry?",         askZh: "你餓了嗎？",         scene: "🍜",
        word: "Yes, I'm hungry.",       zh: "對，我肚子餓了",        img: "🍽️", level: 2 },
      { ask: "Can I have some water?",  askZh: "可以給我一點水嗎？", scene: "🥛",
        word: "Sure, here you are.",    zh: "當然，給你",            img: "💧", level: 2 },
      { ask: "I'm sorry.",              askZh: "對不起。",           scene: "😔",
        word: "It's OK. Don't worry.",  zh: "沒關係，別擔心",        img: "🙆", level: 2 },
      { ask: "Nice to meet you.",       askZh: "很高興認識你。",     scene: "👫",
        word: "Nice to meet you, too.", zh: "我也很高興認識你",      img: "🤝", level: 2 },
      { ask: "What do you want to eat?", askZh: "你想吃什麼？",      scene: "🍱",
        word: "I want an apple, please.", zh: "我想要一顆蘋果",      img: "🍎", level: 2 },

      { ask: "Where are you going?",    askZh: "你要去哪裡？",       scene: "🚸",
        word: "I'm going to school.",   zh: "我要去學校",            img: "🏫", level: 3 },
      { ask: "What time is it?",        askZh: "現在幾點？",         scene: "⏰",
        word: "It's eight o'clock.",    zh: "八點了",                img: "🕗", level: 3 },
      { ask: "How much is it?",         askZh: "這個多少錢？",       scene: "🏪",
        word: "It's ten dollars.",      zh: "十塊錢",                img: "💰", level: 3 },
      { ask: "Do you like ice cream?",  askZh: "你喜歡冰淇淋嗎？",   scene: "😋",
        word: "Yes, I like it very much.", zh: "喜歡，我超喜歡的",   img: "🍦", level: 3 },
      { ask: "May I come in?",          askZh: "我可以進來嗎？",     scene: "🔔",
        word: "Yes, please come in.",   zh: "可以，請進",            img: "🚪", level: 3 },
      { ask: "Let's play together!",    askZh: "我們一起玩！",       scene: "🧸",
        word: "OK, that sounds fun!",   zh: "好啊，聽起來很好玩",    img: "🤸", level: 3 },
      { ask: "Happy birthday!",         askZh: "生日快樂！",         scene: "🎉",
        word: "Thank you! I'm so happy.", zh: "謝謝！我好開心",      img: "🎂", level: 3 },
      { ask: "What's your favorite animal?", askZh: "你最喜歡什麼動物？", scene: "🦁",
        word: "I like cats best.",      zh: "我最喜歡貓",            img: "🐱", level: 3 },

      { ask: "Where do you live?",      askZh: "你住在哪裡？",       scene: "🗺️",
        word: "I live in Tainan.",      zh: "我住在台南",            img: "🏠", level: 4 },
      { ask: "How do you go to school?", askZh: "你怎麼去學校？",    scene: "🛣️",
        word: "I go by bus.",           zh: "我搭公車",              img: "🚌", level: 4 },
      { ask: "What are you doing?",     askZh: "你在做什麼？",       scene: "🤔",
        word: "I'm reading a book.",    zh: "我在看書",              img: "📖", level: 4 },
      { ask: "What happened?",          askZh: "發生什麼事了？",     scene: "😢",
        word: "I hurt my knee.",        zh: "我的膝蓋受傷了",        img: "🩹", level: 4 },
      { ask: "Can you help me?",        askZh: "你可以幫我嗎？",     scene: "🙏",
        word: "Of course, no problem.", zh: "當然，沒問題",          img: "💪", level: 4 },
      { ask: "What day is it today?",   askZh: "今天星期幾？",       scene: "🗓️",
        word: "It's Monday.",           zh: "今天星期一",            img: "📅", level: 4 },
      { ask: "Good night!",             askZh: "晚安！",             scene: "🛏️",
        word: "Good night! Sweet dreams.", zh: "晚安，做個好夢",     img: "🌙", level: 4 },
      { ask: "Excuse me, where is the toilet?", askZh: "不好意思，廁所在哪裡？", scene: "🚻",
        word: "It's over there.",       zh: "在那邊",                img: "👉", level: 4 }
    ]
  },
  {
    id: "pokemon", name: "寶可夢", icon: "⚡", kind: "pic", batch: 3, minLev: 1,
    // 圖與中文名直接吃 pokemon-data.js 的 POKEMON_LIST（同一張官方美術圖，跟圖鑑裡看到的一樣）
    items: [
      pk("Pikachu",    25, 1), pk("Eevee",     133, 1), pk("Ditto",     132, 1),
      pk("Onix",       95, 1), pk("Mew",       151, 1), pk("Zubat",      41, 1),

      pk("Squirtle",    7, 2), pk("Bulbasaur",   1, 2), pk("Charmander",  4, 2),
      pk("Jigglypuff", 39, 2), pk("Meowth",     52, 2), pk("Psyduck",    54, 2),
      pk("Snorlax",   143, 2), pk("Gengar",     94, 2),

      pk("Magikarp",  129, 3), pk("Gyarados",  130, 3), pk("Machop",     66, 3),
      pk("Geodude",    74, 3), pk("Lapras",    131, 3), pk("Vulpix",     37, 3),
      pk("Growlithe",  58, 3), pk("Slowpoke",   79, 3),

      pk("Charizard",   6, 4), pk("Blastoise",   9, 4), pk("Venusaur",    3, 4),
      pk("Mewtwo",    150, 4), pk("Articuno",  144, 4), pk("Zapdos",    145, 4),
      pk("Moltres",   146, 4), pk("Dragonite", 149, 4)
    ]
  }
];

const COUNT_EMOJI = ["🍎", "⭐", "🐟", "🎈", "🍓"];

// 數量超過這個數就不排 emoji 了，直接顯示數字（30 個蘋果六歲也數不完）
const COUNT_MAX_EMOJI = 12;

// 第一批三個關卡都達到這個等級，就解鎖第二批
const UNLOCK_LEVEL = 3;
