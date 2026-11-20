
const SITE_DATA = {
  shared: {
    hero: {
      hello: 'Hello!',
      name: "I'm Doyeon Kim.",
      subtitle: 'M.S. Student · Chung-Ang University'
    },

    interests: [
      'Bio-AI',
      'Deep Learning',
      'Machine Learning',
      'Data Science'
    ],

    fontPreset: 'storybook',

    // About Me 안에 표시할 프로필 사진
    aboutPhoto: 'assets/profile.jpg',

    email: 'juck2929@cau.ac.kr',
    github: 'https://github.com/rlaehdus0808',
    website: 'https://rlaehdus0808.github.io/doyeon.github.io/',

    footer: '© Doyeon Kim'
  },

  // ===========================
  // ENGLISH
  // ===========================
  en: {
    folderNames: {
      about: 'About me',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects'
    },

    about: {
      paragraphs: [
        "Hello! I'm Doyeon Kim, an M.S. student in the Department of Smart Cities (Statistics and Data Science track) at Chung-Ang University.",

        "My primary research interest is Bio-AI. I am especially interested in applying machine learning and deep learning to understand and analyze biological data.",

        "I am a member of Prof. Il-Youp Kwak's lab (Artificial Intelligence and Data Science Lab). Thank you for visiting my website."
      ]
    },

    education: [
      {
        period: 'Sep 2026 — Present',
        title: 'Chung-Ang University, Graduate School',
        subtitle: 'M.S. · Smart Cities (Statistics and Data Science Track)',
        description: 'Department of Smart Cities · Statistics and Data Science track.'
      },
      {
        period: 'Mar 2022 — Aug 2026',
        title: 'Chung-Ang University',
        subtitle: 'B.S. · Applied Statistics'
      }
    ],

    skills: {
      intro: 'Python is my primary programming language. These are tools I have used across research and challenge projects.',

      groups: [
        {
          title: 'Programming',
          items: ['Python (Primary)', 'R']
        },
        {
          title: 'Development Tools',
          items: ['vscode','GitHub', 'Docker']
        }
      ]
    },

    projects: [
      {
        period: '2026 — Ongoing',
        title: 'DREAM Digital Pen Feature Extraction Challenge',
        description: 'Currently participating in a challenge focused on extracting informative features from digital pen signals and developing data-driven prediction approaches.'
      },
      {
        period: '2026 · Participant',
        title: 'DREAM x CACHE Target 2035 Drug Discovery Challenge',
        description: 'Participated in a structure-informed drug discovery challenge, exploring molecular similarity, docking, and ligand ranking strategies.'
      },
      {
        period: '2026 · Participant',
        title: 'Virtual Cell Challenge 2026',
        description: 'Participated in a challenge on modeling cellular responses to genetic perturbations using single-cell gene expression data.'
      }
    ],

    close: 'Close folder'
  },

  // ===========================
  // 한국어
  // ===========================
  ko: {
    folderNames: {
      about: '소개',
      education: '학력',
      skills: '기술',
      projects: '프로젝트'
    },

    about: {
      paragraphs: [
        '안녕하세요. 중앙대학교 일반대학원 스마트시티학과 통계데이터사이언스 세부전공에서 석사과정을 밟고 있는 김도연입니다.',

        '저는 Bio-AI 분야에 가장 큰 관심이 있으며, 생명과학 데이터를 이해하고 분석하는 데 머신러닝과 딥러닝을 활용하는 연구에 관심이 있습니다.',

        '현재 곽일엽 교수님 연구실(Artificial Intelligence and Data Science Lab)에 소속되어 있습니다. 방문해 주셔서 감사합니다.'
      ]
    },

    education: [
      {
        period: '2026.03 — 현재',
        title: '중앙대학교 일반대학원',
        subtitle: '석사과정 · 스마트시티학과 (통계데이터사이언스 세부전공)',
        description: '중앙대학교 일반대학원 스마트시티학과 재학 중.'
      },
      {
        period: '2022.03 — 2026.02',
        title: '중앙대학교',
        subtitle: '학사 · 응용수학과',
      }
    ],

    skills: {
      intro: 'Python을 주력 언어로 사용하며, 연구와 챌린지 프로젝트에서 다음 도구들을 활용했습니다.',

      groups: [
        {
          title: '프로그래밍',
          items: ['Python (주력)', 'R']
        },
        {
          title: '개발 환경',
          items: ['vscode', 'GitHub', 'Docker']
        }
      ]
    },

    projects: [
      {
        period: '2026 — 진행 중',
        title: 'DREAM Digital Pen Feature Extraction Challenge',
        description: '디지털 펜 신호에서 유의미한 특징을 추출하고 예측 모델을 개발하는 챌린지에 현재 참여하고 있습니다.'
      },
      {
        period: '2026 · 참가',
        title: 'DREAM x CACHE Target 2035 Drug Discovery Challenge',
        description: '분자 유사도, 도킹, 리간드 순위화 등 구조 기반 신약 개발 접근법을 다루는 챌린지에 참여했습니다.'
      },
      {
        period: '2026 · 참가',
        title: 'Virtual Cell Challenge 2026',
        description: '단일세포 유전자 발현 데이터를 활용해 유전자 교란에 따른 세포 반응을 예측하는 챌린지에 참여했습니다.'
      }
    ],

    close: '폴더 닫기'
  }
};


// ===========================
// 연구실 홈페이지 링크
// ===========================
// About Me에서 연구실 이름을 클릭하면
// 연구실 홈페이지가 새 탭으로 열립니다.

(() => {
  'use strict';

  const labUrl = 'https://ikwak2.github.io/';

  const labNames = [
    '곽일엽 교수님 연구실',
    "Prof. Il-Youp Kwak's lab"
  ];

  const container = document.getElementById('dialog-content');

  if (!container) return;

  function addLabLink() {
    const title = document.getElementById('dialog-title');

    if (!title || !['소개', 'About me'].includes(title.textContent.trim())) {
      return;
    }

    container.querySelectorAll('.about-copy p').forEach((paragraph) => {

      if (paragraph.querySelector('a[data-lab-link]')) return;

      const original = paragraph.textContent;

      const match = labNames.find(name => original.includes(name));

      if (!match) return;

      const index = original.indexOf(match);

      const link = document.createElement('a');

      link.textContent = match;
      link.href = labUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.dataset.labLink = 'true';

      link.style.color = '#9a5147';
      link.style.textDecoration = 'underline';
      link.style.textUnderlineOffset = '3px';

      paragraph.replaceChildren(
        document.createTextNode(original.slice(0, index)),
        link,
        document.createTextNode(original.slice(index + match.length))
      );
    });
  }

  new MutationObserver(addLabLink).observe(container, {
    childList: true,
    subtree: true
  });
})();
