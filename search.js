/* 공유 검색 오버레이 — 모든 페이지 헤더의 "검색"에 연결 (클라이언트 사이드) */
(function () {
    'use strict';

    // ===== 상품 데이터셋 =====
    var PRODUCTS = [
        { name: '서밋 프로텍트 다운 파카', cat: '아우터 · 다운', price: '489,000원', url: 'product-parka.html', img: 'images/product-parka.png' },
        { name: '알파 쉴드 3L 재킷', cat: '셸', price: '369,000원', url: 'store.html', img: 'images/product-shell-jacket.png' },
        { name: '그리드 웜 미드레이어', cat: '미드레이어', price: '149,000원', url: 'store.html', img: 'images/product-fleece.png' },
        { name: '하이크 테크 스트레치 팬츠', cat: '팬츠', price: '128,000원', url: 'store.html', img: 'images/product-pants.png' },
        { name: '알파인 루트 백팩 45', cat: '백팩', price: '219,000원', url: 'store.html', img: 'images/product-backpack.png' },
        { name: '써멀 글러브 시스템', cat: '액세서리', price: '79,000원', url: 'store.html', img: 'images/product-gloves.png' },
        { name: '익스페디션 900 다운 수트', cat: '익스페디션 라인 · 다운', price: '1,290,000원', url: 'expedition-line.html', img: 'images/expedition-line/exp-suit.png' },
        { name: '하이알파인 4시즌 텐트', cat: '익스페디션 라인 · 텐트', price: '890,000원', url: 'expedition-line.html', img: 'images/expedition-line/exp-tent.png' },
        { name: '서밋 -40°C 익스페디션 침낭', cat: '익스페디션 라인 · 침낭', price: '690,000원', url: 'expedition-line.html', img: 'images/expedition-line/exp-sleepingbag.png' },
        { name: '알파인 스틸 크램폰', cat: '익스페디션 라인 · 등반장비', price: '189,000원', url: 'expedition-line.html', img: 'images/expedition-line/exp-crampon.png' },
        { name: '서밋 테크 아이스 피켈', cat: '익스페디션 라인 · 등반장비', price: '165,000원', url: 'expedition-line.html', img: 'images/expedition-line/exp-iceaxe.png' }
    ];
    var POPULAR = ['파카', '다운', '셸', '텐트', '침낭', '익스페디션', '백팩'];

    // ===== 스타일 주입 =====
    var css = ''
        + '.search_overlay{position:fixed;inset:0;z-index:200;display:none;flex-direction:column;background:rgba(9,17,24,.5);}'
        + '.search_overlay.open{display:flex;}'
        + '.search_sheet{background:#fff;box-shadow:0 20px 50px rgba(9,17,24,.25);animation:searchDrop .28s ease;}'
        + '@keyframes searchDrop{from{transform:translateY(-24px);opacity:.4;}to{transform:translateY(0);opacity:1;}}'
        + '.search_inner{max-width:900px;margin:0 auto;padding:34px 36px 40px;}'
        + '.search_bar{display:flex;align-items:center;gap:14px;border-bottom:2px solid #111820;padding-bottom:14px;}'
        + '.search_bar svg{flex:0 0 auto;color:#111820;}'
        + '.search_bar input{flex:1;border:none;outline:none;font:inherit;font-size:26px;font-weight:700;color:#111820;background:transparent;}'
        + '.search_bar input::placeholder{color:#c4ccd2;font-weight:600;}'
        + '.search_close{flex:0 0 auto;width:40px;height:40px;border:none;background:none;font-size:26px;line-height:40px;color:#8a98a5;cursor:pointer;border-radius:50%;transition:.15s;}'
        + '.search_close:hover{background:#f2f5f7;color:#111820;}'
        + '.search_popular{margin-top:20px;display:flex;flex-wrap:wrap;align-items:center;gap:8px;}'
        + '.search_popular .lbl{font-size:13px;font-weight:700;color:#8a98a5;margin-right:4px;}'
        + '.search_popular button{height:34px;padding:0 14px;border:1px solid #e0e6ea;border-radius:999px;background:#fff;font:inherit;font-size:13px;font-weight:600;color:#4b5965;cursor:pointer;transition:.15s;}'
        + '.search_popular button:hover{border-color:#111820;color:#111820;}'
        + '.search_results{margin-top:26px;max-height:52vh;overflow-y:auto;}'
        + '.search_count{font-size:13px;font-weight:700;color:#8a98a5;margin-bottom:14px;}'
        + '.search_list{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}'
        + '.search_item{display:flex;align-items:center;gap:14px;padding:10px;border:1px solid #eef2f4;border-radius:4px;cursor:pointer;transition:.15s;}'
        + '.search_item:hover{border-color:#cfd8df;background:#fafbfc;}'
        + '.search_thumb{flex:0 0 auto;width:60px;height:72px;border-radius:3px;background:#eef2f4;overflow:hidden;}'
        + '.search_thumb img{width:100%;height:100%;object-fit:cover;display:block;}'
        + '.search_meta .nm{font-size:15px;font-weight:700;color:#1a242e;line-height:1.3;}'
        + '.search_meta .ct{margin-top:3px;font-size:12px;font-weight:600;color:#97a3ad;}'
        + '.search_meta .pr{margin-top:6px;font-size:14px;font-weight:700;color:#111820;}'
        + '.search_empty{padding:40px 0;text-align:center;color:#8a98a5;font-size:15px;}'
        + '.search_hint{padding:8px 0 6px;color:#aab4bc;font-size:14px;}'
        + '@media (max-width:720px){.search_inner{padding:24px 20px 28px;}.search_bar input{font-size:20px;}.search_list{grid-template-columns:1fr;}}';
    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // ===== 오버레이 DOM =====
    var overlay = document.createElement('div');
    overlay.className = 'search_overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
        '<div class="search_sheet" role="dialog" aria-modal="true" aria-label="검색">' +
            '<div class="search_inner">' +
                '<div class="search_bar">' +
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path></svg>' +
                    '<input type="text" id="searchInput" placeholder="상품명을 검색해 보세요" autocomplete="off">' +
                    '<button class="search_close" type="button" aria-label="닫기">×</button>' +
                '</div>' +
                '<div class="search_popular"><span class="lbl">인기 검색어</span></div>' +
                '<div class="search_results"></div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(overlay);

    var sheet = overlay.querySelector('.search_sheet');
    var input = overlay.querySelector('#searchInput');
    var results = overlay.querySelector('.search_results');
    var popular = overlay.querySelector('.search_popular');

    // 인기 검색어 칩
    POPULAR.forEach(function (kw) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = kw;
        b.addEventListener('click', function () { input.value = kw; render(kw); input.focus(); });
        popular.appendChild(b);
    });

    // ===== 렌더 =====
    function render(q) {
        q = (q || '').trim().toLowerCase();
        if (!q) {
            results.innerHTML = '<div class="search_hint">최근 인기 상품을 검색어로 찾아보세요.</div>';
            return;
        }
        var matched = PRODUCTS.filter(function (p) {
            return (p.name + ' ' + p.cat).toLowerCase().indexOf(q) !== -1;
        });
        if (!matched.length) {
            results.innerHTML = '<div class="search_empty">‘' + escapeHtml(input.value.trim()) + '’ 검색 결과가 없습니다.</div>';
            return;
        }
        var html = '<div class="search_count">검색 결과 ' + matched.length + '</div><div class="search_list">';
        matched.forEach(function (p) {
            html += '<a class="search_item" href="' + p.url + '">' +
                '<div class="search_thumb"><img src="' + p.img + '" alt=""></div>' +
                '<div class="search_meta"><div class="nm">' + escapeHtml(p.name) + '</div>' +
                '<div class="ct">' + escapeHtml(p.cat) + '</div>' +
                '<div class="pr">' + escapeHtml(p.price) + '</div></div>' +
            '</a>';
        });
        html += '</div>';
        results.innerHTML = html;
        // 썸네일 없으면 회색 자리
        results.querySelectorAll('.search_thumb img').forEach(function (img) {
            img.addEventListener('error', function () { img.style.visibility = 'hidden'; });
            if (img.complete && img.naturalWidth === 0) img.style.visibility = 'hidden';
        });
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    // ===== 열기/닫기 =====
    function open() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        input.value = '';
        render('');
        setTimeout(function () { input.focus(); }, 20);
    }
    function close() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    input.addEventListener('input', function () { render(input.value); });
    overlay.querySelector('.search_close').addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

    // ===== 헤더 "검색" 링크 연결 =====
    var links = document.querySelectorAll('.header_util a');
    for (var i = 0; i < links.length; i++) {
        if (links[i].textContent.trim() === '검색') {
            links[i].addEventListener('click', function (e) { e.preventDefault(); open(); });
        }
    }

    // ===== 로그인 상태: '로그인' → '마이페이지' =====
    var loggedIn = null;
    try { loggedIn = localStorage.getItem('bts_user'); } catch (e) {}
    if (loggedIn) {
        for (var k = 0; k < links.length; k++) {
            if (links[k].textContent.trim() === '로그인') {
                links[k].textContent = '마이페이지';
                links[k].setAttribute('href', 'mypage.html');
            }
        }
    }
})();
