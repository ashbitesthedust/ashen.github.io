// 全局数据
let currentMovie = null;
let userStar = 0;

// 模拟电影数据库
const movieDatabase = [
    {
        id: 1,
        title: "肖申克的救赎",
        desc: "20世纪40年代末，小有成就的青年银行家安迪因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生。",
        type: "剧情 / 犯罪",
        duration: "142分钟",
        rating: 9.7,
        reviews: [
            { user: "影迷A", content: "经典中的经典，每次看都有新感悟。" },
            { user: "影迷B", content: "希望是美好的，也许是人间至善。" }
        ],
        cast: [
            { name: "蒂姆·罗宾斯", role: "安迪", intro: "美国著名男演员，凭借此片获得金球奖提名。" },
            { name: "摩根·弗里曼", role: "瑞德", intro: "好莱坞传奇演员，多次获得奥斯卡提名。" },
            { name: "弗兰克·德拉邦特", role: "导演", intro: "美国导演、编剧，代表作《肖申克的救赎》《绿里奇迹》。" }
        ]
    },
    {
        id: 2,
        title: "霸王别姬",
        desc: "1924年的北京，京剧班的小豆子和小石头在戏班中相依为命。多年后，小豆子成了名角程蝶衣，小石头成了段小楼，两人合演的《霸王别姬》誉满京城。然而，时代的变迁和个人的命运让他们的人生充满了悲欢离合。",
        type: "剧情 / 爱情 / 同性",
        duration: "171分钟",
        rating: 9.6,
        reviews: [
            { user: "影迷C", content: "中国电影的巅峰之作，无法超越。" },
            { user: "影迷D", content: "一颦一笑，皆是戏。" }
        ],
        cast: [
            { name: "张国荣", role: "程蝶衣", intro: "香港乐坛和影坛的传奇人物，演技出神入化。" },
            { name: "张丰毅", role: "段小楼", intro: "中国内地实力派演员，塑造了众多经典角色。" },
            { name: "陈凯歌", role: "导演", intro: "中国第五代导演代表人物，此片获戛纳金棕榈奖。" }
        ]
    },
    {
        id: 3,
        title: "阿甘正传",
        desc: "阿甘是个智商只有75的低能儿，但他凭借着“傻人有傻福”的信念，在多个领域创造了奇迹。他先后成为橄榄球巨星、越战英雄、乒乓球外交使者、亿万富翁，同时也收获了真挚的爱情。",
        type: "剧情 / 爱情",
        duration: "142分钟",
        rating: 9.5,
        reviews: [
            { user: "影迷E", content: "人生就像一盒巧克力，你永远不知道下一颗是什么味道。" },
            { user: "影迷F", content: "简单纯粹，却蕴含着深刻的人生哲理。" }
        ],
        cast: [
            { name: "汤姆·汉克斯", role: "阿甘", intro: "两届奥斯卡影帝，将阿甘的纯真演绎得淋漓尽致。" },
            { name: "罗宾·怀特", role: "珍妮", intro: "美国女演员，代表作《阿甘正传》《纸牌屋》。" },
            { name: "罗伯特·泽米吉斯", role: "导演", intro: "好莱坞著名导演，擅长特效和奇幻题材。" }
        ]
    }
];

// 模块1：电影选择区
const movieModule = (() => {
    const movieListEl = document.getElementById('movieList');
    const movieDetailEl = document.getElementById('movieDetail');
    const movieSearchInputEl = document.getElementById('movieSearchInput');

    // 初始化渲染电影列表
    const init = () => {
        renderMovieList(movieDatabase);
    };

    // 渲染电影列表
    const renderMovieList = (movies) => {
        movieListEl.innerHTML = '';
        if (movies.length === 0) {
            movieListEl.innerHTML = '<p>未找到相关电影</p>';
            return;
        }
        movies.forEach(movie => {
            const div = document.createElement('div');
            div.className = 'movie-item';
            div.innerText = movie.title;
            div.onclick = () => selectMovie(movie);
            movieListEl.appendChild(div);
        });
    };

    // 选择电影
    const selectMovie = (movie) => {
        currentMovie = movie;
        // 更新列表样式
        document.querySelectorAll('.movie-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.closest('.movie-item').classList.add('active');
        // 更新详情
        renderMovieDetail(movie);
        // 触发模块2和模块3
        castModule.renderCastList(movie.cast);
        reviewModule.renderReview(movie);
    };

    // 渲染电影详情
    const renderMovieDetail = (movie) => {
        movieDetailEl.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>类型：</strong>${movie.type}</p>
            <p><strong>时长：</strong>${movie.duration}</p>
            <p><strong>简介：</strong>${movie.desc}</p>
        `;
    };

    // 搜索电影
    const searchMovie = () => {
        const keyword = movieSearchInputEl.value.trim().toLowerCase();
        if (!keyword) {
            renderMovieList(movieDatabase);
            return;
        }
        const filtered = movieDatabase.filter(movie => 
            movie.title.toLowerCase().includes(keyword)
        );
        renderMovieList(filtered);
    };

    init();

    return {
        searchMovie,
        selectMovie
    };
})();

// 模块2：演员阵容区
const castModule = (() => {
    const castListEl = document.getElementById('castList');
    const castDetailEl = document.getElementById('castDetail');

    // 渲染演员列表
    const renderCastList = (cast) => {
        castListEl.innerHTML = '';
        if (!cast || cast.length === 0) {
            castListEl.innerHTML = '<p>暂无演员信息</p>';
            return;
        }
        cast.forEach(actor => {
            const span = document.createElement('span');
            span.className = 'cast-item';
            span.innerText = `${actor.name}（${actor.role}）`;
            span.onclick = () => renderCastDetail(actor);
            castListEl.appendChild(span);
        });
    };

    // 渲染演员详情
    const renderCastDetail = (actor) => {
        castDetailEl.innerHTML = `
            <h3>${actor.name}</h3>
            <p><strong>角色：</strong>${actor.role}</p>
            <p><strong>介绍：</strong>${actor.intro}</p>
        `;
    };

    return {
        renderCastList,
        renderCastDetail
    };
})();

// 模块3：影评与评分区
const reviewModule = (() => {
    const ratingDisplayEl = document.getElementById('ratingDisplay');
    const reviewsEl = document.getElementById('reviews');

    // 渲染影评和评分
    const renderReview = (movie) => {
        ratingDisplayEl.innerText = `评分：${movie.rating}`;
        reviewsEl.innerHTML = '';
        if (!movie.reviews || movie.reviews.length === 0) {
            reviewsEl.innerHTML = '<p>暂无热门短评</p>';
            return;
        }
        movie.reviews.forEach(review => {
            const div = document.createElement('div');
            div.className = 'review-item';
            div.innerHTML = `
                <p><strong>${review.user}：</strong>${review.content}</p>
            `;
            reviewsEl.appendChild(div);
        });
    };

    return {
        renderReview
    };
})();

// 用户评分和影评模块
const userModule = (() => {
    const starsEl = document.getElementById('stars');
    const userReviewInputEl = document.getElementById('userReviewInput');

    // 设置星级
    const setStar = (star) => {
        userStar = star;
        const stars = starsEl.querySelectorAll('span');
        stars.forEach((s, i) => {
            s.style.color = i < star ? '#f39c12' : '#ccc';
        });
    };

    // 提交影评
    const submitReview = () => {
        if (!currentMovie) {
            alert('请先选择一部电影！');
            return;
        }
        if (userStar === 0) {
            alert('请先给出评分！');
            return;
        }
        const content = userReviewInputEl.value.trim();
        if (!content) {
            alert('请输入影评内容！');
            return;
        }
        // 添加到电影评论列表
        currentMovie.reviews.push({
            user: "我",
            content: `【${userStar}星】${content}`
        });
        // 重新渲染影评
        reviewModule.renderReview(currentMovie);
        // 清空输入框
        userReviewInputEl.value = '';
        alert('影评提交成功！');
    };

    return {
        setStar,
        submitReview
    };
})();