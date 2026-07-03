/* 공통 푸터 — 전 페이지 주입 (search.js와 동일 방식) */
(function () {
    var css = ''
        + '.site_footer{background:#111820;color:rgba(255,255,255,0.7);}'
        + '.site_footer *{box-sizing:border-box;}'
        + '.ft_inner{max-width:1240px;margin:0 auto;padding:64px 36px 40px;}'
        + '.ft_top{display:grid;grid-template-columns:1.4fr 2fr;gap:48px;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.1);}'
        + '.ft_logo{font-size:19px;font-weight:700;color:#fff;letter-spacing:0.02em;}'
        + '.ft_tag{margin-top:12px;font-size:13px;line-height:1.7;color:rgba(255,255,255,0.5);max-width:320px;}'
        + '.ft_sns{margin-top:20px;display:flex;gap:16px;}'
        + '.ft_sns a{font-size:12px;font-weight:600;color:rgba(255,255,255,0.55);transition:color .2s;}'
        + '.ft_sns a:hover{color:#83ecff;}'
        + '.ft_cols{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}'
        + '.ft_col h4{font-size:13px;font-weight:700;color:#fff;margin-bottom:16px;letter-spacing:0.02em;}'
        + '.ft_col ul{display:grid;gap:11px;list-style:none;margin:0;padding:0;}'
        + '.ft_col a{font-size:13px;color:rgba(255,255,255,0.58);transition:color .2s;}'
        + '.ft_col a:hover{color:#83ecff;}'
        + '.ft_bottom{padding-top:26px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;}'
        + '.ft_biz{font-size:12px;line-height:1.75;color:rgba(255,255,255,0.4);}'
        + '.ft_biz b{color:rgba(255,255,255,0.6);font-weight:600;}'
        + '.ft_legal{display:flex;flex-direction:column;align-items:flex-end;gap:9px;font-size:12px;}'
        + '.ft_legal .lk{display:flex;gap:16px;}'
        + '.ft_legal a{color:rgba(255,255,255,0.6);font-weight:600;transition:color .2s;}'
        + '.ft_legal a:hover{color:#83ecff;}'
        + '.ft_legal .cr{color:rgba(255,255,255,0.35);}'
        + '@media(max-width:860px){.ft_inner{padding:48px 20px 32px;}.ft_top{grid-template-columns:1fr;gap:32px;}.ft_bottom{flex-direction:column;}.ft_legal{align-items:flex-start;}}'
        + '@media(max-width:560px){.ft_cols{grid-template-columns:1fr 1fr;}}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var footer = document.createElement('footer');
    footer.className = 'site_footer';
    footer.innerHTML =
        '<div class="ft_inner">' +
            '<div class="ft_top">' +
                '<div class="ft_brand">' +
                    '<div class="ft_logo">BEYOND THE SUMMIT</div>' +
                    '<p class="ft_tag">정상 그 너머를 향하는 사람들을 위한 아웃도어. 가장 혹독한 환경에서 검증한 장비를 만듭니다.</p>' +
                    '<div class="ft_sns"><a href="#">Instagram</a><a href="#">YouTube</a><a href="#">Naver</a></div>' +
                '</div>' +
                '<div class="ft_cols">' +
                    '<div class="ft_col"><h4>쇼핑</h4><ul>' +
                        '<li><a href="store.html">스토어</a></li>' +
                        '<li><a href="collection.html">컬렉션</a></li>' +
                        '<li><a href="expedition-line.html">익스페디션 라인</a></li>' +
                        '<li><a href="cart.html">장바구니</a></li>' +
                    '</ul></div>' +
                    '<div class="ft_col"><h4>고객지원</h4><ul>' +
                        '<li><a href="faq.html">고객센터 · FAQ</a></li>' +
                        '<li><a href="size-guide.html">사이즈 가이드</a></li>' +
                        '<li><a href="inquiry.html">1:1 문의</a></li>' +
                        '<li><a href="store-locator.html">매장 찾기</a></li>' +
                    '</ul></div>' +
                    '<div class="ft_col"><h4>브랜드</h4><ul>' +
                        '<li><a href="story.html">브랜드 스토리</a></li>' +
                        '<li><a href="technology.html">테크놀로지</a></li>' +
                        '<li><a href="expedition.html">익스페디션</a></li>' +
                    '</ul></div>' +
                '</div>' +
            '</div>' +
            '<div class="ft_bottom">' +
                '<div class="ft_biz">(주)비욘드더서밋 · 대표 김산 · 사업자등록번호 000-00-00000<br>서울특별시 종로구 세종대로 000 · 통신판매업 2026-서울종로-0000<br>고객센터 <b>1600-0000</b> · 평일 10:00–18:00 (주말·공휴일 휴무)</div>' +
                '<div class="ft_legal"><div class="lk"><a href="#">이용약관</a><a href="#">개인정보처리방침</a></div><span class="cr">© 2026 BEYOND THE SUMMIT. All rights reserved.</span></div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(footer);
})();
