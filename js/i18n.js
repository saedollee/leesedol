async function loadLang(lang) {
    try {
        const res = await fetch(`locales/${lang}.json`);
        const texts = await res.json();
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (texts[key]) {
                // META 태그는 content 속성 업데이트, 나머지는 innerText 업데이트
                if (el.tagName === 'META') {
                    el.setAttribute('content', texts[key]);
                } else {
                    el.innerText = texts[key];
                }
            }
        });
        console.log(`Language switched to: ${lang}`);
    } catch (e) {
        console.error('Language file load error:', e);
        console.error('Error details:', e.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 디버깅: 초기화 시작 로그
    console.log('i18n.js initialized');

    // 기본 언어 설정 (브라우저 언어 또는 저장된 값)
    const defaultLang = localStorage.getItem('siteLang') || navigator.language.slice(0, 2) || 'en';
    console.log('Default language:', defaultLang);

    // 언어 설정
    document.documentElement.lang = defaultLang;
    loadLang(defaultLang);

    // 디버깅: 선택자 확인
    const langButtons = document.querySelectorAll('.lang-switcher button, .lang-switcher1 button');
    console.log(`Found ${langButtons.length} language buttons`);

    // 언어 선택 버튼에 이벤트 리스너 추가 (.lang-switcher 클래스 사용)
    langButtons.forEach(btn => {
        // 디버깅: 각 버튼 정보 출력
        console.log(`Button: ${btn.textContent}, Language: ${btn.getAttribute('data-lang')}`);

        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            console.log(`Language button clicked: ${lang}`);

            localStorage.setItem('siteLang', lang);
            document.documentElement.lang = lang;
            loadLang(lang);
        });
    });
});