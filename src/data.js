const data = {
    id1: {
      color: "#048170",
      size: 2,
      fontIcon: { text: 'fa-user', color: 'white' },
      data: {
        name: 'Amy Greenvale',
        phone: '232-235-8374',
        email: 'a.greenvale@this.gov',
        address: '6672 Ambassador Ave,\nGrand Ledge, MI\n48837',
      },
    },
    id2: {
      color: "#2dcda8",
      size: 1,
      fontIcon: { text: 'fa-user', color: 'white' },
      data: {
        name: 'Tim Tadgel',
        phone: '124-095-8356',
        email: 'thimthetadgel@gmail.com',
        address: '261 Central Plains Rd\nPalmyra, VA\n22963',
      },
    },
    id3: {
      color: "#2dcda8",
      size: 1,
      fontIcon: { text: 'fa-user', color: 'white' },
      data: {
        name: 'George White',
        phone: '213-475-5425',
        email: 'gowhite@live.us',
        address: '86 Reposo Dr\nOak View, CA\n93022',
      },
    },
    id4: {
      color: "#2dcda8",
      size: 1,
      fontIcon: { text: 'fa-user', color: 'white' },
      data: {
        name: 'Betty Buchanan',
        phone: '208-343-3912',
        email: 'betty@buchanan.me',
        address: '71 Litchfield St\nHartford, CT\n06112',
      },
    },
    id5: {
      color: "#2dcda8",
      size: 1,
      fontIcon: { text: 'fa-user', color: 'white' },
      data: {
        name: 'Helen Hoffman',
        phone: '279-696-6393',
        email: 'hhof342@uni.ac.uk',
        address: '4937 Old Way Rd\nBrowns Summit, NC\n27214',
      },
    },
    id6: {
      color: "#2dcda8",
      size: 1,
      fontIcon: { text: 'fa-user', color: 'white' },
      data: {
        name: 'Max Malone',
        phone: '214-953-3285',
        email: 'max-malone@rovano.com',
        address: '6241 Main St\nQueenstown, MD\n21658',
      },
    },
    id7: { id1: 'id1', id2: 'id2', color: "#606d7b", width: 4 },
    id8: { id1: 'id1', id2: 'id3', color: "#606d7b", width: 4 },
    id9: { id1: 'id1', id2: 'id4', color: "#606d7b", width: 4 },
    id10: { id1: 'id1', id2: 'id5', color: "#606d7b", width: 4 },
    id11: { id1: 'id1', id2: 'id6', color: "#606d7b", width: 4 },
  };
  
  const chartOptions = {
    dragPan: false,
    fit: 'none',
    iconFontFamily: 'Font Awesome 5 Free',
    imageAlignment: { 'fa-user': { size: 0.9, dy: -3 } },
    minZoom: 0.5,
    navigation: false,
  };
  
  export { data, chartOptions };
  