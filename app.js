document.addEventListener('DOMContentLoaded', () => {
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // CMS（microCMS等）からのデータ取得シミュレーション
    // ※後で実際のAPIエンドポイントに差し替えます
    const fetchNews = async () => {
        const newsContainer = document.getElementById('news-container');
        
        try {
            // ダミーAPIによるテストデータ
            // 実際は： await fetch('https://your-service.microcms.io/api/v1/news', { headers: { 'X-MICROCMS-API-KEY': '...' }})
            const mockData = [
                { id: 1, title: '実験用サイトのベースを作成しました', content: 'フォームやCMSのテストを行うためのサイトを構築開始しました。', publishedAt: '2026-05-09' },
                { id: 2, title: 'microCMS・WordPress API連携予定', content: 'この部分はAPIを通じて取得・表示される予定です。', publishedAt: '2026-05-10' },
                { id: 3, title: 'Formspree連携予定', content: '下部のお問い合わせフォームから実際にメールが届くか確認します。', publishedAt: '2026-05-11' }
            ];

            // ローディングアニメーション（スケルトン）を見せるための意図的な遅延
            setTimeout(() => {
                newsContainer.innerHTML = ''; // スケルトンを削除
                
                mockData.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'news-card';
                    card.innerHTML = `
                        <span class="news-date">${item.publishedAt}</span>
                        <h3 class="news-title">${item.title}</h3>
                        <p class="news-content">${item.content}</p>
                    `;
                    newsContainer.appendChild(card);
                });
            }, 1500);

        } catch (error) {
            console.error('ニュースの取得に失敗しました:', error);
            newsContainer.innerHTML = '<p>ニュースの読み込みに失敗しました。</p>';
        }
    };

    fetchNews();

    // フォームの送信制御 (Formspreeテスト用)
    const form = document.getElementById('test-form');
    form.addEventListener('submit', (e) => {
        // URLが設定されるまでは送信を防ぐ
        const actionUrl = form.getAttribute('action');
        if(actionUrl.includes('your_form_id')) {
            e.preventDefault();
            alert('Formspreeの送信先URLがまだ設定されていません。\nFormspreeでプロジェクトを作成後、URLを設定すると送信可能になります。');
        }
    });
});
