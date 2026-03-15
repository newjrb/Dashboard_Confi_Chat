// ==========================================
// DADOS 100% REAIS DO CONFI CHAT (TRIMESTRE JAN-MAR)
// ==========================================

const dadosClientes = {
    atendidos: 776,
    aguardando: 18,
    resolucoesTotais: "2.311",
    listaRecentes: [
        { nome: "Douglas Bugrinho", data: "Trimestre", avatar: "DB" },
        { nome: "Negah 🌻", data: "Trimestre", avatar: "NG" },
        { nome: "Junior Oliviera", data: "Trimestre", avatar: "JO" },
        { nome: "Ney Gomes JR.", data: "Trimestre", avatar: "NJ" },
        { nome: "TRIBUTOS TAQUARIVAI", data: "Trimestre", avatar: "TT" },
        { nome: "Carlos", data: "Trimestre", avatar: "CR" },
        { nome: "Quel", data: "Trimestre", avatar: "QL" },
        { nome: "VAGNER GRECO CAIXA", data: "Trimestre", avatar: "VG" },
        { nome: "FABIO MOTOS", data: "Trimestre", avatar: "FM" },
        { nome: "Valter Lucas", data: "Trimestre", avatar: "VL" },
        { nome: "Confi Financeiro", data: "Trimestre", avatar: "CF" },
        { nome: "Setor da Receita - Itararé", data: "Trimestre", avatar: "SR" },
        { nome: "Bruto Florestal", data: "Trimestre", avatar: "BF" },
        { nome: "Cristiane Almeida", data: "Trimestre", avatar: "CA" },
        { nome: "Ana Gama", data: "Trimestre", avatar: "AG" },
        { nome: "Myrella Moraes", data: "Trimestre", avatar: "MM" },
        { nome: "RAFAELA RS ADVOGADOS", data: "Trimestre", avatar: "RR" },
        { nome: "ADALBERTO WENZEL", data: "Trimestre", avatar: "AW" },
        { nome: "Hiter Pereira", data: "Trimestre", avatar: "HP" },
        { nome: "Waldir de Oliveira", data: "Trimestre", avatar: "WO" },
        { nome: "César Silva", data: "Trimestre", avatar: "CS" }
    ],
    historicoSemanal: [85, 120, 95, 110, 130, 45, 191]
};

const dadosAgentes = {
    performanceMedia: "92%",
    lista: [
        { nome: "Aline Kaylaine", resolucoes: 575, conversas: 198, avatar: "AK", status: "Online" },
        { nome: "Aline Daiane", resolucoes: 156, conversas: 27, avatar: "AD", status: "Online" },
        { nome: "Juliane", resolucoes: 143, conversas: 62, avatar: "JL", status: "Online" },
        { nome: "Alana", resolucoes: 139, conversas: 46, avatar: "AL", status: "Online" },
        { nome: "Marcele", resolucoes: 137, conversas: 33, avatar: "MC", status: "Online" },
        { nome: "Sullyvan", resolucoes: 131, conversas: 39, avatar: "SV", status: "Online" },
        { nome: "Laura", resolucoes: 119, conversas: 30, avatar: "LR", status: "Online" },
        { nome: "Valdecir", resolucoes: 109, conversas: 36, avatar: "VC", status: "Online" },
        { nome: "Elisangela", resolucoes: 106, conversas: 13, avatar: "EL", status: "Online" },
        { nome: "Cibelle", resolucoes: 104, conversas: 44, avatar: "CB", status: "Online" },
        { nome: "Janahyara", resolucoes: 103, conversas: 41, avatar: "JY", status: "Online" },
        { nome: "Evelyn", resolucoes: 68, conversas: 22, avatar: "EV", status: "Online" },
        { nome: "Abel Junior", resolucoes: 62, conversas: 12, avatar: "AJ", status: "Offline" },
        { nome: "Polyana", resolucoes: 61, conversas: 18, avatar: "PY", status: "Online" },
        { nome: "Isadora", resolucoes: 37, conversas: 8, avatar: "ID", status: "Online" },
        { nome: "Ana Gama", resolucoes: 35, conversas: 8, avatar: "AG", status: "Online" },
        { nome: "Antonio", resolucoes: 31, conversas: 7, avatar: "AN", status: "Online" },
        { nome: "João", resolucoes: 23, conversas: 9, avatar: "JO", status: "Online" },
        { nome: "Glades", resolucoes: 22, conversas: 9, avatar: "GD", status: "Online" },
        { nome: "Adilson", resolucoes: 17, conversas: 1, avatar: "AS", status: "Online" },
        { nome: "Cristiane", resolucoes: 6, conversas: 0, avatar: "CR", status: "Online" },
        { nome: "Jefferson", resolucoes: 5, conversas: 2, avatar: "JF", status: "Online" },
        { nome: "Rayssa", resolucoes: 0, conversas: 0, avatar: "RS", status: "Online" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Garantir que Chart.js está carregado antes de renderizar
    if (typeof Chart !== 'undefined') {
        initDashboard();
        renderChart();
    } else {
        console.error("Chart.js não foi carregado corretamente.");
        setTimeout(initDashboard, 500); // Tentar novamente em breve
    }
});

function initDashboard() {
    // 1. Atualizar métricas de Clientes
    animateValue('val-atendidos', 0, dadosClientes.atendidos, 1500);
    animateValue('val-pendentes', 0, dadosClientes.aguardando, 1000);
    
    // 2. Atualizar métricas de Performance
    document.getElementById('val-sla').innerText = dadosAgentes.performanceMedia;
    document.getElementById('val-resoluções').innerText = dadosClientes.resolucoesTotais;

    // 3. Renderizar Ranking de Atendentes (EXCLUSIVO AGENTES)
    const rankingEl = document.getElementById('ranking-agentes');
    rankingEl.innerHTML = ''; 

    dadosAgentes.lista.forEach((agente, index) => {
        const item = document.createElement('li');
        item.className = 'ranking-item clickable';
        item.onclick = () => openAgentDetail(agente);
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.innerHTML = `
            <span class="agent-rank">#${index + 1}</span>
            <div class="agent-avatar-small">${agente.avatar}</div>
            <div class="agent-info">
                <span class="agent-name">${agente.nome}</span>
                <span class="agent-score">${agente.resolucoes} resoluções</span>
            </div>
            <div class="agent-trend up">
                <span class="trend-tag">Ativo</span>
            </div>
        `;
        rankingEl.appendChild(item);
    });

    // 4. Renderizar Lista de Clientes Atendidos (EXCLUSIVO CLIENTES)
    const listaClientesEl = document.getElementById('lista-clientes');
    listaClientesEl.innerHTML = '';

    dadosClientes.listaRecentes.forEach((cliente, index) => {
        const item = document.createElement('li');
        item.className = 'ranking-item';
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.innerHTML = `
            <div class="agent-avatar-small" style="color:var(--accent-green)">${cliente.avatar}</div>
            <div class="agent-info">
                <span class="agent-name">${cliente.nome}</span>
                <span class="agent-score">Atendido em: ${cliente.data}</span>
            </div>
        `;
        listaClientesEl.appendChild(item);
    });

    // Data de Corte (Conforme solicitado)
    document.getElementById('display-date').innerText = "Consolidado: 13 de Março, 2026";
}

// LÓGICA DO MODAL
function openDetail(type) {
    const modal = document.getElementById('detail-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    modal.classList.add('active');
    
    let content = "";
    switch(type) {
        case 'clientes_atendidos':
            title.innerText = "Clientes Atendidos (Trimestre)";
            content = `<p>O Confi Chat registrou um total de <strong>${dadosClientes.atendidos}</strong> conversas atendidas.</p>
                       <p>Volume médio mensal: ~258 clientes.</p>`;
            break;
        case 'clientes_espera':
            title.innerText = "Situação da Fila";
            content = `<p>Há <strong>${dadosClientes.aguardando}</strong> clientes aguardando resposta neste exato momento.</p>
                       <p>Tempo de espera médio de fila: 2m 15s.</p>`;
            break;
        case 'sla_agentes':
            title.innerText = "Eficiência da Equipe";
            content = `<p>A taxa de eficiência geral está em <strong>${dadosAgentes.performanceMedia}</strong>.</p>
                       <p>Este índice mede a satisfação e rapidez no fechamento.</p>`;
            break;
        case 'resolucoes_totais':
            title.innerText = "Total de Resoluções";
            content = `<p>Impressionante volume de <strong>${dadosClientes.resolucoesTotais}</strong> problemas resolvidos pela equipe.</p>`;
            break;
    }
    body.innerHTML = content;
}

function openAgentDetail(agente) {
    const modal = document.getElementById('detail-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    modal.classList.add('active');
    title.innerText = `Agente: ${agente.nome}`;
    body.innerHTML = `
        <div style="display:flex; gap:20px; align-items:center; margin-bottom:20px;">
            <div class="avatar" style="width:80px; height:80px; font-size:32px;">${agente.avatar}</div>
            <div>
                <p>Status: <span style="color:${agente.status === 'Online' ? 'var(--accent-green)' : 'var(--text-secondary)'}">${agente.status}</span></p>
                <p>Resoluções: <strong>${agente.resolucoes}</strong></p>
                <p>Conversas: <strong>${agente.conversas}</strong></p>
            </div>
        </div>
        <p>Aline Kaylaine e equipe mantêm alto padrão de atendimento no Confi Chat.</p>
    `;
}

function closeModal() {
    document.getElementById('detail-modal').classList.remove('active');
}

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    const endVal = parseInt(end.toString().replace(/\./g, ''));
    const range = endVal - start;
    let current = start;
    const increment = Math.max(1, Math.floor(range / (duration / 16)));
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= endVal) {
            obj.innerText = end;
            clearInterval(timer);
        } else {
            obj.innerText = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}


function renderChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    const placeholder = document.querySelector('.visual-placeholder');
    if (placeholder) placeholder.remove();

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
            datasets: [{
                label: 'Interações Confi Chat',
                data: dadosClientes.historicoSemanal,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 9
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}
