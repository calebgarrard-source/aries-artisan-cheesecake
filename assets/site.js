/* Arie's Artisan Cheesecake: concept site. The page's own script, no build step.
   assets/motion/motion.js and assets/moments/moments.js run the motion layer and the two moments. */
(function () {
  'use strict';

  var STORE = 'https://ariesartisancheesecake.com';
  var IMG = 'assets/img/';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var money = function (n) { var v = Math.round(n * 100) / 100; return '$' + (v % 1 === 0 ? v : v.toFixed(2)); };
  var ICON = function (id) { return '<svg class="icon" aria-hidden="true"><use href="#' + id + '"/></svg>'; };

  /* ------------------------------------------------------------------
     Flavors. Names, descriptions and prices are from the shop's own online store
     (November 2026). Colors and layer drawings are this site's.
     ------------------------------------------------------------------ */
  var GRAHAM = '#C78B45', VCOOKIE = '#D9A75B', CHOC = '#3A2218', BISCOFF = '#A9642A', CREAM = '#FFFDF7';
  var F = [
    { slug: 'original', name: 'Original', deep: '#8C5410', tint: '#FBEBCB', mid: '#E9B45C', whole: 76, four: 16.99, handle: 'original',
      note: 'New York-style, creamy and rich',
      desc: 'The classic New York-style cheesecake: creamy and rich, made with farm-fresh eggs.',
      alt: 'A whole original New York-style cheesecake on a white stand',
      parts: [{ k: 'crust', c: GRAHAM, l: 'Crumb crust' }, { k: 'fill', c: '#FBEBC2', l: 'New York-style cheesecake' }] },
    { slug: 'vanilla-bean', name: 'Vanilla Bean', deep: '#6B4A2B', tint: '#F8EFD9', mid: '#D9B98A', whole: 82, four: 18.75, handle: 'vanilla-bean',
      note: 'Real vanilla bean, fresh whipped cream and berries',
      desc: 'Made with real vanilla bean, then finished with fresh whipped cream and berries.',
      alt: 'A whole vanilla bean cheesecake ringed with whipped cream and fresh berries',
      parts: [{ k: 'crust', c: GRAHAM, l: 'Crumb crust' }, { k: 'fill', c: '#FBF1D6', tex: 'speck', l: 'Vanilla bean cheesecake' },
        { k: 'top', c: CREAM, l: 'Fresh whipped cream and berries', g: [['cream', -15], ['blackberry', 5], ['blueberry', 19], ['mint', -2]] }] },
    { slug: 'strawberry', name: 'Strawberry', deep: '#C2202B', tint: '#FDDFDD', mid: '#F28C8F', whole: 82, four: 18.75, handle: 'strawberry-cheesecake',
      note: 'Vanilla bean cheesecake, fresh strawberry topping, graham cracker crust',
      desc: 'Vanilla bean cheesecake on a graham cracker crumb crust, with a strawberry topping made fresh in the kitchen.',
      alt: 'A whole strawberry cheesecake topped with fresh strawberries',
      parts: [{ k: 'crust', c: GRAHAM, l: 'Graham cracker crumb crust' }, { k: 'fill', c: '#FBF1D6', tex: 'speck', l: 'Vanilla bean cheesecake' },
        { k: 'cap', c: '#D8232F', l: 'Fresh strawberry topping', g: [['mint', 4]] }] },
    { slug: 'strawberry-crunch', name: 'Strawberry Crunch', deep: '#BE351E', tint: '#FEE0D5', mid: '#F59A7C', whole: 84, four: 20.88, handle: 'strawberry-crunch-cheesecake',
      note: 'Vanilla bean cheesecake between two layers of strawberry cake',
      desc: 'A spin on the strawberry shortcake ice cream bar: vanilla bean cheesecake between two layers of strawberry cake, finished with a crunchy strawberry and vanilla streusel.',
      alt: 'A whole strawberry crunch cheesecake coated in streusel, topped with whipped cream and strawberries',
      parts: [{ k: 'cake', c: '#E4553D', l: 'Strawberry cake' }, { k: 'fill', c: '#FBF1D6', l: 'Vanilla bean cheesecake', h: 30 }, { k: 'cake', c: '#E4553D', l: 'Strawberry cake' },
        { k: 'coat', c: '#F7B5A2', c2: '#FFF3EC', l: 'Strawberry and vanilla streusel', g: [['cream', -10], ['strawberry', 11]] }] },
    { slug: 'red-velvet', name: 'Red Velvet', deep: '#A1122B', tint: '#FADADD', mid: '#E8798A', whole: 84, four: 20.88, handle: 'red-velvet-cheesecake',
      note: 'Red velvet cake and smooth cheesecake, a Southern classic',
      desc: 'A Southern classic: red velvet cake and creamy, smooth cheesecake in one.',
      alt: 'A whole red velvet cheesecake with a slice cut and plated beside it',
      parts: [{ k: 'cake', c: '#A3122A', l: 'Red velvet cake', h: 20 }, { k: 'fill', c: '#FBEFD8', l: 'Creamy cheesecake' },
        { k: 'top', c: CREAM, g: [['cream', -9], ['rvcube', 10]] }] },
    { slug: 'key-lime', name: 'Key Lime', deep: '#44700F', tint: '#EAF3CB', mid: '#B5D56A', whole: 82, four: 18.75, handle: 'key-lime',
      note: 'Tangy key lime on a vanilla cookie crust',
      desc: 'Tangy key lime cheesecake on a vanilla cookie crust.',
      alt: 'A whole key lime cheesecake ringed with whipped cream and lime slices',
      parts: [{ k: 'crust', c: VCOOKIE, l: 'Vanilla cookie crust' }, { k: 'fill', c: '#EEF0BC', l: 'Key lime cheesecake' },
        { k: 'top', c: CREAM, g: [['cream', -8], ['lime', 13]] }] },
    { slug: 'lemon', name: 'Lemon', deep: '#7D6000', tint: '#FFF3B8', mid: '#F2D24B', whole: 82, four: 18.75, handle: 'lemon-cheesecake',
      note: 'Fresh lemons, tart and sweet, on a vanilla cookie crust',
      desc: 'Made with fresh lemons on a vanilla cookie crust. Tart, sweet and refreshing.',
      alt: 'A whole lemon cheesecake ringed with whipped cream and lemon slices',
      parts: [{ k: 'crust', c: VCOOKIE, l: 'Vanilla cookie crust' }, { k: 'fill', c: '#FBEEA2', l: 'Lemon cheesecake, made with fresh lemons' },
        { k: 'top', c: CREAM, g: [['cream', -8], ['lemon', 13]] }] },
    { slug: 'banana-pudding', name: 'Banana Pudding', deep: '#855D0C', tint: '#FCEEBF', mid: '#EFCB62', whole: 82, four: 18.75, handle: 'banana-pudding',
      note: 'Fresh banana purée, whipped cream and Nilla wafers',
      desc: 'A Southern classic made with fresh banana purée on a vanilla cookie crust, topped with fresh whipped cream and Nilla wafers.',
      alt: 'A whole banana pudding cheesecake ringed with whipped cream and Nilla wafers',
      parts: [{ k: 'crust', c: VCOOKIE, l: 'Vanilla cookie crust' }, { k: 'fill', c: '#F7E6AA', l: 'Cheesecake with fresh banana purée' },
        { k: 'top', c: '#E2A857', l: 'Fresh whipped cream and Nilla wafers', g: [['cream', -11], ['nilla', 11]] }] },
    { slug: 'cookies-cream', name: 'Cookies & Cream', deep: '#2E2729', tint: '#EFEBE8', mid: '#B9AFAE', whole: 82, four: 18.75, handle: 'cookies-cream',
      note: 'An Oreo crust, with crushed Oreos on top',
      desc: 'Velvety cookies and cream cheesecake on an Oreo cookie crust, topped with crushed Oreos.',
      alt: 'A whole cookies and cream cheesecake ringed with whipped cream and Oreo cookies',
      parts: [{ k: 'crust', c: '#2A2223', l: 'Oreo cookie crust' }, { k: 'fill', c: '#EEE8E2', tex: 'dark', l: 'Cookies and cream cheesecake' },
        { k: 'top', c: '#2A2223', l: 'Crushed Oreo cookies', g: [['cream', -10], ['oreo', 11], ['dust', 0]] }] },
    { slug: 'cookie-butter', name: 'Cookie Butter', deep: '#964A10', tint: '#F9E2C4', mid: '#E3A262', whole: 84, four: 20.88, handle: 'cookie-butter',
      note: 'Cookie butter, a Biscoff crust and Lotus cookies on top',
      desc: 'Cookie butter cheesecake on a Biscoff cookie crust, with a generous cookie butter drizzle and Lotus cookies.',
      alt: 'A whole cookie butter cheesecake with a cookie butter drip, whipped cream and Lotus cookies',
      parts: [{ k: 'crust', c: BISCOFF, l: 'Biscoff cookie crust' }, { k: 'fill', c: '#E9C799', l: 'Cookie butter cheesecake' },
        { k: 'cap', c: '#B9722E', l: 'Cookie butter drizzle' }, { k: 'top', c: '#B46A2C', l: 'Lotus cookies', g: [['cream', -12], ['biscoff', 10]] }] },
    { slug: 'salted-caramel', name: 'Salted Caramel', deep: '#9C4A0B', tint: '#FBE1BE', mid: '#EBA455', whole: 82, four: 18.75, handle: 'salted-caramel',
      note: 'House-made caramel and flaky sea salt',
      desc: 'Original cheesecake on a graham cracker crust, topped with house-made caramel sauce and flaky sea salt.',
      alt: 'A whole salted caramel cheesecake topped with caramel and flaky sea salt',
      parts: [{ k: 'crust', c: GRAHAM, l: 'Graham cracker crust' }, { k: 'fill', c: '#FBEBC2', l: 'Original cheesecake' },
        { k: 'cap', c: '#B5651D', l: 'House-made caramel sauce' }, { k: 'top', c: '#FFFFFF', l: 'Flaky sea salt', g: [['salt', 0]] }] },
    { slug: 'turtle', name: 'Turtle', deep: '#6A3410', tint: '#F3DEC6', mid: '#C98B55', whole: 84, four: 20.88, handle: 'turtle',
      note: 'Brown sugar cheesecake, toasted pecans, ganache and caramel',
      desc: 'A chocolate crust, brown sugar cheesecake and a layer of toasted pecans, finished with chocolate ganache and house-made caramel.',
      alt: 'A whole turtle cheesecake covered in pecans, chocolate ganache and caramel',
      parts: [{ k: 'crust', c: CHOC, l: 'Chocolate crust' }, { k: 'fill', c: '#EBD2A6', l: 'Brown sugar cheesecake', h: 30 }, { k: 'mid', c: '#8A5A2B', tex: 'nuts', l: 'Toasted pecans' },
        { k: 'cap', c: '#4B2A1B', l: 'Chocolate ganache' }, { k: 'top', c: '#C47A2C', l: 'House-made caramel sauce', g: [['drizzle', 0]] }] },
    { slug: 'triple-chocolate', name: 'Triple Chocolate', deep: '#4A2518', tint: '#EEDDD3', mid: '#B58168', whole: 84, four: 20.88, handle: 'triple-chocolate',
      note: 'Chocolate cheesecake, ganache and mousse on a chocolate crust',
      desc: 'Chocolate cheesecake on a chocolate crust, topped with house-made ganache, chocolate mousse, crisp pearls and shavings.',
      alt: 'A whole triple chocolate cheesecake with a ganache drip, mousse swirls and raspberries',
      parts: [{ k: 'crust', c: CHOC, l: 'Chocolate crust' }, { k: 'fill', c: '#7B4B36', l: 'Chocolate cheesecake' },
        { k: 'cap', c: '#4B2A1B', l: 'House-made chocolate ganache' }, { k: 'top', c: '#B98A6E', l: 'Chocolate mousse, crisp pearls and shavings', g: [['mousse', -9], ['shard', 11], ['pearls', 0]] }] },

    { slug: 'sweet-potato', name: 'Sweet Potato', seasonal: true, deep: '#A8480B', tint: '#FDE2C2', mid: '#F0A35A', whole: 86, four: 20.88, handle: 'seasonal-sweet-potato-cheesecake',
      note: 'Roasted sweet potato pie on vanilla bean cheesecake, under toasted meringue',
      desc: 'Roasted sweet potato pie baked on top of vanilla bean cheesecake, on a graham cracker crust. Each one is finished with fresh meringue, toasted for a marshmallow flavor.',
      alt: 'A sweet potato cheesecake with toasted meringue and a slice showing its layers',
      parts: [{ k: 'crust', c: GRAHAM, l: 'Graham cracker crust' }, { k: 'fill', c: '#FBF1D6', tex: 'speck', l: 'Vanilla bean cheesecake', h: 26 }, { k: 'mid', c: '#D9772B', l: 'Roasted sweet potato pie', h: 20 },
        { k: 'top', c: '#FFF4E0', l: 'Toasted meringue', g: [['meringue', 0]] }] },
    { slug: 'salted-caramel-apple', name: 'Salted Caramel Apple', seasonal: true, deep: '#8A4610', tint: '#F8E4BF', mid: '#DFA356', whole: 84, four: 20.88, handle: 'seasonal-salted-caramel-apple',
      note: 'Brown sugar and cinnamon cheesecake, salted caramel, apples and an oat crumble',
      desc: 'The fall favorite. Brown sugar and cinnamon cheesecake topped with house-made salted caramel and an apple filling, then a cinnamon oat crumble and caramel drizzle.',
      alt: 'A whole salted caramel apple cheesecake topped with oat crumble and caramel',
      parts: [{ k: 'crust', c: GRAHAM, l: 'Crumb crust' }, { k: 'fill', c: '#D9B68B', l: 'Brown sugar and cinnamon cheesecake' },
        { k: 'cap', c: '#C2832B', l: 'Salted caramel and apple filling' }, { k: 'top', c: '#B98548', l: 'Cinnamon oat crumble', g: [['crumble', 0]] }] },
    { slug: 'pumpkin-spice', name: 'Pumpkin Spice', seasonal: true, deep: '#A64A0A', tint: '#FCE0BD', mid: '#EFA04E', whole: 84, four: null, handle: 'seasonal-pumpkin-spice',
      note: 'Spiced pumpkin cheesecake on a Biscoff cookie crust',
      desc: 'Spiced pumpkin cheesecake baked on a Biscoff cookie crust.',
      alt: 'A whole pumpkin spice cheesecake ringed with whipped cream',
      parts: [{ k: 'crust', c: BISCOFF, l: 'Biscoff cookie crust' }, { k: 'fill', c: '#E39A4B', l: 'Spiced pumpkin cheesecake' },
        { k: 'top', c: CREAM, g: [['cream', -16], ['cream', 0], ['cream', 16]] }] },
    { slug: 'white-chocolate-raspberry', name: 'White Chocolate Raspberry', seasonal: true, deep: '#B01846', tint: '#FCDDE5', mid: '#EE7F9F', whole: 84, four: null, handle: 'white-chocolate-raspberry',
      note: 'White chocolate cheesecake with a raspberry swirl and fresh coulis',
      desc: 'White chocolate cheesecake baked with a raspberry swirl on a graham cracker crust, topped with raspberry coulis, whipped cream, raspberries and white chocolate shards.',
      alt: 'A whole white chocolate raspberry cheesecake with raspberry coulis, whipped cream and white chocolate',
      parts: [{ k: 'crust', c: GRAHAM, l: 'Graham cracker crust' }, { k: 'fill', c: '#FBEFD8', tex: 'swirl', l: 'White chocolate cheesecake, raspberry swirl' },
        { k: 'cap', c: '#C21846', l: 'Fresh raspberry coulis' }, { k: 'top', c: CREAM, l: 'Whipped cream, raspberries, white chocolate', g: [['cream', -14], ['raspberry', 3], ['wshard', 17]] }] }
  ];
  var CORE = F.filter(function (f) { return !f.seasonal; });
  var SEAS = F.filter(function (f) { return f.seasonal; });
  var BY = {};
  F.forEach(function (f, i) { BY[f.slug] = f; f.i = i; });

  var HAS_CLOSE = 'strawberry strawberry-crunch key-lime lemon banana-pudding cookies-cream cookie-butter salted-caramel turtle triple-chocolate red-velvet sweet-potato salted-caramel-apple pumpkin-spice white-chocolate-raspberry'.split(' ');
  var HAS_FOUR = 'cookies-cream key-lime red-velvet strawberry strawberry-crunch turtle original'.split(' ');

  /* Variant ids in the shop's own online store, so a finished box goes straight to its cart. */
  var BOX = {
    4: { price: 32, each: '$8', word: 'four', ids: { 'cookies-cream': '53225644622192', 'key-lime': '53225644654960', lemon: '53225644687728', original: '53225644720496', 'salted-caramel': '53225644753264', strawberry: '53225644786032', 'triple-chocolate': '53225644818800', turtle: '53225644851568', 'vanilla-bean': '53225644884336', 'strawberry-crunch': '53225644917104', 'red-velvet': '53225644949872', 'cookie-butter': '54000678633840', 'banana-pudding': '54000678666608' } },
    6: { price: 41, each: '$6.83', word: 'six', ids: { 'cookies-cream': '53224498790768', 'key-lime': '53224498823536', lemon: '53224498856304', original: '53224498889072', 'salted-caramel': '53224498921840', strawberry: '53224498954608', 'triple-chocolate': '53224498987376', turtle: '53224499020144', 'vanilla-bean': '53224499052912', 'strawberry-crunch': '53224499380592', 'red-velvet': '53224499413360' } },
    12: { price: 79.99, each: '$6.67', word: 'dozen', ids: { 'banana-pudding': '52790383346032', 'cookies-cream': '52790383313264', 'cookie-butter': '52790383444336', 'key-lime': '52790383378800', lemon: '52801604190576', original: '52801604223344', 'red-velvet': '52790383411568', 'salted-caramel': '52801604256112', strawberry: '52790383182192', 'strawberry-crunch': '52790383214960', 'triple-chocolate': '52790383247728', turtle: '52790383280496', 'vanilla-bean': '52790383149424' } }
  };

  var thumb = function (f, big) {
    /* Small pictures get small files: 96px for chips and menu rows, 112 for the picker, 200 for the box. */
    return f.seasonal ? IMG + 'f-' + f.slug + '-96.webp' : IMG + 'mini-' + f.slug + '-' + (big || 96) + '.webp';
  };

  /* ------------------------------------------------------------------
     One flavor colors the whole page.
     ------------------------------------------------------------------ */
  var root = document.documentElement;
  var HOME = 'strawberry';
  var current = BY[HOME];
  var listeners = [];
  var themeMeta = $('meta[name="theme-color"]');
  function setFlavor(slug, opts) {
    var f = BY[slug];
    if (!f) return;
    opts = opts || {};
    var changed = f !== current;
    current = f;
    root.style.setProperty('--fl', f.deep);
    root.style.setProperty('--fl-tint', f.tint);
    root.style.setProperty('--fl-mid', f.mid);
    if (themeMeta) themeMeta.setAttribute('content', f.tint);
    listeners.forEach(function (fn) { fn(f, opts, changed); });
  }
  function onFlavor(fn) { listeners.push(fn); }

  /* ------------------------------------------------------------------
     Hero: the cake on its stand, and the case of minis under it
     ------------------------------------------------------------------ */
  var rail = $('#rail');
  var imgs = [$('#plateA'), $('#plateB')];
  var live = 0, swapToken = 0, touring = false, tourT = null;

  function buildRail() {
    var html = '';
    F.forEach(function (f, i) {
      if (f.seasonal && !F[i - 1].seasonal) html += '<i class="case__sep" aria-hidden="true"></i>';
      html += '<button class="chip' + (f.seasonal ? ' chip--photo' : '') + '" type="button" data-slug="' + f.slug + '" data-name="' + f.name + '" tabindex="' + (f === current ? 0 : -1) + '" aria-pressed="' + (f === current) + '" aria-label="' + f.name + (f.seasonal ? ', seasonal' : '') + '">' +
        '<img src="' + thumb(f) + '" width="44" height="44" alt="" loading="lazy" decoding="async"></button>';
    });
    rail.innerHTML = html;
    rail.addEventListener('click', function (e) {
      var b = e.target.closest('.chip');
      if (!b) return;
      stopTour();
      setFlavor(b.dataset.slug, { user: true, from: 'rail' });
    });
    /* One tab stop for the whole rail; the arrow keys walk along it. */
    rail.addEventListener('keydown', function (e) {
      var keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (!keys[e.key] && e.key !== 'Home' && e.key !== 'End') return;
      var chips = $$('.chip', rail), at = chips.indexOf(document.activeElement);
      if (at < 0) return;
      e.preventDefault();
      var to = e.key === 'Home' ? 0 : e.key === 'End' ? chips.length - 1 : (at + keys[e.key] + chips.length) % chips.length;
      chips[to].focus();
      stopTour();
      setFlavor(chips[to].dataset.slug, { user: true, from: 'rail' });
    });
  }

  function preload(f) {
    return new Promise(function (res) {
      var im = new Image();
      im.onload = im.onerror = function () { res(); };
      im.srcset = IMG + 'f-' + f.slug + '-560.webp 560w, ' + IMG + 'f-' + f.slug + '.webp 960w';
      im.sizes = '(min-width: 960px) 40vw, 84vw';
      im.src = IMG + 'f-' + f.slug + '.webp';
      setTimeout(res, 2500);
    });
  }

  function swapHero(f) {
    var next = imgs[1 - live], prev = imgs[live], token = ++swapToken;
    var src = IMG + 'f-' + f.slug + '.webp';
    next.srcset = IMG + 'f-' + f.slug + '-560.webp 560w, ' + src + ' 960w';
    next.sizes = '(min-width: 960px) 40vw, 84vw';
    next.src = src;
    next.alt = f.alt;
    var done = false;
    var go = function () {
      if (done || token !== swapToken) return;
      done = true;
      next.classList.add('is-on');
      prev.classList.remove('is-on');
      prev.alt = '';
      live = 1 - live;
    };
    if (next.decode) next.decode().then(go, go); else next.onload = go;
    setTimeout(go, 1400);
  }

  function heroText(f) {
    $('#cardName').textContent = f.name;
    $('#cardNote').textContent = f.note;
    $('#cardPrice').textContent = 'Whole 9-inch, $' + f.whole;
    $('#caseCard').setAttribute('aria-label', f.name + ': open it on the menu');
    $$('.chip', rail).forEach(function (b) {
      var on = b.dataset.slug === f.slug;
      b.setAttribute('aria-pressed', on);
      b.tabIndex = on ? 0 : -1;
      if (on && rail.scrollWidth > rail.clientWidth + 4) {
        rail.scrollTo({ left: b.offsetLeft - (rail.clientWidth - b.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  }

  /* Once, on load: three flavors pass through the stand and it rests on the first again.
     Under five seconds, and any touch, key or scroll ends it. */
  function stopTour(e) {
    if (!touring) return;
    touring = false;
    clearTimeout(tourT);
    /* Cut short by a scroll or a key, the stand goes back to the flavor it opened on.
       A tap on a flavor keeps that flavor. */
    var picked = e && e.target && e.target.closest && e.target.closest('[data-slug]');
    if (!picked && current.slug !== HOME) {
      /* It goes back in one step: no color fades across the page while someone is scrolling. */
      root.classList.add('is-snap');
      setFlavor(HOME, { from: 'tour' });
      requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove('is-snap'); }); });
    }
  }
  function startTour() {
    if (reduce) return;
    var steps = ['key-lime', 'triple-chocolate', 'strawberry'];
    touring = true;
    Promise.all(steps.map(function (s) { return preload(BY[s]); })).then(function () {
      var i = 0;
      var next = function () {
        if (!touring) return;
        if (window.scrollY > 80 || document.hidden) { stopTour(); return; }
        setFlavor(steps[i], { from: 'tour' });
        i++;
        if (i < steps.length) tourT = setTimeout(next, 1500); else stopTour();
      };
      tourT = setTimeout(next, 1300);
    });
    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, stopTour, { once: true, passive: true });
    });
  }

  function initHero() {
    buildRail();
    onFlavor(function (f, opts, changed) {
      heroText(f);
      if (changed) swapHero(f);
    });
    /* The label under the cake opens that flavor on the menu: beside the list on a laptop, under its own row on a phone. */
    $('#caseCard').addEventListener('click', function (e) {
      stopTour();
      if (!wide.matches) { e.preventDefault(); setFlavor(current.slug, { user: true, from: 'label', open: true }); }
    });
    if (document.readyState === 'complete') startTour(); else window.addEventListener('load', startTour, { once: true });
  }

  /* ------------------------------------------------------------------
     Layer drawing: what goes into each flavor, bottom to top
     ------------------------------------------------------------------ */
  function rng(seed) {
    var s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }
  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    var f = function (v) { return Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt))); };
    return 'rgb(' + f(r) + ',' + f(g) + ',' + f(b) + ')';
  }
  var G = {
    cream: function (x, y, c) {
      c = c || CREAM;
      return '<g><ellipse cx="' + x + '" cy="' + (y - 4) + '" rx="10" ry="6.5" fill="' + c + '"/><ellipse cx="' + x + '" cy="' + (y - 10) + '" rx="7.5" ry="5.2" fill="' + c + '"/><ellipse cx="' + x + '" cy="' + (y - 15.5) + '" rx="4.6" ry="3.6" fill="' + c + '"/>' +
        '<path d="M' + (x - 7) + ' ' + (y - 5) + 'q7 4 14 0M' + (x - 5) + ' ' + (y - 11) + 'q5 3 10 0" fill="none" stroke="rgba(36,22,26,.13)" stroke-width="1"/></g>';
    },
    mousse: function (x, y) { return G.cream(x, y, '#B98A6E'); },
    strawberry: function (x, y) {
      return '<g><path d="M' + x + ' ' + (y - 1) + 'c-9 -5 -10 -15 -6 -18c3 -2 9 -2 12 0c4 3 3 13 -6 18z" fill="#D8232F"/>' +
        '<path d="M' + (x - 5) + ' ' + (y - 19) + 'l5 3l5 -3l-2 5h-6z" fill="#3F9A57"/>' +
        '<g fill="#FBD0C2"><circle cx="' + (x - 2.5) + '" cy="' + (y - 11) + '" r=".8"/><circle cx="' + (x + 2.5) + '" cy="' + (y - 12) + '" r=".8"/><circle cx="' + x + '" cy="' + (y - 7) + '" r=".8"/></g></g>';
    },
    raspberry: function (x, y) {
      return '<g fill="#C21846"><circle cx="' + (x - 3) + '" cy="' + (y - 4) + '" r="3.1"/><circle cx="' + (x + 3) + '" cy="' + (y - 4) + '" r="3.1"/><circle cx="' + x + '" cy="' + (y - 8) + '" r="3.1"/><circle cx="' + x + '" cy="' + (y - 3) + '" r="2.6" fill="#D93462"/></g>';
    },
    blueberry: function (x, y) { return '<g><circle cx="' + x + '" cy="' + (y - 5) + '" r="5.2" fill="#2C3F7C"/><circle cx="' + (x - 1.6) + '" cy="' + (y - 6.8) + '" r="1.4" fill="#6C7FBE"/></g>'; },
    blackberry: function (x, y) {
      return '<g fill="#34203F"><circle cx="' + (x - 3.2) + '" cy="' + (y - 4) + '" r="3.2"/><circle cx="' + (x + 3.2) + '" cy="' + (y - 4) + '" r="3.2"/><circle cx="' + x + '" cy="' + (y - 9) + '" r="3.2"/><circle cx="' + (x - 3) + '" cy="' + (y - 10) + '" r="2.4"/><circle cx="' + (x + 3) + '" cy="' + (y - 10) + '" r="2.4"/></g>';
    },
    mint: function (x, y) { return '<path d="M' + x + ' ' + (y - 3) + 'q-8 -8 -2 -19q9 7 2 19z" fill="#3F9A57"/><path d="M' + x + ' ' + (y - 4) + 'q-3 -8 -1.4 -15" fill="none" stroke="#2F7D4F" stroke-width=".9"/>'; },
    lime: function (x, y) { return '<g><path d="M' + (x - 9) + ' ' + (y - 2) + 'a9 9 0 0 1 18 0z" fill="#6FA32A"/><path d="M' + (x - 6.8) + ' ' + (y - 2) + 'a6.8 6.8 0 0 1 13.6 0z" fill="#DDEB9A"/><path d="M' + x + ' ' + (y - 2) + 'v-6.6M' + x + ' ' + (y - 2) + 'l-4.6 -4.8M' + x + ' ' + (y - 2) + 'l4.6 -4.8" stroke="#A9C95A" stroke-width=".9"/></g>'; },
    lemon: function (x, y) { return '<g><path d="M' + (x - 9) + ' ' + (y - 2) + 'a9 9 0 0 1 18 0z" fill="#E9BC1B"/><path d="M' + (x - 6.8) + ' ' + (y - 2) + 'a6.8 6.8 0 0 1 13.6 0z" fill="#FBEFA0"/><path d="M' + x + ' ' + (y - 2) + 'v-6.6M' + x + ' ' + (y - 2) + 'l-4.6 -4.8M' + x + ' ' + (y - 2) + 'l4.6 -4.8" stroke="#E9CE4B" stroke-width=".9"/></g>'; },
    nilla: function (x, y) { return '<g><ellipse cx="' + x + '" cy="' + (y - 7) + '" rx="8.2" ry="7.6" fill="#E2A857"/><ellipse cx="' + (x - 1.4) + '" cy="' + (y - 8.4) + '" rx="5" ry="4.4" fill="#EDBE74"/></g>'; },
    oreo: function (x, y) { return '<g><ellipse cx="' + x + '" cy="' + (y - 7) + '" rx="8.2" ry="7.8" fill="#241B1C"/><ellipse cx="' + x + '" cy="' + (y - 7) + '" rx="5.2" ry="4.9" fill="none" stroke="#4A3E40" stroke-width="1.1" stroke-dasharray="1.6 1.6"/></g>'; },
    biscoff: function (x, y) { return '<g transform="rotate(-14 ' + x + ' ' + (y - 8) + ')"><rect x="' + (x - 8) + '" y="' + (y - 15) + '" width="16" height="14" rx="2.4" fill="#B46A2C"/><rect x="' + (x - 5.4) + '" y="' + (y - 12.2) + '" width="10.8" height="8.4" rx="1.4" fill="none" stroke="#D08A48" stroke-width="1"/></g>'; },
    rvcube: function (x, y) { return '<g transform="rotate(12 ' + x + ' ' + (y - 6) + ')"><rect x="' + (x - 6) + '" y="' + (y - 12) + '" width="12" height="11" rx="1.6" fill="#A3122A"/><rect x="' + (x - 6) + '" y="' + (y - 12) + '" width="12" height="3.6" rx="1.6" fill="#C2203A"/></g>'; },
    shard: function (x, y) { return '<path d="M' + (x - 6) + ' ' + (y - 1) + 'l3 -17l10 13z" fill="#3A2218"/>'; },
    wshard: function (x, y) { return '<path d="M' + (x - 5) + ' ' + (y - 1) + 'l2 -16l9 12z" fill="#FFF6E6" stroke="rgba(36,22,26,.14)" stroke-width=".8"/>'; },
    pearls: function (x, y) { return '<g fill="#3A2218"><circle cx="' + (x - 26) + '" cy="' + (y - 2) + '" r="1.9"/><circle cx="' + (x + 27) + '" cy="' + (y - 2.4) + '" r="1.9"/><circle cx="' + (x + 2) + '" cy="' + (y - 1.6) + '" r="1.7"/></g>'; },
    salt: function (x, y) {
      var r = rng(71), out = '<g fill="#FFFFFF">';
      for (var i = 0; i < 11; i++) { var px = x - 30 + r() * 60, py = y - 1 + r() * 4, s = 1.6 + r() * 1.4; out += '<rect x="' + px.toFixed(1) + '" y="' + py.toFixed(1) + '" width="' + s.toFixed(1) + '" height="' + s.toFixed(1) + '" transform="rotate(' + Math.round(r() * 80) + ' ' + px.toFixed(1) + ' ' + py.toFixed(1) + ')"/>'; }
      return out + '</g>';
    },
    dust: function (x, y) {
      var r = rng(29), out = '<g fill="#241B1C">';
      for (var i = 0; i < 16; i++) { out += '<circle cx="' + (x - 32 + r() * 64).toFixed(1) + '" cy="' + (y - 1 + r() * 4).toFixed(1) + '" r="' + (0.7 + r() * 1.1).toFixed(1) + '"/>'; }
      return out + '</g>';
    },
    drizzle: function (x, y) {
      return '<path d="M' + (x - 34) + ' ' + (y + 2) + 'q8 -9 16 0t16 0t16 0t16 0" fill="none" stroke="#C47A2C" stroke-width="3" stroke-linecap="round"/>' +
        '<g fill="#7A4520"><ellipse cx="' + (x - 18) + '" cy="' + (y - 3) + '" rx="4.4" ry="2.6"/><ellipse cx="' + (x + 6) + '" cy="' + (y - 3.6) + '" rx="4.4" ry="2.6" transform="rotate(-18 ' + (x + 6) + ' ' + (y - 3.6) + ')"/><ellipse cx="' + (x + 24) + '" cy="' + (y - 2.6) + '" rx="4" ry="2.4"/></g>';
    },
    crumble: function (x, y) {
      var r = rng(53), out = '<g>';
      for (var i = 0; i < 20; i++) { var px = x - 33 + r() * 66, py = y - 5 + r() * 7; out += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="' + (1.8 + r() * 2).toFixed(1) + '" fill="' + (r() > 0.5 ? '#B98548' : '#D3A566') + '"/>'; }
      return out + '</g><path d="M' + (x - 30) + ' ' + (y - 6) + 'q10 -5 20 0t20 0t20 0" fill="none" stroke="#C2832B" stroke-width="2.2" stroke-linecap="round"/>';
    },
    meringue: function (x, y) {
      return '<path d="M' + (x - 40) + ' ' + (y + 2) + 'c2 -12 12 -15 18 -9c4 -10 18 -11 22 -1c7 -8 20 -4 20 10z" fill="#FFF4E0"/>' +
        '<path d="M' + (x - 30) + ' ' + (y - 5) + 'q6 -5 12 0M' + (x - 8) + ' ' + (y - 9) + 'q7 -5 14 0M' + (x + 14) + ' ' + (y - 4) + 'q6 -5 12 0" fill="none" stroke="#B9722E" stroke-width="2" stroke-linecap="round"/>';
    }
  };

  function drawFlavor(f) {
    var CX = 56, HW = 38, X0 = CX - HW, X1 = CX + HW, BOT = 110, BODY = 68;
    var NOM = { crust: 12, cake: 13, fill: 38, mid: 11, cap: 8 };
    var total = f.parts.reduce(function (s, p) { return s + (NOM[p.k] ? (p.h || NOM[p.k]) : 0); }, 0);
    var scale = Math.min(1, BODY / total);
    var y = BOT, out = '', r = rng(f.i * 97 + 13);
    var id = 'cl-' + f.slug + '-' + Math.round(Math.random() * 1e6);
    var top = BOT - total * scale;
    out += '<defs><clipPath id="' + id + '"><path d="M' + X0 + ' ' + (top - 2) + 'H' + X1 + 'V' + (BOT - 6) + 'Q' + X1 + ' ' + BOT + ' ' + (X1 - 6) + ' ' + BOT + 'H' + (X0 + 6) + 'Q' + X0 + ' ' + BOT + ' ' + X0 + ' ' + (BOT - 6) + 'Z"/></clipPath>' +
      '<linearGradient id="' + id + 's" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#24161A" stop-opacity=".2"/></linearGradient></defs>';
    out += '<ellipse cx="' + CX + '" cy="' + (BOT + 3) + '" rx="' + (HW + 5) + '" ry="4.5" fill="rgba(36,22,26,.12)"/>';
    var topColor = null;
    f.parts.forEach(function (p, idx) {
      if (!NOM[p.k]) return;
      var h = (p.h || NOM[p.k]) * scale, y0 = y - h, i, px, py, n;
      var g = '<g class="ly" data-ly="' + idx + '"' + (p.k === 'cap' ? '' : ' clip-path="url(#' + id + ')"') + '>';
      if (p.k === 'cap') {
        g += '<path d="M' + X0 + ' ' + y0 + 'H' + X1 + 'V' + (y0 + h) + 'H' + X0 + 'Z" fill="' + p.c + '"/>';
        [[X0 + 5, 11], [X0 + 21, 21], [X0 + 39, 8], [X0 + 53, 16], [X0 + 66, 10]].forEach(function (d) {
          g += '<rect x="' + d[0] + '" y="' + (y0 + 1) + '" width="7" height="' + (h + d[1] * scale) + '" rx="3.5" fill="' + p.c + '"/>';
        });
      } else {
        g += '<rect x="' + X0 + '" y="' + y0 + '" width="' + (HW * 2) + '" height="' + (h + 0.6) + '" fill="' + p.c + '"/>';
        if (p.k === 'crust') for (i = 0; i < 26; i++) { px = X0 + r() * HW * 2; py = y0 + r() * h; g += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="' + (0.7 + r() * 1).toFixed(1) + '" fill="' + shade(p.c, r() > 0.5 ? 0.28 : -0.22) + '"/>'; }
        if (p.k === 'cake') for (i = 0; i < 16; i++) { px = X0 + r() * HW * 2; py = y0 + r() * h; g += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="' + (0.6 + r() * 0.8).toFixed(1) + '" fill="' + shade(p.c, -0.2) + '"/>'; }
        if (p.tex === 'speck') for (i = 0; i < 22; i++) { px = X0 + r() * HW * 2; py = y0 + r() * h; g += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r=".55" fill="#5B4A3A"/>'; }
        if (p.tex === 'dark') for (i = 0; i < 26; i++) { px = X0 + r() * HW * 2; py = y0 + r() * h; n = 0.8 + r() * 1.6; g += '<rect x="' + px.toFixed(1) + '" y="' + py.toFixed(1) + '" width="' + n.toFixed(1) + '" height="' + (n * 0.8).toFixed(1) + '" rx=".4" fill="#2A2223" transform="rotate(' + Math.round(r() * 90) + ' ' + px.toFixed(1) + ' ' + py.toFixed(1) + ')"/>'; }
        if (p.tex === 'swirl') g += '<path d="M' + X0 + ' ' + (y0 + h * 0.3) + 'q9.5 ' + (h * 0.28) + ' 19 0t19 0t19 0t19 0M' + X0 + ' ' + (y0 + h * 0.68) + 'q9.5 ' + (-h * 0.26) + ' 19 0t19 0t19 0t19 0" fill="none" stroke="#D93462" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>';
        if (p.tex === 'nuts') for (i = 0; i < 9; i++) { px = X0 + 5 + i * 8.4 + r() * 2; py = y0 + h / 2 + (r() - 0.5) * 3; g += '<ellipse cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" rx="4" ry="' + (h * 0.3).toFixed(1) + '" fill="' + (i % 2 ? '#7A4520' : '#9A6230') + '" transform="rotate(' + Math.round((r() - 0.5) * 40) + ' ' + px.toFixed(1) + ' ' + py.toFixed(1) + ')"/>'; }
      }
      out += g + '</g>';
      y = y0;
      topColor = p.c;
    });
    out += '<rect x="' + X0 + '" y="' + (top - 2) + '" width="' + (HW * 2) + '" height="' + (BOT - top + 2) + '" fill="url(#' + id + 's)" clip-path="url(#' + id + ')" pointer-events="none"/>';
    f.parts.forEach(function (p, idx) {
      if (p.k !== 'coat') return;
      var g = '<g class="ly" data-ly="' + idx + '" clip-path="url(#' + id + ')">', rr = rng(f.i * 31 + 7);
      for (var i = 0; i < 120; i++) { var px = X0 + rr() * HW * 2, py = top + rr() * (BOT - top); g += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="' + (0.9 + rr() * 1.3).toFixed(1) + '" fill="' + (rr() > 0.55 ? p.c : p.c2) + '" opacity=".9"/>'; }
      out += g + '</g>';
    });
    out += '<ellipse cx="' + CX + '" cy="' + top + '" rx="' + HW + '" ry="6" fill="' + shade(topColor, 0.16) + '" pointer-events="none"/>';
    f.parts.forEach(function (p, idx) {
      if (!p.g) return;
      var g = '<g class="ly" data-ly="' + idx + '">';
      p.g.forEach(function (it) { g += G[it[0]](CX + it[1] * 0.95, top + 1); });
      out += g + '</g>';
    });
    return out;
  }

  /* ------------------------------------------------------------------
     The menu and its card
     ------------------------------------------------------------------ */
  var menu = $('#menu');
  var fcard = $('#fcard');
  var wide = window.matchMedia('(min-width: 960px)');
  var cardHome = fcard.parentNode;
  var openSlug = null, hoverT = null;

  function rowHTML(f) {
    return '<li class="frow" data-slug="' + f.slug + '" style="--row-tint:' + f.tint + ';--row-deep:' + f.deep + '">' +
      '<button class="frow__btn" type="button" aria-expanded="false" aria-controls="fcard">' +
      '<span class="frow__thumb' + (f.seasonal ? ' frow__thumb--photo' : '') + '"><img src="' + thumb(f) + '" width="48" height="48" alt="" loading="lazy" decoding="async"></span>' +
      '<span class="frow__text"><span class="frow__name">' + f.name + '</span><span class="frow__note">' + f.note + '</span></span>' +
      '<span class="frow__price num">$' + f.whole + ICON('i-chev') + '</span>' +
      '</button></li>';
  }

  function buildMenu() {
    var h = '<div class="menu__group"><p class="menu__cap"><span>Year-round</span><span>Whole 9-inch</span></p><ul>';
    CORE.forEach(function (f) { h += rowHTML(f); });
    /* The seasonal four sit in the same menu, under their own photograph. */
    h += '</ul></div><div class="menu__group" id="seasonal">' +
      '<figure class="menu__banner"><img src="' + IMG + 'l-seasonal-wide-1040.webp" srcset="' + IMG + 'l-seasonal-wide-640.webp 640w, ' + IMG + 'l-seasonal-wide-1040.webp 1040w" sizes="(max-width: 959px) 90vw, 36vw" width="1040" height="520" alt="Pumpkin spice and salted caramel apple cheesecakes beside Biscoff cookies" loading="lazy" decoding="async"></figure>' +
      '<p class="menu__cap"><span>In season this fall</span><span>Whole 9-inch</span></p><ul>';
    SEAS.forEach(function (f) { h += rowHTML(f); });
    h += '</ul><p class="menu__note">Limited-time flavors made with what is in season: Salted Caramel Apple in the fall, Georgia Peach in the summer.</p></div>';
    menu.innerHTML = h;

    menu.addEventListener('click', function (e) {
      var b = e.target.closest('.frow__btn');
      if (!b) return;
      var slug = b.parentNode.dataset.slug;
      stopTour();
      if (!wide.matches && openSlug === slug) { closeCard(); return; }
      setFlavor(slug, { user: true, from: 'menu', open: true });
    });
    if (fine) {
      /* A row previews only when the pointer itself moved onto it. A page that scrolls
         under a resting pointer must not change the flavor someone just chose. */
      var lastXY = '', moved = false, hoverSlug = null;
      window.addEventListener('pointermove', function (e) {
        var xy = e.clientX + ',' + e.clientY;
        moved = xy !== lastXY;
        lastXY = xy;
      }, { capture: true, passive: true });
      menu.addEventListener('pointermove', function (e) {
        if (!moved || !wide.matches) return;
        var b = e.target.closest('.frow__btn');
        var slug = b ? b.parentNode.dataset.slug : null;
        if (slug === hoverSlug) return;
        hoverSlug = slug;
        clearTimeout(hoverT);
        if (!slug) return;
        hoverT = setTimeout(function () {
          if (current.slug === slug) return;
          stopTour();
          setFlavor(slug, { user: true, from: 'menu' });
        }, 110);
      });
      menu.addEventListener('pointerleave', function () { clearTimeout(hoverT); hoverSlug = null; });
    }
  }

  function viewsFor(f) {
    var v = [{ k: 'whole', label: 'Whole', src: IMG + 'f-' + f.slug + '.webp', alt: f.alt, set: IMG + 'f-' + f.slug + '-560.webp 560w, ' + IMG + 'f-' + f.slug + '.webp 960w' }];
    if (HAS_CLOSE.indexOf(f.slug) > -1) v.push({ k: 'close', label: 'Up close', src: IMG + 'g-' + f.slug + '.webp', alt: f.name + ' cheesecake, up close' });
    if (HAS_FOUR.indexOf(f.slug) > -1) v.push({ k: 'four', label: '4-inch', src: IMG + 'four-' + f.slug + '.webp', alt: 'A 4-inch personal ' + f.name.toLowerCase() + ' cheesecake' });
    if (!f.seasonal) v.push({ k: 'mini', label: 'Mini', src: IMG + 'mini-' + f.slug + '.webp', alt: 'A ' + f.name.toLowerCase() + ' mini', contain: true });
    return v;
  }

  function renderCard(f) {
    var views = viewsFor(f);
    var legend = f.parts.map(function (p, i) { return p.l ? { i: i, l: p.l, c: p.c } : null; }).filter(Boolean).reverse();
    /* Picture on one side, the facts and the order button on the other, the layers along the foot:
       the whole card fits a laptop screen while it is pinned beside the menu. */
    var h = '<div class="fcard__pic"><div class="fcard__media"><img class="is-on" src="' + views[0].src + '" srcset="' + views[0].set + '" sizes="(max-width: 959px) 90vw, 320px" width="960" height="960" alt="' + views[0].alt + '" loading="lazy" decoding="async"></div>';
    if (views.length > 1) h += '<div class="views" role="group" aria-label="Photographs of ' + f.name + '">' + views.map(function (v, i) { return '<button class="view" type="button" data-view="' + v.k + '" aria-pressed="' + (i === 0) + '">' + v.label + '</button>'; }).join('') + '</div>';
    h += '</div><div class="fcard__body"><h3 class="fcard__name">' + f.name + '</h3>';
    h += '<p class="fcard__desc">' + f.desc + '</p>';
    h += '<dl class="prices num">';
    if (!f.seasonal) h += '<div><dt>Mini</dt><dd>$9.39</dd></div>';
    if (f.four) h += '<div><dt>Personal, 4-inch</dt><dd>' + money(f.four) + '</dd></div>';
    h += '<div><dt>Whole, 9-inch</dt><dd>$' + f.whole + '</dd></div></dl>';
    h += '<div class="fcard__cta"><a class="btn btn--primary btn--lg" href="' + STORE + '/products/' + f.handle + '" aria-label="Order a whole ' + f.name + ' cheesecake">Order a whole cake</a>';
    if (!f.seasonal) h += '<button class="m-link" type="button" data-add="' + f.slug + '">Add a mini to my box</button>';
    else if (f.four) h += '<a class="m-link" href="' + STORE + '/products/personal-cheesecakes-4-inch">Order a 4-inch personal</a>';
    h += '</div></div>';
    h += '<div class="layers"><svg class="layers__svg" viewBox="0 0 112 120" role="img" aria-label="Drawing of the layers in a ' + f.name + ' cheesecake">' + drawFlavor(f) + '</svg>' +
      '<div class="layers__list"><p class="layers__t">What goes into it</p>' + legend.map(function (l) { return '<button class="layers__item" type="button" data-ly="' + l.i + '"><i class="layers__sw" style="background:' + l.c + '"></i><span>' + l.l + '</span></button>'; }).join('') + '</div></div>';
    fcard.innerHTML = h;
  }

  function placeCard(f, open) {
    var show = wide.matches || open || openSlug === f.slug;
    $$('.frow', menu).forEach(function (r) {
      var on = r.dataset.slug === f.slug && show;
      r.classList.toggle('is-on', on);
      $('.frow__btn', r).setAttribute('aria-expanded', on);
    });
    if (wide.matches) {
      if (fcard.parentNode !== cardHome) cardHome.appendChild(fcard);
      fcard.hidden = false;
      openSlug = f.slug;
    } else if (open) {
      var row = $('.frow[data-slug="' + f.slug + '"]', menu);
      row.appendChild(fcard);
      fcard.hidden = false;
      openSlug = f.slug;
      var top = row.getBoundingClientRect().top;
      if (top < 72 || top > window.innerHeight * 0.5) window.scrollTo({ top: window.scrollY + top - 80, behavior: reduce ? 'auto' : 'smooth' });
    } else if (openSlug && openSlug !== f.slug) {
      closeCard();
    }
  }
  function closeCard() {
    if (wide.matches) return;
    fcard.hidden = true;
    openSlug = null;
    $$('.frow', menu).forEach(function (r) { r.classList.remove('is-on'); $('.frow__btn', r).setAttribute('aria-expanded', 'false'); });
  }

  function initMenu() {
    buildMenu();
    renderCard(current);
    if (!wide.matches) fcard.hidden = true;
    placeCard(current, false);
    onFlavor(function (f, opts, changed) {
      if (changed || opts.open) renderCard(f);
      placeCard(f, !!opts.open);
    });
    var onMQ = function () { if (wide.matches) placeCard(current, false); else closeCard(); };
    if (wide.addEventListener) wide.addEventListener('change', onMQ); else wide.addListener(onMQ);

    fcard.addEventListener('click', function (e) {
      var v = e.target.closest('.view');
      if (v) {
        var view = viewsFor(current).filter(function (x) { return x.k === v.dataset.view; })[0];
        var media = $('.fcard__media', fcard), old = $('img.is-on', media);
        if (!view || !media) return;
        $$('.view', fcard).forEach(function (b) { b.setAttribute('aria-pressed', b === v); });
        var im = new Image();
        im.width = 960; im.height = 960; im.alt = view.alt; im.decoding = 'async';
        if (view.set) { im.sizes = '(max-width: 959px) 90vw, 320px'; im.srcset = view.set; }
        if (view.contain) im.className = 'is-contain';
        im.onload = im.onerror = function () {
          media.appendChild(im);
          requestAnimationFrame(function () { im.classList.add('is-on'); });
          if (old) setTimeout(function () { old.remove(); }, 320);
        };
        im.src = view.src;
        return;
      }
      var add = e.target.closest('[data-add]');
      if (add) addToBox(add.dataset.add, true);
    });
    var hot = function (e) {
      var an = $('.layers', fcard);
      if (!an) return;
      var it = e.target.closest ? e.target.closest('.layers__item') : null;
      $$('.is-hot', an).forEach(function (n) { n.classList.remove('is-hot'); });
      an.classList.toggle('is-hot', !!it);
      if (it) {
        it.classList.add('is-hot');
        $$('.ly[data-ly="' + it.dataset.ly + '"]', an).forEach(function (n) { n.classList.add('is-hot'); });
      }
    };
    fcard.addEventListener('pointerover', hot);
    fcard.addEventListener('focusin', hot);
    fcard.addEventListener('click', hot);
    fcard.addEventListener('pointerleave', function () { hot({ target: fcard }); });
  }

  /* ------------------------------------------------------------------
     Box builder
     ------------------------------------------------------------------ */
  var bx = $('#bx'), tray = $('#tray'), pick = $('#pick');
  var size = 12, slots = [];
  var note = '';   /* one line said once in the summary, when the box changed something on its own */
  var KEEP = 'aries-box';

  function allowed(slug) { return !!BOX[size].ids[slug]; }
  function counts() {
    var c = {};
    slots.forEach(function (s) { if (s) c[s] = (c[s] || 0) + 1; });
    return c;
  }
  function filled() { return slots.filter(Boolean).length; }

  function buildPick() {
    pick.innerHTML = CORE.map(function (f) {
      return '<button class="pk" type="button" data-slug="' + f.slug + '"><img src="' + thumb(f, 112) + '" width="56" height="56" alt="" loading="lazy" decoding="async"><span class="pk__name">' + f.name + '</span><span class="pk__tag" hidden>4 and 12 only</span><span class="pk__count num" aria-hidden="true">0</span></button>';
    }).join('') + '<p class="ladder pick__ladder num"><span><b>1</b> for $9.39</span><span><b>2</b> for $16</span><span><b>4</b> for $32</span><span><b>6</b> for $41</span><span><b>12</b> for $79.99</span></p>';
    pick.addEventListener('click', function (e) {
      var b = e.target.closest('.pk');
      if (!b || b.disabled || !b.dataset.slug) return;
      addToBox(b.dataset.slug, false);
    });
  }

  function renderBox(justAdded) {
    bx.dataset.size = size;
    var h = '';
    slots.forEach(function (s, i) {
      if (s) {
        var f = BY[s];
        h += '<button class="slot is-full" type="button" data-i="' + i + '" aria-label="' + f.name + '. Take it out of the box."><img src="' + thumb(f, 200) + '" srcset="' + thumb(f, 96) + ' 96w, ' + thumb(f, 200) + ' 200w" sizes="(max-width: 959px) 44px, 100px" width="200" height="200" alt=""' + (i === justAdded ? '' : ' style="animation:none"') + '><span class="slot__x" aria-hidden="true">' + ICON('i-x') + '</span></button>';
      } else {
        h += '<div class="slot" aria-hidden="true"></div>';
      }
    });
    tray.innerHTML = h;
    var n = filled(), c = counts(), full = n === size, B = BOX[size];
    bx.classList.toggle('is-done', full);
    $('#bRandom').disabled = full;
    $$('.pk[data-slug]', pick).forEach(function (b) {
      var slug = b.dataset.slug, ok = allowed(slug), k = c[slug] || 0;
      b.disabled = !ok || full;
      $('.pk__tag', b).hidden = ok;
      b.classList.toggle('has', k > 0);
      $('.pk__count', b).textContent = k;
      b.setAttribute('aria-label', BY[slug].name + (ok ? (k ? ', ' + k + ' in the box' : '') + (full ? '. The box is full.' : '. Add one.') : '. Not sold in the box of six online.'));
    });
    $('#bCount').textContent = n + ' of ' + size + ' picked';
    $('#bPrice').textContent = money(B.price);
    $('#bMeter').style.transform = 'scaleX(' + (n / size) + ')';
    var names = Object.keys(c).sort(function (a, b) { return BY[a].i - BY[b].i; }).map(function (s) { return c[s] + ' ' + BY[s].name; });
    var list = $('#bList');
    if (note) { list.textContent = note; note = ''; }
    else if (!n) list.innerHTML = (size === 12 ? 'A dozen' : 'A box of ' + B.word) + ' works out to <b>' + B.each + ' a mini</b>. One on its own is $9.39.';
    else if (!full) list.innerHTML = '<b>' + names.join(', ') + '.</b> ' + (size - n) + ' to go.';
    else list.innerHTML = 'Your ' + (size === 12 ? 'dozen' : 'box of ' + B.word) + ': <b>' + names.join(', ') + '.</b>';
    var a = $('#bOrder');
    if (full) {
      a.href = STORE + '/cart/update?' + Object.keys(c).map(function (s) { return 'updates[' + B.ids[s] + ']=' + c[s]; }).join('&');
      a.setAttribute('aria-disabled', 'false');
      a.textContent = 'Order this box';
    } else {
      a.href = STORE + '/collections/minis';
      a.setAttribute('aria-disabled', 'true');
      a.textContent = n ? 'Add ' + (size - n) + ' more to order' : 'Fill the box to order';
    }
    /* On a phone the bar at the foot of the screen follows the box: once it is full, it orders it. */
    var bar = $('#barBox');
    if (bar) { bar.textContent = full ? 'Order this box' : 'Build a box'; bar.href = full ? a.href : '#box'; }
    /* The box is kept in this browser, so a reload or a second visit finds it as it was left. */
    try { localStorage.setItem(KEEP, JSON.stringify({ size: size, slots: slots })); } catch (e) {}
  }

  function addToBox(slug, jump) {
    var name = BY[slug].name, i = slots.indexOf(null);
    if (!allowed(slug)) { note = name + ' comes in the box of 4 and the box of 12, not the 6. Change the size to add it.'; renderBox(-1); }
    else if (i === -1) { note = 'The box is full. Take one out to add ' + name + '.'; renderBox(-1); }
    else { slots[i] = slug; renderBox(i); }
    if (jump) {
      var el = $('#box');
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - $('#nav').offsetHeight + 1, behavior: reduce ? 'auto' : 'smooth' });
    }
  }
  function setSize(n) {
    var had = filled();
    size = n;
    var barred = slots.some(function (s) { return s && !allowed(s); });
    var keep = slots.filter(function (s) { return s && allowed(s); }).slice(0, n);
    var gone = had - keep.length;
    /* A smaller box says what it left behind, so nothing vanishes without a word. */
    if (gone > 0) note = (gone === 1 ? 'One mini came out' : gone + ' minis came out') + ' to fit the box of ' + n + '.' + (barred ? ' Banana Pudding and Cookie Butter are sold in the 4 and the 12 only.' : '');
    slots = [];
    for (var i = 0; i < n; i++) slots.push(keep[i] || null);
    $$('.seg__b').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.size === n); });
    renderBox(-1);
  }

  function initBox() {
    buildPick();
    var kept = null;
    try { kept = JSON.parse(localStorage.getItem(KEEP) || 'null'); } catch (e) {}
    if (kept && BOX[kept.size] && Array.isArray(kept.slots)) {
      size = kept.size;
      slots = kept.slots.filter(function (x) { return x && BY[x] && !BY[x].seasonal && allowed(x); }).slice(0, size);
      setSize(size);
    } else setSize(12);
    $('#seg').addEventListener('click', function (e) {
      var b = e.target.closest('.seg__b');
      if (b) setSize(+b.dataset.size);
    });
    tray.addEventListener('click', function (e) {
      var s = e.target.closest('.slot.is-full');
      if (!s) return;
      slots[+s.dataset.i] = null;
      var keep = slots.filter(Boolean);
      slots = [];
      for (var i = 0; i < size; i++) slots.push(keep[i] || null);
      renderBox(-1);
    });
    $('#bRandom').addEventListener('click', function () {
      var pool = CORE.filter(function (f) { return allowed(f.slug); }).map(function (f) { return f.slug; });
      var bag = pool.slice().sort(function () { return Math.random() - 0.5; });
      var fill = function () {
        var at = slots.indexOf(null);
        if (at === -1) return;
        if (!bag.length) bag = pool.slice().sort(function () { return Math.random() - 0.5; });
        slots[at] = bag.pop();
        renderBox(at);
        setTimeout(fill, reduce ? 0 : 60);
      };
      fill();
    });
    $('#bClear').addEventListener('click', function () { slots = slots.map(function () { return null; }); renderBox(-1); });
    $('#bOrder').addEventListener('click', function (e) { if (this.getAttribute('aria-disabled') === 'true') e.preventDefault(); });
  }

  /* ------------------------------------------------------------------
     Portions for a group
     ------------------------------------------------------------------ */
  var PACKS = [[12, 79.99], [6, 41], [4, 32], [2, 16], [1, 9.39]];
  function bestMinis(n) {
    var max = n + 11, cost = [0], pk = [null], m, j;
    for (m = 1; m <= max; m++) {
      cost[m] = Infinity;
      for (j = 0; j < PACKS.length; j++) {
        var p = PACKS[j];
        if (p[0] <= m && cost[m - p[0]] + p[1] < cost[m] - 1e-9) { cost[m] = cost[m - p[0]] + p[1]; pk[m] = j; }
      }
    }
    var best = n;
    for (m = n + 1; m <= max; m++) if (cost[m] < cost[best] - 1e-9) best = m;
    var used = {}, at = best;
    while (at > 0) { used[pk[at]] = (used[pk[at]] || 0) + 1; at -= PACKS[pk[at]][0]; }
    return { total: best, cost: cost[best], used: used };
  }
  function packWords(used) {
    var w = [];
    if (used[0]) w.push(used[0] === 1 ? 'a dozen' : used[0] + ' dozen');
    if (used[1]) w.push(used[1] === 1 ? 'a box of 6' : used[1] + ' boxes of 6');
    if (used[2]) w.push(used[2] === 1 ? 'a box of 4' : used[2] + ' boxes of 4');
    var singles = (used[3] || 0) * 2 + (used[4] || 0);
    if (singles) w.push(singles === 1 ? '1 single' : singles + ' singles');
    if (w.length > 1) { var last = w.pop(); return w.join(', ') + ' and ' + last; }
    return w[0];
  }
  function wedge(i, per) {
    var a0 = (i / per) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 1) / per) * Math.PI * 2 - Math.PI / 2, R = 44;
    var p = function (a) { return (50 + R * Math.cos(a)).toFixed(2) + ' ' + (50 + R * Math.sin(a)).toFixed(2); };
    return 'M50 50L' + p(a0) + 'A' + R + ' ' + R + ' 0 0 1 ' + p(a1) + 'Z';
  }
  function initPortions() {
    var input = $('#guests'), out = $('#guestsOut'), thin = $('#thin'), cakes = $('#cakes'), recs = $('#recs');
    var draw = function () {
      var n = +input.value, per = thin.checked ? 16 : 12, k = Math.ceil(n / per), i, c, h = '', r = '';
      out.textContent = n;
      input.style.setProperty('--p', ((n - 1) / 47 * 100) + '%');
      for (c = 0; c < k; c++) {
        h += '<svg viewBox="0 0 100 100">';
        for (i = 0; i < per; i++) h += '<path class="sl' + (c * per + i < n ? ' is-on' : '') + '" d="' + wedge(i, per) + '"/>';
        h += '<circle class="rim" cx="50" cy="50" r="45.5"/></svg>';
      }
      cakes.innerHTML = h;
      cakes.dataset.n = k;
      if (n <= 4) {
        var pcs = Math.ceil(n / 2);
        r += '<div class="rec"><span class="rec__what">' + (pcs === 1 ? 'One 4-inch personal' : 'Two 4-inch personals') + '</span><span class="rec__price num">from ' + money(16.99 * pcs) + '</span><span class="rec__note">Each one feeds 1 or 2</span></div>';
      }
      var spare = k * per - n;
      r += '<div class="rec"><span class="rec__what">' + (k === 1 ? 'One whole 9-inch cheesecake' : k + ' whole 9-inch cheesecakes') + '</span><span class="rec__price num">from $' + (76 * k) + '</span><span class="rec__note">' + per + ' slices a cake' + (thin.checked ? ', cut thin' : '') + (spare ? ', with ' + spare + ' to spare' : ', exactly enough') + '</span></div>';
      var b = bestMinis(n), extra = b.total - n;
      var boxed = b.used[0] || b.used[1] || b.used[2];
      r += '<div class="rec"><span class="rec__what">' + b.total + (b.total === 1 ? ' mini' : ' minis') + (boxed ? ': ' + packWords(b.used) : '') + '</span><span class="rec__price num">' + money(b.cost) + '</span><span class="rec__note">' +
        (n >= 24 ? 'That is catering size. <a class="m-link" href="#request" data-guests="' + n + '">Request an order for ' + n + '</a>' : extra > 0 ? 'Costs less than exactly ' + n + ', with ' + extra + ' to spare' : 'One each, in any mix of flavors') + '</span></div>';
      if (n === 48) r += '<p class="rec__note rec__more">More than 48? <a class="m-link" href="#request">Request a catering order</a> and give the head count there.</p>';
      recs.innerHTML = r;
    };
    input.addEventListener('input', draw);
    thin.addEventListener('change', draw);
    /* The head count goes with the visitor into the request form. */
    recs.addEventListener('click', function (e) {
      var a = e.target.closest('[data-guests]');
      if (a) $('#pGuests').value = a.dataset.guests;
    });
    draw();
  }

  /* ------------------------------------------------------------------
     Catering: five occasions, six of the shop's own photographs each
     ------------------------------------------------------------------ */
  var OCC = {
    wed: { title: 'Wedding and proposal orders', txt: 'Dessert tables, tiered displays and minis in your colors, plus a cake for the two of you.',
      alts: ['A tiered display of minis and a cheesecake at a wedding', 'A three-tier stand of minis beside a dessert sign', 'Rows of strawberry-topped minis', 'Dark green and gold minis with a white rose', 'Minis with greenery on a black riser', 'A cheesecake piped with the words You\'re my person'] },
    corp: { title: 'Corporate event orders', txt: 'Individually boxed minis for the team, or a full table at your event.',
      alts: ['Arielle Page behind a table of minis dressed with the shop banner', 'White gift boxes tied with blue ribbon', 'Crates of assorted minis ready to go out', 'Assorted minis on black risers', 'Minis in clear domes with tasting picks', 'An event table dressed with the shop banner'] },
    bday: { title: 'Birthday cheesecakes', txt: 'A whole cheesecake with their name piped on top, in any of the flavors.',
      alts: ['A chocolate cheesecake piped with Happy Birthday', 'A cheesecake topped with berries and a birthday plaque', 'A coffin-shaped cake that reads RIP to my 20s', 'A key lime cheesecake piped with Happy 30th', 'A golf-themed cheesecake with a tiny cart on top', 'A key lime cheesecake with a chocolate plaque'] },
    baby: { title: 'Baby shower minis', txt: 'Minis finished to match the theme, with toppers, flowers or colors.',
      alts: ['Minis with Oh Baby toppers and paper leaves', 'A dozen minis topped with edible flowers', 'Strawberry and turtle minis with purple flowers', 'Banana pudding minis with flowers', 'Red velvet minis with edible flowers', 'Minis decorated as golf balls on green frosting'] },
    cust: { title: 'Custom cheesecake flavors', txt: 'Twix, tiramisu, Fruity Pebbles, Butterbeer and Japanese cheesecake have all been made on request.',
      alts: ['A Twix cheesecake', 'Tiramisu cheesecakes dusted with cocoa', 'Fruity Pebbles cheesecakes', 'A Butterbeer cheesecake', 'A birthday cake cheesecake coated in sprinkles', 'A Japanese-style cheesecake'] }
  };
  function initOcc() {
    var tabs = $$('.tab');
    var show = function (k, focus) {
      var o = OCC[k];
      tabs.forEach(function (t) {
        var on = t.dataset.occ === k;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        if (on) { $('#occPanel').setAttribute('aria-labelledby', t.id); if (focus) t.focus(); }
      });
      $('#occTitle').textContent = o.title;
      $('#occTxt').textContent = o.txt;
      /* The request form below starts on the occasion being looked at. */
      var sel = $('#pOcc');
      if (sel && !sel.dataset.touched) sel.value = k;
      $('#mosaic').innerHTML = o.alts.map(function (alt, i) {
        var src = IMG + 'o-' + k + '-' + (i + 1);
        return '<figure class="tile"><img src="' + src + '.webp" srcset="' + src + '-330.webp 330w, ' + src + '.webp 449w" sizes="(max-width: 639px) 44vw, (max-width: 959px) 30vw, 17vw" width="449" height="643" alt="' + alt.replace(/"/g, '&quot;') + '" loading="lazy" decoding="async"></figure>';
      }).join('');
    };
    $('#occTabs').addEventListener('click', function (e) { var t = e.target.closest('.tab'); if (t) show(t.dataset.occ); });
    $('#occTabs').addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
      if (n === null) return;
      e.preventDefault();
      show(tabs[(n + tabs.length) % tabs.length].dataset.occ, true);
    });
    show('wed');
  }

  /* ------------------------------------------------------------------
     Hours, open now, the next shipping day, the closest shop
     ------------------------------------------------------------------ */
  var SHOPS = {
    evans: { name: 'Evans', days: [3, 4, 5, 6], tel: '+17064329799', lat: 33.5298805, lon: -82.133049 },
    augusta: { name: 'Augusta', days: [2, 3, 4, 5, 6], tel: '+17063034258', lat: 33.4900837, lon: -82.07552 }
  };
  var DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function nowNY() {
    var parts = {};
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
        .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
      return { dow: DAY.indexOf(parts.weekday), y: +parts.year, mo: +parts.month - 1, d: +parts.day, h: +parts.hour % 24, m: +parts.minute, s: +parts.second };
    } catch (e) {
      var n = new Date();
      return { dow: n.getDay(), y: n.getFullYear(), mo: n.getMonth(), d: n.getDate(), h: n.getHours(), m: n.getMinutes(), s: n.getSeconds() };
    }
  }
  /* { open, when: 0 open now, 1 later today, 2 tomorrow, 3+ a later day, day } */
  function statusOf(shop, t) {
    var today = shop.days.indexOf(t.dow) > -1;
    if (today && t.h >= 12 && t.h < 20) return { open: true, when: 0 };
    if (today && t.h < 12) return { open: false, when: 1 };
    for (var i = 1; i <= 7; i++) {
      var d = (t.dow + i) % 7;
      if (shop.days.indexOf(d) > -1) return { open: false, when: i + 1, day: d };
    }
    return { open: false, when: 9 };
  }
  function opensText(s, long, who) {
    var verb = who ? who + ' opens ' : 'Opens ';
    if (s.when === 1) return verb + 'today at noon';
    if (s.when === 2) return verb + 'tomorrow at noon';
    return verb + (long ? DAYS[s.day] : DAY[s.day]) + ' at noon';
  }
  function updateStatus() {
    var t = nowNY(), st = {}, k;
    for (k in SHOPS) st[k] = statusOf(SHOPS[k], t);
    for (k in SHOPS) {
      var s = st[k];
      $$('[data-status-full="' + k + '"]').forEach(function (el) {
        el.classList.toggle('is-open', s.open);
        $('span', el).textContent = s.open ? 'Open now, until 8 PM' : s.when === 1 ? 'Opens today at noon' : 'Closed. ' + opensText(s, true);
      });
      var card = $('#shop-' + k);
      if (card) card.dataset.open = s.open;
      $$('[data-hours="' + k + '"] > div').forEach(function (row) {
        row.classList.toggle('is-today', row.dataset.days.split(',').indexOf(String(t.dow)) > -1);
      });
    }
    var e = st.evans, a = st.augusta, both = e.open && a.open, one = e.open ? 'evans' : a.open ? 'augusta' : null;
    var soon = a.when <= e.when ? a : e, who = a.when < e.when ? 'Augusta' : e.when < a.when ? 'Evans' : '';
    var nav = $('#navStatus');
    nav.classList.toggle('is-open', !!one);
    $('span', nav).textContent = both ? 'Open until 8 PM' : one ? SHOPS[one].name + ' open until 8 PM' : opensText(soon, false, who);
    /* The hero says it per shop, in a few words: the two keep different days. */
    for (k in SHOPS) {
      var el = $('[data-status-short="' + k + '"]'), sk = st[k];
      if (!el) continue;
      el.classList.toggle('is-open', sk.open);
      $('span', el).textContent = sk.open ? 'Open until 8 PM' : sk.when === 1 ? 'Opens at noon' : sk.when === 2 ? 'Opens tomorrow at noon' : 'Opens ' + DAY[sk.day] + ' at noon';
    }
    /* The phone bar calls the shop that is open; with both open it says which one it rings. */
    var call = $('#barCall');
    if (call) {
      var ring = one || 'evans';
      call.href = 'tel:' + SHOPS[ring].tel;
      call.textContent = 'Call ' + SHOPS[ring].name;
    }
  }
  function updateShip() {
    var t = nowNY();
    var pseudoNow = Date.UTC(t.y, t.mo, t.d, t.h, t.m, t.s);
    var add = (3 - t.dow + 7) % 7;
    if (add === 0 && t.h >= 17) add = 7;
    var cutoff = Date.UTC(t.y, t.mo, t.d + add, 17, 0, 0);
    var ship = new Date(cutoff + 6 * 864e5), arrive = new Date(cutoff + 7 * 864e5), cut = new Date(cutoff);
    var fmt = function (d) { return DAYS[d.getUTCDay()] + ', ' + MON[d.getUTCMonth()] + ' ' + d.getUTCDate(); };
    var left = Math.max(0, cutoff - pseudoNow);
    var dd = Math.floor(left / 864e5), hh = Math.floor(left % 864e5 / 36e5), mm = Math.floor(left % 36e5 / 6e4);
    var unit = function (n, w) { return n + ' ' + w + (n === 1 ? '' : 's'); };
    var inTxt = dd > 0 ? unit(dd, 'day') + (hh ? ' and ' + unit(hh, 'hour') : '') : hh > 0 ? unit(hh, 'hour') + (mm ? ' and ' + unit(mm, 'minute') : '') : unit(Math.max(1, mm), 'minute');
    $('#shipDay').textContent = 'The next box ships ' + fmt(ship) + '.';
    $('#shipTxt').textContent = 'Order by ' + fmt(cut) + ' at 5 PM Eastern, ' + inTxt + ' from now. It arrives ' + fmt(arrive) + '.';
  }
  function miles(a, b, c, d) {
    var R = 3958.8, r = Math.PI / 180, dLat = (c - a) * r, dLon = (d - b) * r;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a * r) * Math.cos(c * r) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  }
  function initNear() {
    var btn = $('#nearBtn'), msg = $('#nearMsg');
    btn.addEventListener('click', function () {
      if (!navigator.geolocation) { msg.textContent = 'This browser does not share a location. Both addresses are above.'; return; }
      msg.textContent = 'Finding you';
      navigator.geolocation.getCurrentPosition(function (pos) {
        var best = null, k;
        for (k in SHOPS) {
          var m = miles(pos.coords.latitude, pos.coords.longitude, SHOPS[k].lat, SHOPS[k].lon);
          SHOPS[k].mi = m;
          $('[data-dist="' + k + '"]').textContent = (m < 10 ? m.toFixed(1) : Math.round(m)) + ' miles from you in a straight line';
          if (!best || m < SHOPS[best].mi) best = k;
        }
        for (k in SHOPS) $('#shop-' + k).classList.toggle('is-near', k === best);
        msg.textContent = SHOPS[best].name + ' is closer.';
      }, function () {
        msg.textContent = 'No location was shared. Both addresses are above.';
      }, { maximumAge: 6e5, timeout: 8000 });
    });
  }

  /* ------------------------------------------------------------------
     Reviews: a flavor a reviewer names opens that flavor on the menu
     ------------------------------------------------------------------ */
  function initMentions() {
    $('#mentions').addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]');
      if (!b) return;
      stopTour();
      setFlavor(b.dataset.go, { user: true, from: 'mention', open: !wide.matches });
      if (wide.matches) {
        var el = $('#flavors');
        window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - $('#nav').offsetHeight + 1, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  }

  /* ------------------------------------------------------------------
     Page chrome: nav, phone menu, phone bar, forms
     ------------------------------------------------------------------ */
  function initChrome() {
    var nav = $('#nav'), bar = $('#phonebar'), btn = $('#navToggle'), sheet = $('#sheet');
    var ticking = false;
    var onScroll = function () {
      ticking = false;
      var y = window.scrollY;
      nav.classList.toggle('is-stuck', y > 8);
      bar.classList.toggle('is-on', y > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    var setMenu = function (open) {
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Close the menu' : 'Menu');
      sheet.classList.toggle('is-open', open);
      sheet.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) nav.classList.add('is-stuck'); else onScroll();
    };
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); } });

    /* Same-page links glide to their section; the browser still does the jump itself,
       so history and the keyboard's place on the page stay right. Smooth scrolling is on
       only for that jump: a Tab press never animates, so focus always shows where it went. */
    var glideT = null;
    var glideOff = function () { clearTimeout(glideT); root.style.scrollBehavior = ''; };
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a || reduce || e.defaultPrevented) return;
      root.style.scrollBehavior = 'smooth';
      clearTimeout(glideT);
      glideT = setTimeout(glideOff, 1400);
    });
    window.addEventListener('scrollend', glideOff);

    var links = $$('.nav__link');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['flavors', 'sizes', 'catering', 'story', 'visit'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
    }

    /* This is a preview, so nothing is sent: each form says so after its own checks. */
    var plan = $('#planForm');
    plan.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      $$('.field', plan).forEach(function (f) {
        var inp = $('input, select, textarea', f), err = $('.err', f);
        if (!err) return;
        var name = $('label', f).textContent.toLowerCase(), bad = '';
        if (inp.required && !inp.value.trim()) bad = inp.type === 'date' ? 'Pick the date you need it' : 'Write your ' + name;
        else if (inp.type === 'email' && inp.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inp.value)) bad = 'Write an email address like name@example.com';
        f.classList.toggle('is-bad', !!bad);
        inp.setAttribute('aria-invalid', !!bad);
        err.textContent = bad;
        if (bad && !first) first = inp;
      });
      var msg = $('#planMsg');
      if (first) { msg.textContent = ''; msg.classList.remove('is-on'); first.focus(); return; }
      msg.classList.add('is-on');
      var days = Math.round((new Date($('#pDate').value + 'T12:00:00') - new Date()) / 864e5);
      msg.textContent = (days < 7 ? 'That date is less than a week away, so call the shop to check it can be done. ' : '') +
        'This is a design preview, so the request was not sent. Email info@ariesartisancheesecake.com or call (706) 432-9799.';
    });
    $('#pOcc').addEventListener('change', function () { this.dataset.touched = '1'; });
    $('#newsForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('#nEmail').value.trim());
      $('#newsMsg').textContent = ok ? 'This is a design preview, so the sign-up was not sent.' : 'Write an email address like name@example.com';
    });
    var date = $('#pDate');
    if (date) { var n = new Date(); date.min = n.getFullYear() + '-' + ('0' + (n.getMonth() + 1)).slice(-2) + '-' + ('0' + n.getDate()).slice(-2); }
  }

  /* ------------------------------------------------------------------ */
  function init() {
    initHero();
    initMenu();
    initBox();
    initPortions();
    initOcc();
    initMentions();
    initNear();
    initChrome();
    updateStatus();
    updateShip();
    setInterval(function () { updateStatus(); updateShip(); }, 30000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
