/* ============================================================
   main.js — JavaScript do Currículo de Alciran Frazão
   
   O que esse arquivo faz:
   1. Animação de digitação do cargo na tela inicial
   2. Menu hambúrguer (abrir/fechar no celular)
   3. Navbar muda de aparência ao fazer scroll
   4. Elementos aparecem suavemente ao entrar na tela (scroll)
   5. Barras de habilidades animadas
   6. Ano atual no rodapé automático
   ============================================================ */


/* ============================================================
   1. ANIMAÇÃO DE DIGITAÇÃO
   Simula o efeito de alguém digitando o cargo na tela
   ============================================================ */

// Textos que vão ser "digitados" em sequência
const textos = [
  'Software Developer',
  'Java · C# · .NET · AWS',
  'Backend Developer'
];

let indiceTxt = 0;    // qual texto estamos mostrando agora
let indicLetra = 0;   // qual letra estamos no texto atual
let apagando = false;  // true = está apagando, false = está digitando

// Busca o elemento HTML onde o texto vai aparecer
const elementoDigitacao = document.getElementById('typingText');

// Função que executa o efeito de digitação
function digitar() {
  // Proteção: se o elemento não existir, para aqui
  if (!elementoDigitacao) return;

  const textoAtual = textos[indiceTxt];

  if (!apagando) {
    // --- DIGITANDO ---
    // Adiciona uma letra por vez
    elementoDigitacao.innerHTML = textoAtual.substring(0, indicLetra + 1) + '<span class="cursor"></span>';
    indicLetra++;

    // Terminou de digitar a palavra? Espera 2s e começa a apagar
    if (indicLetra === textoAtual.length) {
      apagando = true;
      setTimeout(digitar, 2000);  // pausa de 2 segundos antes de apagar
      return;
    }
    setTimeout(digitar, 80);      // velocidade de digitação: 80ms por letra

  } else {
    // --- APAGANDO ---
    elementoDigitacao.innerHTML = textoAtual.substring(0, indicLetra - 1) + '<span class="cursor"></span>';
    indicLetra--;

    // Apagou tudo? Passa para o próximo texto
    if (indicLetra === 0) {
      apagando = false;
      indiceTxt = (indiceTxt + 1) % textos.length;  // volta ao início quando chegar no fim
      setTimeout(digitar, 400);  // pausa antes de começar a digitar de novo
      return;
    }
    setTimeout(digitar, 40);    // velocidade de apagar: mais rápido que digitar
  }
}

// Inicia a animação quando a página carregar (500ms de delay para suavizar)
setTimeout(digitar, 500);


/* ============================================================
   2. MENU HAMBÚRGUER (celular)
   Ao clicar nas 3 linhas, o menu abre/fecha
   ============================================================ */

// Pega os elementos do HTML
const botaoMenu = document.getElementById('navToggle');
const linksMenu = document.getElementById('navLinks');

// Verifica se esses elementos existem na página (nem toda página tem navbar)
if (botaoMenu && linksMenu) {
  botaoMenu.addEventListener('click', function () {
    // Alterna a classe "open" — o CSS cuida de mostrar/esconder o menu
    linksMenu.classList.toggle('open');
  });

  // Fecha o menu ao clicar em qualquer link dentro dele
  linksMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      linksMenu.classList.remove('open');
    });
  });
}


/* ============================================================
   3. NAVBAR COM SCROLL
   A navbar fica mais sólida quando o usuário rola a página
   ============================================================ */

const navbar = document.getElementById('navbar');

// Adiciona um "ouvinte" que reage ao evento de scroll (rolar a página)
window.addEventListener('scroll', function () {
  if (!navbar) return;

  if (window.scrollY > 60) {
    // Usuário rolou mais de 60px: navbar fica mais escura
    navbar.style.background = 'rgba(13, 17, 23, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    // Voltou ao topo: navbar fica semi-transparente novamente
    navbar.style.background = 'rgba(13, 17, 23, 0.92)';
    navbar.style.boxShadow = 'none';
  }
});


/* ============================================================
   4. ANIMAÇÃO DE ENTRADA AO FAZER SCROLL (Intersection Observer)
   
   O que é isso?
   O "Intersection Observer" é uma API do navegador que avisa
   quando um elemento entra ou sai da área visível da tela.
   Usamos isso para fazer os elementos aparecerem suavemente
   só quando o usuário chega até eles — efeito profissional!
   ============================================================ */

// Configuração do observador:
// threshold: 0.1 = avisa quando 10% do elemento está visível
const opcoes = { threshold: 0.1 };

// Cria o observador
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      // Elemento entrou na tela: adiciona classe "visible"
      // O CSS (transition) cuida da animação de aparecimento
      entrada.target.classList.add('visible');

      // Para de observar após aparecer (não precisa mais)
      observador.unobserve(entrada.target);
    }
  });
}, opcoes);

// Observa todos os elementos com essas classes
const elementosAnimados = document.querySelectorAll('.fade-in, .card, .skill-item');
elementosAnimados.forEach(function (el) {
  observador.observe(el);
});


/* ============================================================
   5. ANO ATUAL NO RODAPÉ
   Atualiza automaticamente — não precisa trocar na virada do ano!
   ============================================================ */

const spanAno = document.getElementById('anoAtual');
if (spanAno) {
  spanAno.textContent = new Date().getFullYear();
}


/* ============================================================
   6. DESTACAR LINK ATIVO NA NAVBAR
   Sublinha o link que corresponde à página atual
   ============================================================ */

// Pega o nome do arquivo atual (ex: "experiencias.html")
const paginaAtual = window.location.pathname.split('/').pop();

// Para cada link do menu, verifica se aponta para a página atual
document.querySelectorAll('.nav-links a').forEach(function (link) {
  if (link.getAttribute('href').includes(paginaAtual) && paginaAtual !== '') {
    link.style.color = 'var(--cor-destaque)';  // pinta de azul o link ativo
    link.style.borderBottom = '2px solid var(--cor-destaque)';
    link.style.paddingBottom = '2px';
  }
});
