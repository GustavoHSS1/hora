const ano = new Date().getFullYear();
// Novembro é mês 10 (0-based)
const dataEvento1 = new Date(ano, 10, 29, 0, 0, 0);
let celebracaoAtivada = false;

function calcularTempoFaltando(dataFutura) {
    const agora = new Date();
    let diferencaEmMs = dataFutura - agora;
    if (diferencaEmMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };

    const totalSegundos = Math.floor(diferencaEmMs / 1000);
    const days = Math.floor(totalSegundos / (3600 * 24));
    const hours = Math.floor((totalSegundos % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSegundos % 3600) / 60);
    const seconds = totalSegundos % 60;

    return { days, hours, minutes, seconds, finished: false };
}

function dispararConfete() {
    if (!window.confetti) return;
    
    // Dispara múltiplos confetes em locais aleatórios
    for (let i = 0; i < 5; i++) {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { x: Math.random(), y: Math.random() * 0.5 },
            colors: ['#ff6b6b', '#ff8c42', '#ffd93d', '#6bcf7f', '#4d96ff']
        });
    }
}

function formatClock(t) {
    return `${String(t.hours).padStart(2, '0')}:${String(t.minutes).padStart(2, '0')}:${String(t.seconds).padStart(2, '0')}`;
}

function atualizarContadores() {
    const t1 = calcularTempoFaltando(dataEvento1);
    const el1 = document.getElementById('countdown1');

    if (!el1) return;

    if (t1.finished) {
        el1.classList.add('celebration');
        if (!celebracaoAtivada) {
            celebracaoAtivada = true;
            dispararConfete();
            // Dispara confetes periodicamente enquanto a página estiver aberta
            setInterval(dispararConfete, 2000);
        }
        el1.innerHTML = `<div class="days">🎉 CHEGOU! 🎉</div><div class="clock">GANDAIA!</div>`;
        return;
    }

    el1.classList.remove('celebration');
    const diasTexto = `${t1.days} ${t1.days === 1 ? 'dia' : 'dias'}`;
    el1.innerHTML = `<div class="days">${diasTexto}</div><div class="clock">${formatClock(t1)}</div>`;
}

atualizarContadores();
setInterval(atualizarContadores, 1000);
