const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#navigation");
  const mobileViewport = window.matchMedia("(max-width: 780px)");

  document.documentElement.classList.add("js");
  menuButton.hidden = false;

  function setMenu(open) {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "Закрыть" : "Меню";
    navigation.classList.toggle("is-open", open);
  }

  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !mobileViewport.matches) return;

    setMenu(false);
    const section = document.querySelector(link.getAttribute("href"));
    const heading = section?.querySelector("h2");

    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      heading.addEventListener("blur", () => {
        heading.removeAttribute("tabindex");
      }, { once: true });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      menuButton.focus();
    }
  });

  mobileViewport.addEventListener("change", () => setMenu(false));

  const form = document.querySelector("#application-form");
  const nameInput = document.querySelector("#name");
  const message = document.querySelector("#form-message");

  form.setAttribute("aria-describedby", "form-note");

  const nameError = document.querySelector("#name-error");
function validateName(showError = false) {
  const valid = Boolean(nameInput.value.trim());
  const text = valid ? "" : "Пожалуйста, введи имя, а не только пробелы.";
  nameInput.setCustomValidity(text);
  if (showError || nameInput.getAttribute("aria-invalid") === "true") {
    nameError.textContent = text;
    nameError.hidden = valid;
    nameInput.setAttribute("aria-invalid", String(!valid));
  }
  return valid;
}
nameInput.addEventListener("input", () => validateName());
nameInput.addEventListener("blur", () => validateName(true));
nameInput.addEventListener("invalid", () => validateName(true));

form.addEventListener("input", () => {
    message.textContent = "";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    nameInput.setCustomValidity(
      nameInput.value.trim() ? "" : "Пожалуйста, введи имя."
    );

    if (!form.reportValidity()) return;

    message.textContent =
      "Поля заполнены корректно. Это демонстрационная форма: заявка не отправлена, данные не сохранены.";
  });
