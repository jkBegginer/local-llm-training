const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

document.querySelectorAll("pre").forEach((block) => {
  const code = block.querySelector("code");
  if (!code) return;

  const button = document.createElement("button");
  button.className = "copy-button";
  button.type = "button";
  button.textContent = "복사";
  button.setAttribute("aria-label", "코드 복사");

  button.addEventListener("click", async () => {
    try {
      await copyText(code.innerText);
      button.textContent = "완료";
      window.setTimeout(() => {
        button.textContent = "복사";
      }, 1200);
    } catch {
      button.textContent = "실패";
      window.setTimeout(() => {
        button.textContent = "복사";
      }, 1200);
    }
  });

  block.appendChild(button);
});
