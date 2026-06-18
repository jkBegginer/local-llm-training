# 로컬 LLM 세팅 교육 웹사이트

폐쇄망 업무 환경을 고려한 로컬 LLM 세팅 교육용 정적 웹사이트입니다.

## 파일 구성

- `index.html`: 웹사이트 본문
- `styles.css`: 화면 스타일
- `script.js`: 코드/커맨드 복사 기능
- `local-llm-website-plan.md`: 원본 계획서

## 로컬에서 확인

`index.html` 파일을 브라우저로 열면 됩니다.

## GitHub에 올릴 때

처음 올리는 경우:

```bash
git init
git add .
git commit -m "Add local LLM training website"
git branch -M main
git remote add origin https://github.com/USER/REPOSITORY.git
git push -u origin main
```

이미 Git 저장소라면:

```bash
git add .
git commit -m "Update local LLM training website"
git push
```

## GitHub Pages 배포

1. GitHub 저장소로 이동
2. `Settings` 선택
3. `Pages` 선택
4. `Build and deployment`에서 `Deploy from a branch` 선택
5. Branch를 `main`, 폴더를 `/root`로 선택
6. 저장 후 표시되는 Pages URL로 접속

## 참고 공식 문서

- [Ollama Windows 다운로드](https://ollama.com/download/windows)
- [Ollama qwen2.5-coder](https://ollama.com/library/qwen2.5-coder)
- [Continue config.yaml Reference](https://docs.continue.dev/reference)
- [Continue Ollama Guide](https://docs.continue.dev/guides/ollama-guide)
