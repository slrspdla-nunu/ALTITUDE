/* 공유 모바일 내비게이션 — 헤더 메뉴를 햄버거 버튼 + 슬라이드 드로어로 (≤860px) */
(function () {
    'use strict';

    var header = document.querySelector('header');
    if (!header) return;
    var gnb = header.querySelector('nav .gnb');
    var util = header.querySelector('.header_util');
    if (!gnb) return;

    // ===== 스타일 주입 =====
    var css = ''
        // 햄버거 버튼 (데스크톱 숨김)
        + '.mnav_burger{display:none;flex:0 0 auto;width:40px;height:40px;margin-left:auto;padding:8px;border:none;background:none;cursor:pointer;align-items:center;justify-content:center;z-index:16;}'
        + '.mnav_burger .bar{display:block;width:24px;height:2px;border-radius:2px;background:currentColor;transition:transform .28s ease,opacity .2s ease;}'
        + '.mnav_burger .bar + .bar{margin-top:6px;}'
        // 드로어 오버레이
        + '.mnav_overlay{position:fixed;inset:0;z-index:210;background:rgba(9,17,24,.5);opacity:0;visibility:hidden;transition:opacity .28s ease,visibility .28s;}'
        + '.mnav_overlay.open{opacity:1;visibility:visible;}'
        // 드로어 패널
        + '.mnav_panel{position:fixed;top:0;right:0;z-index:220;width:min(320px,84vw);height:100%;background:#fff;box-shadow:-16px 0 40px rgba(9,17,24,.18);transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;padding:22px 26px 32px;overflow-y:auto;}'
        + '.mnav_overlay.open .mnav_panel{transform:translateX(0);}'
        + '.mnav_top{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}'
        + '.mnav_top .mnav_logo{font-size:13px;font-weight:700;letter-spacing:.14em;color:#111820;}'
        + '.mnav_close{width:40px;height:40px;border:none;background:none;font-size:28px;line-height:40px;color:#8a98a5;cursor:pointer;border-radius:50%;transition:.15s;}'
        + '.mnav_close:hover{background:#f2f5f7;color:#111820;}'
        + '.mnav_links{display:flex;flex-direction:column;}'
        + '.mnav_links a{display:block;padding:16px 2px;font-size:20px;font-weight:700;color:#111820;border-bottom:1px solid #eef2f4;transition:color .15s;}'
        + '.mnav_links a:hover{color:#1789c4;}'
        + '.mnav_links a.active{color:#1789c4;}'
        + '.mnav_util{margin-top:24px;display:flex;flex-direction:column;gap:2px;}'
        + '.mnav_util a{display:block;padding:12px 2px;font-size:15px;font-weight:600;color:#36434f;cursor:pointer;transition:color .15s;}'
        + '.mnav_util a:hover{color:#111820;}'
        // ≤860: 데스크톱 메뉴 숨기고 햄버거 노출
        + '@media (max-width:860px){'
        +   'header nav .gnb{display:none!important;}'
        +   'header .header_util{display:none!important;}'
        +   '.mnav_burger{display:flex!important;}'
        + '}';
    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // ===== 햄버거 버튼 (헤더 안, 우측) =====
    var burger = document.createElement('button');
    burger.type = 'button';
    burger.className = 'mnav_burger';
    burger.setAttribute('aria-label', '메뉴 열기');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span style="display:block"><span class="bar"></span><span class="bar"></span><span class="bar"></span></span>';
    // 헤더 내비 글자색과 동일하게 (다크 히어로=흰색 / 라이트 페이지=다크)
    var navLink = gnb.querySelector('a');
    if (navLink) burger.style.color = getComputedStyle(navLink).color;
    header.appendChild(burger);

    // ===== 드로어 DOM =====
    var overlay = document.createElement('div');
    overlay.className = 'mnav_overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
        '<div class="mnav_panel" role="dialog" aria-modal="true" aria-label="메뉴">' +
            '<div class="mnav_top">' +
                '<span class="mnav_logo">BEYOND THE SUMMIT</span>' +
                '<button class="mnav_close" type="button" aria-label="닫기">×</button>' +
            '</div>' +
            '<nav class="mnav_links"></nav>' +
            '<div class="mnav_util"></div>' +
        '</div>';
    document.body.appendChild(overlay);

    var panel = overlay.querySelector('.mnav_panel');
    var linksWrap = overlay.querySelector('.mnav_links');
    var utilWrap = overlay.querySelector('.mnav_util');

    // 네비 링크 복제 (active 유지)
    gnb.querySelectorAll('li').forEach(function (li) {
        var a = li.querySelector('a');
        if (!a) return;
        var link = document.createElement('a');
        link.textContent = a.textContent.trim();
        link.setAttribute('href', a.getAttribute('href') || '#');
        if (li.classList.contains('active')) link.classList.add('active');
        link.addEventListener('click', close);
        linksWrap.appendChild(link);
    });

    // 유틸 링크 복제 (검색은 기존 검색 오버레이로 위임)
    if (util) {
        util.querySelectorAll('a').forEach(function (a) {
            var label = a.textContent.trim();
            var link = document.createElement('a');
            link.textContent = label;
            var href = a.getAttribute('href') || '#';
            if (label === '검색') {
                link.setAttribute('href', '#');
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    close();
                    // search.js가 연결한 원본 헤더 "검색" 클릭을 트리거
                    setTimeout(function () { a.click(); }, 60);
                });
            } else {
                link.setAttribute('href', href);
                link.addEventListener('click', close);
            }
            utilWrap.appendChild(link);
        });
    }

    // ===== 열기/닫기 =====
    function open() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        burger.setAttribute('aria-expanded', 'true');
    }
    function close() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        burger.setAttribute('aria-expanded', 'false');
    }

    burger.addEventListener('click', open);
    overlay.querySelector('.mnav_close').addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
})();
