# 로컬 LLM 세팅 교육 웹사이트 계획서

## 1. 목적

폐쇄망 업무 환경에서 일하는 개발자들이 로컬 LLM의 기본 구조를 이해하고, 인터넷이 가능한 교육 환경에서 직접 세팅해보는 웹사이트를 만든다.

교육은 인터넷이 되는 환경에서 진행한다. 교육생의 실제 업무 환경은 폐쇄망 또는 보안 제약이 있는 환경으로 가정한다.

## 2. 대상

- 프로그래머
- 외부 AI 서비스를 업무에 바로 쓰기 어려운 개발자
- 로컬 LLM으로 코드 설명, 오류 분석, 메일 작성 등을 해보고 싶은 사람

## 3. 수업 구성

```text
1교시: 이론 교육
2교시: 커맨드 세팅 & 간단 실습
```

## 4. 1교시: 이론 교육

1교시는 구성요소와 역할까지만 설명한다.

### 구성요소

| 구성요소 | 역할 |
| --- | --- |
| 모델 | 질문을 이해하고 답변을 생성함 |
| 서빙 | 모델을 실행하고 API로 연결해줌 |
| 에이전트 | 개발 도구에서 모델을 활용하게 해줌 |
| 채팅 UI | 브라우저나 앱에서 모델과 대화하게 해줌 |

### 전체 흐름

```text
사용자
  ↓
에이전트 또는 채팅 UI
  ↓
서빙
  ↓
모델
  ↓
응답
```

## 5. 2교시: 커맨드 세팅 & 간단 실습

2교시에서는 구성요소별 대표 도구를 소개하고, 그중 이번 실습에서 사용할 도구를 설치한다.

### 대표 도구

| 구성요소 | 대표 도구 | 이번 실습 |
| --- | --- | --- |
| 모델 | Qwen(큐원), Llama(라마), Mistral(미스트랄) | Qwen Coder(큐원 코더) |
| 서빙 | Ollama(올라마), LM Studio(엘엠 스튜디오), llama.cpp(라마 씨피피) | Ollama(올라마) |
| 에이전트 | Continue(컨티뉴, VS Code/JetBrains 둘 다), Cline(씨라인), Roo Code(루 코드), Aider(에이더) | Continue(컨티뉴) |
| 채팅 UI | Open WebUI(오픈 웹유아이), AnythingLLM(애니씽 엘엘엠), LM Studio(엘엠 스튜디오), Ollama CLI(올라마 명령어) | Ollama CLI(올라마 명령어) |

### Qwen Coder 모델별 대략 사양

| 모델 | 권장 메모리 | 그래픽카드 | 비고 |
| --- | --- | --- | --- |
| 0.5B | RAM 8GB | 없어도 가능 | 가장 가벼운 테스트용 |
| 1.5B | RAM 8GB | 없어도 가능 | 자동완성, 가벼운 실습용 |
| 3B | RAM 8GB~16GB | 없어도 가능 | 일반 노트북 실습 가능 |
| 7B | RAM 16GB 권장 | NVIDIA VRAM 8GB 이상이면 좋음 | 이번 실습 추천 |
| 14B | RAM 32GB 권장 | NVIDIA VRAM 12GB~16GB 권장 | 속도 부담 있음 |
| 32B | RAM 32GB~64GB 권장 | NVIDIA VRAM 24GB 이상 권장 | 개인 PC 실습에는 무거움 |

참고:

- NVIDIA 그래픽카드가 있으면 GPU 가속을 쓰기 쉽다.
- NVIDIA가 아니어도 Windows에 Ollama 설치는 가능하다.
- 다만 GPU 가속이 안 잡히면 CPU 실행에 가까워져 많이 느릴 수 있다.
- WSL/Linux 설치는 Linux 개발 환경이나 CUDA 구성이 필요할 때 선택할 수 있는 방식이지 필수는 아니다.

## 6. 실습 순서

### 1. Ollama 설치

Ollama(올라마) 공식 사이트에서 Windows 설치 파일을 다운로드해 설치한다.

### 2. Ollama 설치 확인

```bash
ollama --version
```

### 3. 모델 다운로드

```bash
ollama pull qwen2.5-coder:7b
```

### 4. 모델 실행

```bash
ollama run qwen2.5-coder:7b
```

### 5. 실행 중인 모델 확인

```bash
ollama ps
```

### 6. 모델 목록 확인

```bash
ollama list
```

### 7. 개발 도구 연결

기본 연결 정보:

```text
API 주소: http://localhost:11434
모델명: qwen2.5-coder:7b
```

### 8. Continue YAML 설정

Continue(컨티뉴)는 `config.yaml` 파일에 Ollama 모델 정보를 적어서 연결한다.

설정 파일 위치:

```text
C:\Users\사용자명\.continue\configs\config.yaml
```

작성 예시:

```yaml
name: Local Qwen
version: 0.0.1
schema: v1

models:
  - name: Qwen2.5 Coder 7B
    provider: ollama
    model: qwen2.5-coder:7b
    apiBase: http://localhost:11434
    roles:
      - chat
      - edit
      - apply
    defaultCompletionOptions:
      contextLength: 4096
      temperature: 0.2
```

주의할 점:

- `model` 값은 `ollama list`에 보이는 모델명과 정확히 같아야 한다.
- `qwen2.5-coder`처럼 태그를 빼면 기본 모델이 받아질 수 있으므로 교육에서는 `qwen2.5-coder:7b`처럼 명확히 쓴다.
- Continue에서 메모리 부족이 나면 `contextLength`를 더 낮추거나 더 작은 모델을 사용한다.

## 7. 간단 실습

### 실습 1: C# 코드 설명

먼저 간단한 C# 코드가 어떤 일을 하는지 설명시키는 실습을 한다.

```csharp
public List<string> FindDuplicates(List<string> items)
{
    var seen = new HashSet<string>();
    var duplicates = new HashSet<string>();

    foreach (var item in items)
    {
        if (seen.Contains(item))
        {
            duplicates.Add(item);
        }
        else
        {
            seen.Add(item);
        }
    }

    return duplicates.ToList();
}
```

프롬프트:

```text
이 C# 함수가 어떤 일을 하는지 설명하고, 시간 복잡도와 공간 복잡도를 알려줘.
```

### 실습 2: C# 코드 리팩터링

지저분한 C# 코드를 더 읽기 좋게 바꾸는 실습을 한다.

```csharp
public string GetUserStatus(User user)
{
    if (user != null)
    {
        if (user.IsDeleted == false)
        {
            if (user.IsActive == true)
            {
                if (user.LastLoginDate != null)
                {
                    var days = (DateTime.Now - user.LastLoginDate.Value).Days;
                    if (days < 30)
                    {
                        return "Active";
                    }
                    else
                    {
                        return "Dormant";
                    }
                }
                else
                {
                    return "NeverLoggedIn";
                }
            }
            else
            {
                return "Inactive";
            }
        }
        else
        {
            return "Deleted";
        }
    }
    else
    {
        return "Unknown";
    }
}
```

프롬프트:

```text
이 C# 코드를 더 읽기 좋게 리팩터링해줘.
중첩 if를 줄이고, 상태값이 어떻게 결정되는지도 간단히 설명해줘.
```

### 실습 3: 메일 작성

상황:

```text
내부 API 장애로 배치 작업이 실패했다.
원인은 인증 토큰 만료였고, 토큰 갱신 후 재처리는 완료됐다.
영향 범위는 전일 23:00부터 금일 01:00까지 생성된 일부 리포트다.
```

프롬프트:

```text
위 상황을 바탕으로 운영팀과 개발팀에 보낼 장애 공유 메일 초안을 작성해줘.
원인, 영향 범위, 조치 내용, 재발 방지 계획 순서로 정리해줘.
```

## 8. 완료 기준

- 모델, 서빙, 에이전트, 채팅 UI의 역할을 설명할 수 있다.
- Ollama로 Qwen 모델을 실행할 수 있다.
- 개발 도구에서 로컬 LLM을 연결할 수 있다.
- 코드 설명과 메일 작성 실습을 완료한다.
