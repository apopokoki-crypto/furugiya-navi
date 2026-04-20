const stores = [
  {
    id: 1,
    name: "RAGTIME",
    address: "東京都渋谷区神南1-12-11",
    genre: "アメカジ",
    lat: 35.6617,
    lng: 139.7019,
    description: "ヴィンテージアメカジ専門店。70〜90年代のアイテムが充実。"
  },
  {
    id: 2,
    name: "Chicago 下北沢店",
    address: "東京都世田谷区北沢2-25-12",
    genre: "古着全般",
    lat: 35.6615,
    lng: 139.6678,
    description: "大型古着店。ジャンルを問わず幅広いアイテムが揃う。"
  },
  {
    id: 3,
    name: "BerBerJin",
    address: "東京都渋谷区神宮前6-16-13",
    genre: "ヴィンテージ",
    lat: 35.6685,
    lng: 139.7075,
    description: "原宿のヴィンテージセレクトショップ。希少なデニムが人気。"
  },
  {
    id: 4,
    name: "KINJI 下北沢店",
    address: "東京都世田谷区北沢2-29-2",
    genre: "古着全般",
    lat: 35.6609,
    lng: 139.6682,
    description: "リーズナブルな価格帯の古着が豊富。初心者にもおすすめ。"
  },
  {
    id: 5,
    name: "フラミンゴ 下北沢店",
    address: "東京都世田谷区北沢2-26-4",
    genre: "古着全般",
    lat: 35.6612,
    lng: 139.6685,
    description: "カラフルで個性的な古着が揃う人気店。"
  },
  {
    id: 6,
    name: "2nd STREET 渋谷店",
    address: "東京都渋谷区宇田川町31-2",
    genre: "古着全般",
    lat: 35.6601,
    lng: 139.6980,
    description: "全国展開の大手古着チェーン。ブランド品から普段着まで幅広い。"
  },
  {
    id: 7,
    name: "Candy Mary",
    address: "東京都渋谷区神宮前4-26-28",
    genre: "ヴィンテージ",
    lat: 35.6692,
    lng: 139.7063,
    description: "原宿のヴィンテージ古着店。60〜80年代のガーリーな服が多い。"
  },
  {
    id: 8,
    name: "PRIMAL",
    address: "東京都渋谷区神宮前4-28-8",
    genre: "アメカジ",
    lat: 35.6695,
    lng: 139.7060,
    description: "ミリタリー・ワーク系アメカジのヴィンテージ専門店。"
  },
  {
    id: 9,
    name: "PASS THE BATON 表参道",
    address: "東京都渋谷区神宮前5-1-6",
    genre: "セレクト",
    lat: 35.6688,
    lng: 139.7098,
    description: "元の持ち主のストーリーが付いたユニークなリユースショップ。"
  },
  {
    id: 10,
    name: "CHICAGO 高円寺店",
    address: "東京都杉並区高円寺南3-59-9",
    genre: "古着全般",
    lat: 35.7056,
    lng: 139.6490,
    description: "高円寺の大型古着店。掘り出し物が見つかると評判。"
  },
  {
    id: 11,
    name: "アメリカ屋 高円寺",
    address: "東京都杉並区高円寺南4-24-8",
    genre: "アメカジ",
    lat: 35.7048,
    lng: 139.6495,
    description: "アメリカ直輸入のヴィンテージアイテムが揃う老舗。"
  },
  {
    id: 12,
    name: "Flamingo 吉祥寺店",
    address: "東京都武蔵野市吉祥寺本町1-11-22",
    genre: "古着全般",
    lat: 35.7035,
    lng: 139.5797,
    description: "吉祥寺の人気古着店。トレンドを押さえたセレクト。"
  },
  {
    id: 13,
    name: "New York Joe Exchange 下北沢",
    address: "東京都世田谷区北沢3-26-4",
    genre: "セレクト",
    lat: 35.6603,
    lng: 139.6672,
    description: "交換・買取スタイルのユニークなセレクト古着店。状態の良いアイテムが多い。"
  },
  {
    id: 14,
    name: "WEGO 下北沢店",
    address: "東京都世田谷区北沢2-14-2",
    genre: "古着全般",
    lat: 35.6618,
    lng: 139.6680,
    description: "若者に人気のカジュアル古着チェーン。トレンドアイテムが豊富。"
  },
  {
    id: 15,
    name: "Ragtag 代官山店",
    address: "東京都渋谷区代官山町19-4",
    genre: "セレクト",
    lat: 35.6488,
    lng: 139.7030,
    description: "ブランド古着専門の高品質セレクトショップ。状態にこだわる人向け。"
  },
  {
    id: 16,
    name: "JAM 原宿店",
    address: "東京都渋谷区神宮前4-26-28",
    genre: "古着全般",
    lat: 35.6691,
    lng: 139.7058,
    description: "ボリューミーな品揃えで有名。掘り出し物探しが楽しい大型古着店。"
  },
  {
    id: 17,
    name: "KINJI 原宿店",
    address: "東京都渋谷区神宮前6-28-6",
    genre: "古着全般",
    lat: 35.6682,
    lng: 139.7072,
    description: "原宿の人気古着店。リーズナブルでトレンド感のあるアイテムが揃う。"
  },
  {
    id: 18,
    name: "2nd STREET 新宿店",
    address: "東京都新宿区新宿3-25-1",
    genre: "古着全般",
    lat: 35.6896,
    lng: 139.7006,
    description: "新宿の大型リサイクルショップ。ブランド品から普段着まで。"
  },
  {
    id: 19,
    name: "CHICAGO 新宿店",
    address: "東京都新宿区新宿3-7-3",
    genre: "古着全般",
    lat: 35.6901,
    lng: 139.7010,
    description: "新宿の大型古着店。幅広いジャンルのアイテムが揃う。"
  },
  {
    id: 20,
    name: "Hayatochiri 下北沢",
    address: "東京都世田谷区北沢2-6-6",
    genre: "ヴィンテージ",
    lat: 35.6622,
    lng: 139.6688,
    description: "ヨーロッパヴィンテージを中心にセレクト。個性的なアイテムが多い。"
  },
  {
    id: 21,
    name: "WEGO 原宿店",
    address: "東京都渋谷区神宮前1-14-30",
    genre: "古着全般",
    lat: 35.6712,
    lng: 139.7043,
    description: "原宿の若者向けカジュアル古着店。プチプラアイテムが豊富。"
  },
  {
    id: 22,
    name: "古着屋 パンドラ 中野店",
    address: "東京都中野区中野5-67-4",
    genre: "古着全般",
    lat: 35.7075,
    lng: 139.6657,
    description: "中野の地元密着型古着店。掘り出し物が多く常連客に人気。"
  },
  {
    id: 23,
    name: "Los Angeles 下北沢",
    address: "東京都世田谷区北沢2-37-2",
    genre: "アメカジ",
    lat: 35.6607,
    lng: 139.6675,
    description: "LA直輸入のアメカジヴィンテージ専門店。デニムやスウェットが充実。"
  },
  {
    id: 24,
    name: "Komehyo 新宿店",
    address: "東京都新宿区新宿3-22-7",
    genre: "セレクト",
    lat: 35.6893,
    lng: 139.7015,
    description: "ブランド品リユースの老舗。品質保証付きで安心して購入できる。"
  },
  {
    id: 25,
    name: "CHICAGO 吉祥寺店",
    address: "東京都武蔵野市吉祥寺本町1-8-8",
    genre: "古着全般",
    lat: 35.7040,
    lng: 139.5800,
    description: "吉祥寺の大型古着店。家族連れにも対応した幅広いラインナップ。"
  },
  {
    id: 26,
    name: "BINGO 三軒茶屋",
    address: "東京都世田谷区三軒茶屋1-38-3",
    genre: "ヴィンテージ",
    lat: 35.6432,
    lng: 139.6694,
    description: "三軒茶屋のこだわりヴィンテージショップ。希少な80〜90年代アイテムが揃う。"
  },
  {
    id: 27,
    name: "2nd STREET 池袋東口店",
    address: "東京都豊島区東池袋1-12-8",
    genre: "古着全般",
    lat: 35.7295,
    lng: 139.7130,
    description: "池袋の大型リサイクルショップ。アクセス抜群で使いやすい。"
  },
  {
    id: 28,
    name: "FILT 中目黒",
    address: "東京都目黒区上目黒2-43-16",
    genre: "セレクト",
    lat: 35.6438,
    lng: 139.6988,
    description: "中目黒のおしゃれなセレクト古着店。デザイナーズ古着も充実。"
  },
  {
    id: 29,
    name: "WEGO 吉祥寺店",
    address: "東京都武蔵野市吉祥寺本町1-5-1",
    genre: "古着全般",
    lat: 35.7038,
    lng: 139.5795,
    description: "吉祥寺の若者向け古着チェーン店。コスパの良いアイテムが豊富。"
  },
  {
    id: 30,
    name: "KINJI 高円寺店",
    address: "東京都杉並区高円寺南3-57-7",
    genre: "古着全般",
    lat: 35.7052,
    lng: 139.6492,
    description: "高円寺のリーズナブルな古着店。学生にも人気のコスパ重視の品揃え。"
  }
];
