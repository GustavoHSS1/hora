const ano = new Date().getFullYear();
// Novembro é mês 10 (0-based)
const dataEvento1 = new Date(ano, 10, 29, 0, 0, 0);

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

function formatClock(t) {
    return `${String(t.hours).padStart(2, '0')}:${String(t.minutes).padStart(2, '0')}:${String(t.seconds).padStart(2, '0')}`;
}

function atualizarContadores() {
    const t1 = calcularTempoFaltando(dataEvento1);
    const el1 = document.getElementById('countdown1');

    if (!el1) return;

    if (t1.finished) {
        el1.innerHTML = `<div class="days">0 d</div><div class="clock">Já passou</div>`;
        return;
    }

    const diasTexto = `${t1.days} ${t1.days === 1 ? 'dia' : 'dias'}`;
    el1.innerHTML = `<div class="days">${diasTexto}</div><div class="clock">${formatClock(t1)}</div>`;
}

atualizarContadores();
setInterval(atualizarContadores, 1000);
