console.log('Leesedol site initialized');

document.addEventListener('DOMContentLoaded', function () {
    // 페이지 로딩 시 부드럽게 나타나는 효과
    document.body.classList.add('loaded');

    // 스크롤 시 섹션이 나타나는 효과
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 네비게이션 메뉴 스크롤 이벤트
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 뉴스 필터링 기능
    const filterButtons = document.querySelectorAll('.news-filter .filter-button');
    const newsItems = document.querySelectorAll('#news .timeline-item');

    // 초기화: 모든 뉴스 아이템에 애니메이션 클래스 추가
    newsItems.forEach((item, index) => {
        item.classList.add('animated-item');
        item.style.animationDelay = `${0.1 * (index + 1)}s`;
    });

    // 필터 버튼 클릭 이벤트
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const selectedYear = this.getAttribute('data-year');

                // 활성화된 버튼 스타일 변경
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // 뉴스 아이템 필터링
                newsItems.forEach((item, index) => {
                    const itemYear = item.getAttribute('data-year');

                    // 모든 아이템에서 기존 애니메이션 클래스 제거
                    item.classList.remove('fadeIn');
                    item.style.animationDelay = '0s'; // 애니메이션 지연 초기화

                    if (selectedYear === 'all' || selectedYear === itemYear) {
                        // 해당 연도 또는 전체 선택 시 표시
                        item.style.display = '';

                        // 지연 효과로 순차적 표시
                        setTimeout(() => {
                            item.classList.add('fadeIn');
                            item.classList.remove('hidden');
                        }, 50 * (index + 1));
                    } else {
                        // 필터링되는 항목은 숨김
                        item.classList.remove('fadeIn');
                        item.classList.add('hidden');

                        // 애니메이션 후 완전히 숨김
                        setTimeout(() => {
                            if (item.classList.contains('hidden')) {
                                item.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }

    // 폼 제출 이벤트
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // 실제 폼 제출 로직은 Formspree에서 처리
            console.log('Form submitted');
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.lang-switcher');
    const hero = document.querySelector('.hero');

    function toggleNav() {
        if (window.scrollY > hero.offsetHeight) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
    }

    // 초기 상태 체크
    toggleNav();

    // 스크롤 시마다 토글
    window.addEventListener('scroll', toggleNav);
});
