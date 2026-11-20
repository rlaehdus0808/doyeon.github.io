# Doyeon Kim — 개인 학술 홈페이지 (최종 배포용)

하늘색·베이지 세로 스트라이프 배경, 이름과 연구 관심 분야, 종이클립 Contact 메모, 4개의 폴더(소개·학력·기술·프로젝트)를 사용하는 **정적 HTML 홈페이지**입니다.

- 첫 화면: 영어로 고정 (`Hello!`, `I'm Doyeon Kim.`, `M.S. Student · Chung-Ang University`)
- 오른쪽 Contact: 이메일, GitHub, 개인 홈페이지
- 폴더 4개: About me / Education / Skills / Projects
- 한국어/EN 버튼: **폴더 제목과 팝업 내용만** 변경
- About me 팝업 안에서만 프로필 사진 표시
- 별도 설치, 서버, 라이브러리 빌드 과정 **필요 없음**

> **중요:** 현재 `hello@example.com`, `https://github.com/`, `https://example.com/`, 학력·프로젝트 설명 등은 전부 수정용 **예시**입니다. 실제 정보로 고친 뒤 공개하세요.

## 1. 폴더에 들어 있는 파일

```text
doyeon-homepage-final/
├── index.html                    ← 홈페이지 시작 파일 (그대로 두세요)
├── content.js                    ← ★ 이름 / 연락처 / 한영 내용 수정
├── style.css                     ← ★ 폰트 / 폴더 크기 / 색상 수정
├── main.js                       ← 폴더 열기·닫기, 언어 전환 기능 (수정 불필요)
├── assets/
│   └── profile-placeholder.svg  ← 임시 프로필 사진
└── README.md                     ← 지금 읽는 설명서
```

모든 파일이 **같은 폴더 구조로** 있어야 합니다. `index.html` 하나만 복사하면 CSS나 JS가 동작하지 않습니다.

## 2. 내 컴퓨터에서 먼저 열기

1. ZIP 파일을 **압축 해제**합니다.
2. 압축 해제한 폴더에서 `index.html`을 **Chrome 또는 Edge**로 실행합니다.
3. 위쪽 `한국어` 또는 `EN`을 눌러보세요. 폴더 이름과 내용만 번역되고 첫 화면은 영어로 남습니다.
4. `소개`, `학력` 등 폴더를 클릭하면 종이 팝업이 열립니다. `×` 또는 `Esc`로 닫습니다.

### 파일 편집 추천

- **VS Code** (추천): `File` → `Open Folder` → `doyeon-homepage-final` 폴더 선택
- Windows 메모장으로도 `.js`, `.css` 파일 수정 가능. 반드시 **UTF-8**로 저장하세요.
- 내용 변경 후 홈페이지를 새로고침하세요 (`Ctrl+R`). 바로 반영되지 않으면 `Ctrl+Shift+R`.

## 3. 이름·학교·연락처 바꾸기 — `content.js`

`content.js` 맨 위의 `shared`를 찾으세요.

```js
shared: {
  hero: {
    hello: 'Hello!',
    name: "I'm Doyeon Kim.",
    subtitle: 'M.S. Student · Chung-Ang University'
  },
  interests: ['Machine Learning', 'Multimodal AI', 'Data Science'],
  fontPreset: 'storybook',
  aboutPhoto: 'assets/profile-placeholder.svg',
  email: 'hello@example.com',
  github: 'https://github.com/',
  website: 'https://example.com/',
  footer: '© 2026 Doyeon Kim'
},
```

수정 예시:

```js
name: "I'm Doyeon Kim.",
subtitle: 'M.S. Student · Chung-Ang University',
interests: ['Machine Learning', 'Statistics', 'Bioinformatics'],
email: '내이메일@학교.ac.kr',
github: 'https://github.com/내아이디',
website: '',          // 개인 사이트가 없으면 빈 문자열로: 링크 자동 숨김
```

**주의:** `:` `,` `'` `"` 및 중괄호를 임의로 지우지 마세요. 영문 이름의 작은따옴표(`I'm`)는 위 예제처럼 **큰따옴표**로 감싸면 안전합니다.

## 4. 한국어/영어 폴더 내용 수정 — `content.js`

같은 파일 아래에 `en: {...}`과 `ko: {...}`가 있습니다.

- `en.folderNames` / `ko.folderNames`: 폴더 라벨
- `en.about.paragraphs` / `ko.about.paragraphs`: 자기소개 문장. 대괄호 안에 쉼표로 구분하여 문장을 추가할 수 있습니다.
- `en.education` / `ko.education`: 학력. `period`, `title`, `subtitle`, `description` 수정
- `en.skills.groups` / `ko.skills.groups`: 기술. `title`, `items` 수정
- `en.projects` / `ko.projects`: 프로젝트. `period`, `title`, `description` 수정

예를 들어 한국어 학력 항목을 수정하려면:

```js
education: [
  {
    period: '2026.09 — 현재',
    title: '중앙대학교 일반대학원',
    subtitle: '석사과정',
    description: '전공 및 연구실 정보를 작성하세요.'
  },
  {
    period: '2022.03 — 2026.08',
    title: '중앙대학교',
    subtitle: '학사',
    description: '학부 전공을 작성하세요.'
  }
],
```

**영어 화면도 수정하려면 `en.education` 내용을 별도로 수정해야** 합니다. 첫 화면 이름·소속은 `shared.hero`에 있으므로 어느 언어를 선택해도 영어로 유지됩니다.

### 프로젝트 추가하기

`ko.projects` 배열에 `{},` 블록을 하나 더 넣으면 됩니다. 영문 쪽 `en.projects`에도 별도로 추가하세요.

```js
projects: [
  {
    period: '2026',
    title: '프로젝트 A',
    description: '프로젝트 목표, 내가 맡은 일, 결과를 작성하세요.'
  },
  {
    period: '2025',
    title: '프로젝트 B',
    description: '두 번째 프로젝트 설명입니다.'
  }
],
```

## 5. About me에 실제 사진 넣기

1. 사진을 `assets` 폴더 안에 넣습니다. 권장: 세로형 JPG/PNG(예: `profile.jpg`), 대략 4:5 비율.
2. `content.js`의 사진 경로만 바꿉니다.

```js
aboutPhoto: 'assets/profile.jpg',
```

사진 파일 이름과 확장자(`jpg` / `jpeg` / `png`)가 **완전히 일치**해야 합니다. GitHub에서는 영문 대소문자도 구분합니다. 사진을 넣어도 첫 화면에는 나타나지 않고 **소개 폴더 안에서만** 보입니다.

## 6. 글꼴·색·폴더 크기 바꾸기

### 글꼴

`content.js`에서 한 줄 수정:

```js
fontPreset: 'storybook',   // 따뜻하고 빈티지한 제목
// 또는 'classic'         // 학술형 세리프
// 또는 'rounded'         // 부드러운 둥근 글꼴
```

### 색상

`style.css` 맨 위 `:root { ... }`에서 배경색 조정:

```css
--stripe-blue: #c6dce1;
--stripe-tan: #e0cfb2;
--rust: #9a5147;
```

4개 폴더 색은 `.folder--mocha`, `.folder--cocoa`, `.folder--linen`, `.folder--rose`에서 변경할 수 있습니다.

### 폴더 가로폭 / 비율 / 간격

`style.css`에서 다음 설정을 찾으세요.

```css
.folder-grid {
  grid-template-columns: repeat(4, minmax(0, 156px)); /* 각 폴더 가로폭 */
  column-gap: 42px;                                   /* 최소 간격 */
  width: min(860px, 100%);                            /* 폴더 전체 배치 너비 */
}
.folder-art { aspect-ratio: 1.18; }                   /* 가로 / 세로 */
```

- 더 **좁고 세로로 긴 폴더**: `156px` → `145px`, `1.18` → `1.08`
- 폴더 사이를 **더 벌리기**: 전체 너비 `860px` → `900px` (`justify-content:space-between`이 적용되어 있음)
- 첫 화면 이름 크기: `.hero h1`의 `font-size`

참고: 좁은 화면용 `@media` 설정에도 폴더 너비가 별도로 있으므로 필요하면 같이 조정하세요.

## 7. GitHub Pages에 올리기

### GitHub 웹에서 업로드

1. 본인 GitHub 저장소(예: `내아이디.github.io`)를 엽니다.
2. 저장소의 **최상위(root)** 위치에서 `Add file` → `Upload files`를 누릅니다.
3. 압축파일 안에 있던 **`index.html`, `content.js`, `style.css`, `main.js`, `assets/` 폴더**를 올립니다. ZIP 자체를 올리는 것이 아니라 **압축을 푼 파일들**을 올립니다.
4. 화면 아래 `Commit changes`로 저장합니다.
5. `Settings` → `Pages`에서 `Deploy from a branch`, `main` / `/(root)`를 선택하고 저장합니다(이미 설정했으면 생략).
6. 개인 저장소명이 `내아이디.github.io`이면 주소는 `https://내아이디.github.io/`입니다.

### Git Bash에서 업로드

Git 저장소 폴더에 이 파일들을 복사한 뒤:

```bash
git add index.html content.js style.css main.js assets/
git commit -m "Update personal homepage"
git push origin main
```

이미 같은 이름의 파일이 있다면 **덮어쓰기 전에 백업**하세요. 기존 프로젝트의 다른 파일은 삭제하지 않아도 됩니다.

## 8. 자주 발생하는 문제

- **체크/배경·폴더 디자인이 사라짐** → `style.css`가 `index.html`과 같은 폴더에 있는지 확인하세요.
- **언어 버튼이나 폴더 클릭이 안 됨** → `content.js`와 `main.js`가 둘 다 같은 위치인지, `content.js`의 쉼표/따옴표가 맞는지 확인하세요.
- **사진이 안 뜸** → `assets/profile.jpg` 등 경로, 이름, 확장자, 대소문자를 확인하세요.
- **아무리 바꿔도 화면이 그대로임** → 변경 파일을 저장했는지, GitHub에 다시 업로드/`git push`했는지 확인하고 `Ctrl+Shift+R` 해보세요.
- **커밋할 때 Vim 화면이 나옴** → 명령어를 `git commit -m "Update homepage"` 형태로 실행하면 별도 메시지 편집기를 열지 않습니다.

홈페이지 구성: `HTML + CSS + JavaScript`, 프레임워크/빌드 도구 없음. Google Fonts는 인터넷이 연결되면 로드되며, 연결이 없어도 기본 대체 글꼴로 표시됩니다.
