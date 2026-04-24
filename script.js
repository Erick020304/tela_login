const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const togglePassword = document.getElementById("togglePassword");
const toggleTheme = document.getElementById("toggleTheme");
const toggleForm = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");

let isLogin = true; // controla login ou cadastro

/* =========================
   Mostrar/Ocultar Senha
========================= */
togglePassword.addEventListener("click", () => {
  const password = document.getElementById("password");

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});


// Verifica tema salvo ao carregar
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleTheme.textContent = "☀️"; // sol no modo escuro
} else {
  toggleTheme.textContent = "🌙"; // lua no modo claro
}

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleTheme.textContent = "☀️"; // muda para sol
  } else {
    localStorage.setItem("theme", "light");
    toggleTheme.textContent = "🌙"; // muda para lua
  }
});

/* =========================
   Alternar Login / Cadastro
========================= */
toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;

  if (isLogin) {
    formTitle.textContent = "Login";
    toggleForm.textContent = "Criar conta";
  } else {
    formTitle.textContent = "Cadastro";
    toggleForm.textContent = "Já tenho conta";
  }

  message.textContent = "";
});

/* =========================
    LocalStorage (Login + Cadastro)
========================= */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (isLogin) {
    // LOGIN
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password
    ) {
      message.style.color = "green";
      message.textContent = "Login realizado!";

      // salvar sessão
      localStorage.setItem("loggedIn", "true");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      message.style.color = "red";
      message.textContent = "Email ou senha inválidos!";
    }

  } else {
    // CADASTRO
    const user = {
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    message.style.color = "green";
    message.textContent = "Conta criada com sucesso!";

    // volta para login automaticamente
    isLogin = true;
    formTitle.textContent = "Login";
    toggleForm.textContent = "Criar conta";
  }
});