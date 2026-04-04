// ═══════════════════════════════════════════════════════════
//  TRAVEL INTELLIGENCE SYSTEM — app.js
//  Agents: Weather · Route · Cost · Strategic Plan · Orchestrator
// ═══════════════════════════════════════════════════════════

// ── Tab Switching ──────────────────────────────────────────
const SECTIONS = {
    weather : 'weatherSection',
    route   : 'routePlanningSection',
    cost    : 'costEstimationSection',
    plan    : 'strategicPlanSection',
    orch    : 'orchSection',
    conflict: 'conflictSection'
};

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`);
    if (btn) btn.classList.add('active');
    Object.values(SECTIONS).forEach(id => document.getElementById(id).style.display = 'none');
    document.getElementById(SECTIONS[tab]).style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
}

// ── Shared Helpers ─────────────────────────────────────────
function setButtonState(ids, disabled) {
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.disabled = disabled; el.style.opacity = disabled ? '0.5' : '1'; }
    });
}

function showLoading(show) {
    document.getElementById('resultsSection').style.display = show ? 'none' : 'block';
    setButtonState(['analyzeBtn','routeBtn','costBtn','planBtn','orchBtn'], show);
}

async function pause(ms = 1000) {
    return new Promise(r => setTimeout(r, ms));
}

function hideAllResults() {
    ['weatherResults','routeResults','costResults','strategicResults','orchResults']
        .forEach(id => { const el = document.getElementById(id); if(el) el.style.display = 'none'; });
}

function scrollToResults() {
    document.getElementById('resultsSection').scrollIntoView({ behavior:'smooth', block:'start' });
}


// ════════════════════════════════════════════════════════════
//  AGENT COMPUTATION ENGINES (pure functions — no side effects)
// ════════════════════════════════════════════════════════════

function computeRoute(src, dest) {
    const s = (src + ' ' + dest).toLowerCase();
    let distance_km = 305, eta_minutes = 210;
    let main_route = `${src} → ${dest} via Primary Highway`;
    let alternative_route = 'Secondary Bypass (10% longer)';

    if (s.includes('mumbai') && (s.includes('pune') || s.includes('goa'))) {
        distance_km = 150; eta_minutes = 165;
        main_route = 'Mumbai-Pune Expressway (NH-48)';
        alternative_route = 'Old NH-4 via Khopoli Ghat';
    } else if (s.includes('delhi') && (s.includes('agra') || s.includes('jaipur'))) {
        distance_km = 230; eta_minutes = 200;
        main_route = 'Yamuna Expressway (NH-19)';
        alternative_route = 'NH-2 via Mathura';
    } else if (s.includes('san francisco') || s.includes('tahoe')) {
        distance_km = 305; eta_minutes = 210;
        main_route = 'I-80 E to US-50 E via Sacramento';
        alternative_route = 'Northern bypass via CA-89 (Truckee)';
    } else if (s.includes('los angeles') || s.includes('la')) {
        distance_km = 615; eta_minutes = 360;
        main_route = 'I-405 N to I-5 N';
        alternative_route = 'US-101 N (Scenic Coastal)';
    }

    const steps = [
        `Commence departure from ${src} — initiate all pre-trip checks.`,
        'Enter the primary transit corridor and synchronize cruising speed.',
        `Cross regional midpoint checkpoint (~${Math.round(distance_km / 2)} km remaining).`,
        'Transition onto the arterial link toward the destination zone.',
        `Arrive at ${dest}. Estimated journey: ${eta_minutes} min.`
    ];

    return { distance_km, eta_minutes, main_route, steps, alternative_route };
}

function computeWeather(src, dest, time) {
    const s = (src + ' ' + dest + ' ' + time).toLowerCase();
    let hazards = ['None identified'], risk_level = 'LOW';
    let weather_summary = 'General conditions are favourable for travel.';
    let recommendation  = 'Route is safe. Maintain standard vigilance.';

    if (s.includes('mountain') || s.includes('tahoe') || s.includes('snow') || s.includes('winter') || s.includes('ghat')) {
        hazards = ['Snow/Ice Accumulation','Low Visibility (Fog)','Freezing Temperatures'];
        risk_level = 'MEDIUM';
        weather_summary = 'High-altitude segments show significant cooling trends — potential black ice and fog patches.';
        recommendation  = 'Moderately risky. Carry emergency chains/gear, reduce speed in shaded segments.';
    } else if (s.includes('storm') || s.includes('rain') || s.includes('flood')) {
        hazards = ['Heavy Precipitation','Flash Flood Risk','High Velocity Winds'];
        risk_level = 'HIGH';
        weather_summary = 'Active weather system intersecting the planned route — severe hazard alert.';
        recommendation  = 'Route is dangerous. Strongly consider delaying travel until the front clears.';
    } else if (s.includes('heat') || s.includes('desert') || s.includes('summer')) {
        hazards = ['Extreme Thermal Stress','Vehicle Overheating Risk'];
        risk_level = 'MEDIUM';
        weather_summary = 'High ambient temperatures projected to stress vehicle cooling in load segments.';
        recommendation  = 'Safe with precautions. Monitor coolant levels; carry hydration.';
    }

    return { weather_summary, risk_level, hazards, recommendation };
}

function computeCost(distance_km) {
    const fuel_required_liters = parseFloat((distance_km / 15).toFixed(2));
    const fuel_cost_inr        = Math.ceil(fuel_required_liters * 100);
    const total_estimated_cost = Math.ceil(fuel_cost_inr * 1.15);
    return { fuel_required_liters, fuel_cost_inr, total_estimated_cost };
}

function buildFinalPlan(src, dest, time, route, weather, cost) {
    const isHigh   = weather.risk_level === 'HIGH';
    const isMedium = weather.risk_level === 'MEDIUM';
    const warnings = [], final_plan = [];

    final_plan.push(`Pre-departure: Verify tyres, fuel, coolant before leaving ${src}.`);
    final_plan.push(`Weather check at ${time} — Risk: ${weather.risk_level}. ${weather.weather_summary}`);

    if (isHigh) {
        warnings.push('⚠ HIGH weather risk — consider postponing travel.');
        warnings.push('⚠ Road closures or flash floods possible along route.');
        final_plan.push('RISK OVERRIDE: If travel is mandatory, use alt-route and notify emergency contacts.');
        final_plan.push(`Activate alt-route: "${route.alternative_route}".`);
    } else {
        final_plan.push(`Proceed on: "${route.main_route}".`);
        if (isMedium) warnings.push('ℹ MEDIUM risk: Exercise caution at hazard zones.');
    }

    route.steps.forEach((step, i) => final_plan.push(`Nav Step ${i + 1}: ${step}`));
    weather.hazards.forEach(h => { if (h !== 'None identified') warnings.push(`Hazard — ${h}`); });

    final_plan.push(`Budget ready: ₹${cost.total_estimated_cost.toLocaleString()} (fuel ₹${cost.fuel_cost_inr} + 15% buffer).`);
    final_plan.push(`ETA: ${route.eta_minutes} min (~${(route.eta_minutes/60).toFixed(1)} hrs). Monitor live traffic.`);
    final_plan.push(`On arrival at ${dest}: log trip, refuel if returning same day.`);

    const summary = isHigh
        ? `CRITICAL: HIGH risk on ${src}→${dest}. Travel not recommended without strict precautions. Budget: ₹${cost.total_estimated_cost.toLocaleString()}.`
        : isMedium
        ? `ADVISORY: Moderate conditions on ${src}→${dest} (${route.distance_km} km, ~${route.eta_minutes} min). Proceed with caution. Budget: ₹${cost.total_estimated_cost.toLocaleString()}.`
        : `CLEAR: Optimal conditions on ${src}→${dest} (${route.distance_km} km, ~${route.eta_minutes} min). Budget: ₹${cost.total_estimated_cost.toLocaleString()}.`;

    return { final_plan, warnings, summary };
}


// ════════════════════════════════════════════════════════════
//  INDIVIDUAL AGENT FORMS
// ════════════════════════════════════════════════════════════

document.getElementById('intelligenceForm').addEventListener('submit', async e => {
    e.preventDefault();
    showLoading(true);
    await pause(1300);
    const data = computeWeather(
        document.getElementById('source').value,
        document.getElementById('destination').value,
        document.getElementById('travelTime').value
    );
    hideAllResults();
    displayWeatherResults(data);
    showLoading(false);
});

document.getElementById('routeForm').addEventListener('submit', async e => {
    e.preventDefault();
    showLoading(true);
    await pause(1300);
    const data = computeRoute(
        document.getElementById('routeSource').value,
        document.getElementById('routeDestination').value
    );
    hideAllResults();
    displayRouteResults(data);
    showLoading(false);
});

document.getElementById('costForm').addEventListener('submit', async e => {
    e.preventDefault();
    showLoading(true);
    await pause(1200);
    const data = computeCost(parseFloat(document.getElementById('costDistance').value));
    hideAllResults();
    displayCostResults(data);
    showLoading(false);
});

document.getElementById('planForm').addEventListener('submit', async e => {
    e.preventDefault();
    showLoading(true);
    await pause(1600);
    const src  = document.getElementById('planSource').value;
    const dest = document.getElementById('planDest').value;
    const time = document.getElementById('planTime').value;
    const dist = parseFloat(document.getElementById('planDistance').value);
    const weather = computeWeather(src, dest, time);
    const route   = computeRoute(src, dest);
    const cost    = computeCost(dist || route.distance_km);
    if (dist) route.distance_km = dist;
    const planData = buildFinalPlan(src, dest, time, route, weather, cost);
    hideAllResults();
    displayStrategicResults(planData, weather, route, cost);
    showLoading(false);
});


// ════════════════════════════════════════════════════════════
//  AI ORCHESTRATOR — Full Pipeline Engine
// ════════════════════════════════════════════════════════════

const PIPELINE_DEFS = [
    { id: 'ps-route',   icon: '🗺', name: 'Route Agent',    desc: 'Calculating distance, ETA & navigation steps.' },
    { id: 'ps-weather', icon: '🌦', name: 'Weather Agent',  desc: 'Analysing atmospheric conditions & hazards.' },
    { id: 'ps-budget',  icon: '💰', name: 'Budget Agent',   desc: 'Estimating fuel consumption & total cost.' },
    { id: 'ps-summary', icon: '⚡', name: 'Summary Agent',  desc: 'Synthesising a risk-adjusted execution plan.' }
];

function buildPipelineUI() {
    const container = document.getElementById('orchPipeline');
    container.innerHTML = '';
    PIPELINE_DEFS.forEach(def => {
        const div = document.createElement('div');
        div.className = 'pipeline-step';
        div.id = def.id;
        div.innerHTML = `
            <div class="ps-icon">${def.icon}</div>
            <div class="ps-body">
                <div class="ps-name">${def.name}</div>
                <div class="ps-desc">${def.desc}</div>
            </div>
            <span class="ps-badge ps-badge-idle">Idle</span>`;
        container.appendChild(div);
    });
}

function setPipelineStep(id, state, detail = '') {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = `pipeline-step ps-${state}`;
    const badge = el.querySelector('.ps-badge');
    badge.className = `ps-badge ps-badge-${state}`;
    const labels = { idle:'Idle', running:'Running…', done:'✓ Done', error:'✗ Error', skipped:'⚠ Skipped' };
    badge.textContent = labels[state] || state;
    if (detail) el.querySelector('.ps-desc').textContent = detail;
}

/** Wraps an agent call with retry (up to maxRetries) and silent-fail resilience. */
async function runAgent(stepId, label, agentFn, maxRetries = 1) {
    setPipelineStep(stepId, 'running');
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            await pause(600 + Math.random() * 400);   // simulate async latency
            const result = agentFn();
            if (!result) throw new Error('Agent returned null');
            setPipelineStep(stepId, 'done', `${label} completed successfully.`);
            return { ok: true, data: result };
        } catch (err) {
            if (attempt < maxRetries) {
                setPipelineStep(stepId, 'running', `Retry ${attempt + 1}/${maxRetries}…`);
                await pause(400);
            } else {
                setPipelineStep(stepId, 'error', `${label} failed after ${maxRetries + 1} attempt(s).`);
                return { ok: false, data: null, error: err.message };
            }
        }
    }
}

document.getElementById('orchForm').addEventListener('submit', async e => {
    e.preventDefault();

    const src  = document.getElementById('orchSource').value.trim();
    const dest = document.getElementById('orchDest').value.trim();
    const time = document.getElementById('orchTime').value.trim();

    // Lock UI
    setButtonState(['orchBtn'], true);
    document.getElementById('orchBtn').style.opacity = '0.5';

    // Show results section & pipeline
    hideAllResults();
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('orchResults').style.display = 'block';
    document.getElementById('orchGrid').innerHTML = '';
    document.getElementById('jsonOutput').innerText = '';
    buildPipelineUI();
    scrollToResults();

    // ── Step 1 : Route Agent ──
    const routeRes = await runAgent('ps-route', 'Route Agent',
        () => computeRoute(src, dest));

    const route = routeRes.ok ? routeRes.data : {
        distance_km: 0, eta_minutes: 0,
        main_route: 'Unavailable', steps: ['Route data unavailable.'],
        alternative_route: 'N/A'
    };

    // ── Step 2 : Weather Agent (uses route info) ──
    const weatherRes = await runAgent('ps-weather', 'Weather Agent',
        () => computeWeather(src, dest, time));

    const weather = weatherRes.ok ? weatherRes.data : {
        weather_summary: 'Weather data unavailable.', risk_level: 'UNKNOWN',
        hazards: ['Data not retrieved'], recommendation: 'Proceed with caution.'
    };

    // ── Step 3 : Budget Agent (uses distance) ──
    const budgetRes = await runAgent('ps-budget', 'Budget Agent',
        () => computeCost(route.distance_km || 100));

    const budget = budgetRes.ok ? budgetRes.data : {
        fuel_required_liters: 0, fuel_cost_inr: 0, total_estimated_cost: 0
    };

    // ── Step 4 : Summary Agent (uses all outputs) ──
    const planRes = await runAgent('ps-summary', 'Summary Agent',
        () => buildFinalPlan(src, dest, time, route, weather, budget));

    const plan = planRes.ok ? planRes.data : {
        final_plan: ['Plan generation failed. Review individual agent outputs above.'],
        warnings: ['Summary Agent encountered an error — using fallback data.'],
        summary: 'Partial data available. Manual review recommended.'
    };

    // ── Render combined output cards ──
    renderOrchGrid(route, weather, budget, plan);

    // ── Strict JSON export ──
    const finalOutput = { route, weather, budget, final_plan: plan };
    document.getElementById('jsonOutput').innerText = JSON.stringify(finalOutput, null, 2);

    // Unlock UI
    setButtonState(['orchBtn'], false);
    document.getElementById('orchBtn').style.opacity = '1';
});

function renderOrchGrid(route, weather, budget, plan) {
    const grid = document.getElementById('orchGrid');
    grid.innerHTML = '';

    // Route card
    grid.appendChild(makeOaCard('oa-route', '🗺 Route Agent', [
        ['Distance',    `<strong>${route.distance_km} km</strong>`],
        ['ETA',         `<strong>${route.eta_minutes} min</strong>`],
        ['Main Route',  `<strong>${route.main_route}</strong>`],
        ['Alt Route',   route.alternative_route]
    ]));

    // Weather card
    grid.appendChild(makeOaCard('oa-weather', '🌦 Weather Agent', [
        ['Risk Level',  `<span class="risk-badge risk-${weather.risk_level}" style="margin:0;padding:0.2rem 0.6rem;">${weather.risk_level}</span>`],
        ['Summary',     weather.weather_summary],
        ['Hazards',     weather.hazards.join(' · ')],
        ['Advice',      weather.recommendation]
    ]));

    // Budget card
    grid.appendChild(makeOaCard('oa-budget', '💰 Budget Agent', [
        ['Fuel Required', `<strong>${budget.fuel_required_liters} L</strong>`],
        ['Fuel Cost',     `<strong>₹${budget.fuel_cost_inr.toLocaleString()}</strong>`],
        ['Total Budget',  `<strong style="color:#34d399">₹${budget.total_estimated_cost.toLocaleString()}</strong>`],
        ['Assumption',    '15 km/L · ₹100/L + 15% buffer']
    ]));

    // Strategic Plan card (full width)
    const planCard = document.createElement('div');
    planCard.className = 'orch-agent-card oa-plan';
    planCard.innerHTML = `<h4>⚡ Summary Agent — Execution Plan</h4>
        <div class="oa-row"><span>${plan.summary}</span></div>
        ${plan.warnings.length ? `<div style="margin:0.75rem 0 0.5rem;font-size:0.78rem;color:#f87171;text-transform:uppercase;letter-spacing:0.05em;">Warnings</div>
        ${plan.warnings.map(w => `<div class="oa-row" style="color:#f87171;">${w}</div>`).join('')}` : ''}
        <div class="oa-plan-steps">
        ${plan.final_plan.map((step, i) =>
            `<div class="oa-plan-step"><div class="oa-step-n">${i+1}</div><div>${step}</div></div>`
        ).join('')}
        </div>`;
    grid.appendChild(planCard);
}

function makeOaCard(cls, title, rows) {
    const card = document.createElement('div');
    card.className = `orch-agent-card ${cls}`;
    card.innerHTML = `<h4>${title}</h4>` +
        rows.map(([k, v]) => `<div class="oa-row"><span>${k}</span><span>${v}</span></div>`).join('');
    return card;
}


// ════════════════════════════════════════════════════════════
//  DISPLAY FUNCTIONS
// ════════════════════════════════════════════════════════════

function displayWeatherResults(data) {
    document.getElementById('weatherResults').style.display = 'grid';
    const badge = document.getElementById('riskBadge');
    badge.innerText = data.risk_level;
    badge.className = `risk-badge risk-${data.risk_level}`;
    document.getElementById('weatherSummary').innerText = data.weather_summary;
    document.getElementById('recommendation').innerText = data.recommendation;
    const list = document.getElementById('hazardList');
    list.innerHTML = '';
    data.hazards.forEach(h => {
        const li = document.createElement('li');
        li.className = 'hazard-item';
        li.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> ${h}`;
        list.appendChild(li);
    });
    document.getElementById('jsonOutput').innerText = JSON.stringify(data, null, 2);
    scrollToResults();
}

function displayRouteResults(data) {
    document.getElementById('routeResults').style.display = 'grid';
    document.getElementById('distKM').innerText    = data.distance_km;
    document.getElementById('etaMin').innerText    = `${data.eta_minutes} mins`;
    document.getElementById('mainRoute').innerText = data.main_route;
    document.getElementById('altRoute').innerText  = data.alternative_route;
    const steps = document.getElementById('routeSteps');
    steps.innerHTML = '';
    data.steps.forEach(s => {
        const div = document.createElement('div');
        div.className = 'step-item';
        div.innerText = s;
        steps.appendChild(div);
    });
    document.getElementById('jsonOutput').innerText = JSON.stringify(data, null, 2);
    scrollToResults();
}

function displayCostResults(data) {
    document.getElementById('costResults').style.display = 'grid';
    document.getElementById('fuelReq').innerText   = data.fuel_required_liters;
    document.getElementById('fuelCost').innerText  = `₹${data.fuel_cost_inr.toLocaleString()}`;
    document.getElementById('totalCost').innerText = `₹${data.total_estimated_cost.toLocaleString()}`;
    document.getElementById('jsonOutput').innerText = JSON.stringify(data, null, 2);
    scrollToResults();
}

function displayStrategicResults(plan, weather, route, cost) {
    document.getElementById('strategicResults').style.display = 'block';
    document.getElementById('planSummaryBar').innerText = plan.summary;

    const warningsBox = document.getElementById('warningsBox');
    const wList       = document.getElementById('warningsList');
    wList.innerHTML = '';
    if (plan.warnings.length) {
        warningsBox.style.display = 'block';
        plan.warnings.forEach(w => {
            const li = document.createElement('li');
            li.className = 'hazard-item';
            li.innerText = w;
            wList.appendChild(li);
        });
    } else {
        warningsBox.style.display = 'none';
    }

    const stepsList = document.getElementById('planStepsList');
    stepsList.innerHTML = '';
    plan.final_plan.forEach((step, i) => {
        const div = document.createElement('div');
        div.className = 'plan-step-item';
        div.style.animationDelay = `${i * 0.07}s`;
        div.innerHTML = `<div class="plan-step-num">${i + 1}</div><div class="plan-step-text">${step}</div>`;
        stepsList.appendChild(div);
    });

    const riskEl = document.getElementById('planRisk');
    riskEl.innerText = weather.risk_level;
    riskEl.className = `risk-badge risk-${weather.risk_level}`;
    document.getElementById('planDistDisplay').innerText  = `${route.distance_km} km`;
    document.getElementById('planEtaDisplay').innerText   = `${route.eta_minutes} min`;
    document.getElementById('planBudgetDisplay').innerText = `₹${cost.total_estimated_cost.toLocaleString()}`;

    document.getElementById('jsonOutput').innerText = JSON.stringify(
        { final_plan: plan.final_plan, warnings: plan.warnings, summary: plan.summary }, null, 2);
    scrollToResults();
}

// ════════════════════════════════════════════════════════════
//  CONFLICT RESOLUTION AGENT
//  Detects inconsistencies across agent outputs:
//   1. Weather risk vs route safety alignment
//   2. Unusually high cost relative to distance
//   3. ETA vs distance plausibility
//   4. Long route under HIGH risk with no alt-route flagged
// ════════════════════════════════════════════════════════════

document.getElementById('conflictForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('conflictBtn');
    btn.disabled = true; btn.style.opacity = '0.5';

    await pause(1100);

    const src    = document.getElementById('cxSource').value.trim();
    const dest   = document.getElementById('cxDest').value.trim();
    const risk   = document.getElementById('cxRisk').value;
    const dist   = parseFloat(document.getElementById('cxDist').value);
    const budget = parseFloat(document.getElementById('cxBudget').value);
    const route  = document.getElementById('cxRoute').value.trim() || 'Primary Highway';

    const result = runConflictAgent(src, dest, risk, dist, budget, route);
    displayConflictResults(result, src, dest, risk, dist, budget, route);

    btn.disabled = false; btn.style.opacity = '1';
});

/**
 * Core conflict detection engine.
 * Runs multiple independent checks and aggregates them into a verdict.
 */
function runConflictAgent(src, dest, risk, dist, budget, route) {
    const checks = [];
    const solutions = [];
    let hasConflict = false;

    // ── CHECK 1: Weather vs Route Safety ───────────────────────
    if (risk === 'HIGH') {
        const routeLower = route.toLowerCase();
        const isSafeRoute = routeLower.includes('expressway') || routeLower.includes('elevated') || routeLower.includes('alt');
        if (!isSafeRoute) {
            hasConflict = true;
            checks.push({
                check:    'Weather vs Route Alignment',
                severity: 'error',
                status:   'CONFLICT',
                detail:   `HIGH weather risk but route "${route}" does not appear to use a safer elevated or alternate corridor.`,
                fix:      'Switch to a safer elevated expressway or the designated alternative route to mitigate flood/storm exposure.'
            });
            solutions.push('Switch to the designated alternate route or an elevated highway corridor.');
            solutions.push('Delay departure until weather risk downgrades to MEDIUM or LOW.');
        } else {
            checks.push({
                check: 'Weather vs Route Alignment', severity: 'warn', status: 'ADVISORY',
                detail: 'HIGH risk detected. Route appears safer but conditions remain severe.',
                fix: 'Proceed only with full emergency kit and live contact notification.'
            });
            solutions.push('Notify emergency contacts before departing under HIGH risk conditions.');
        }
    } else if (risk === 'MEDIUM') {
        checks.push({
            check: 'Weather vs Route Alignment', severity: 'warn', status: 'ADVISORY',
            detail: 'MEDIUM risk — minor hazards exist along the route. No structural conflict detected.',
            fix: 'Reduce speed at hazard zones and carry emergency supplies.'
        });
    } else {
        checks.push({
            check: 'Weather vs Route Alignment', severity: 'ok', status: 'CLEAR',
            detail: 'LOW weather risk. Route and weather conditions are fully aligned.',
            fix: 'No action required.'
        });
    }

    // ── CHECK 2: Cost Reasonability ─────────────────────────────
    const expectedCost = Math.ceil((dist / 15) * 100 * 1.15);
    const costVariance = ((budget - expectedCost) / expectedCost) * 100;

    if (costVariance > 40) {
        hasConflict = true;
        checks.push({
            check: 'Cost Reasonability',
            severity: 'error', status: 'CONFLICT',
            detail: `Reported budget ₹${budget.toLocaleString()} is ${costVariance.toFixed(0)}% higher than expected ₹${expectedCost.toLocaleString()} for ${dist} km.`,
            fix: 'Verify fuel efficiency assumptions. Check for congestion-based detours or additional passenger load that may inflate costs.'
        });
        solutions.push(`Re-validate cost: expected ~₹${expectedCost.toLocaleString()} for ${dist} km at 15 km/L.`);
    } else if (costVariance < -30) {
        checks.push({
            check: 'Cost Reasonability',
            severity: 'warn', status: 'UNDER-ESTIMATED',
            detail: `Reported budget ₹${budget.toLocaleString()} is ${Math.abs(costVariance).toFixed(0)}% below expected ₹${expectedCost.toLocaleString()}. Possible undercount.`,
            fix: 'Add buffer for tolls, emergency fuel, and food/water stops.'
        });
        solutions.push('Increase budget estimate by 15-20% to cover unexpected expenses.');
    } else {
        checks.push({
            check: 'Cost Reasonability', severity: 'ok', status: 'VALIDATED',
            detail: `Budget ₹${budget.toLocaleString()} is within ±30% of expected ₹${expectedCost.toLocaleString()} for ${dist} km. Reasonable.`,
            fix: 'No adjustment required.'
        });
    }

    // ── CHECK 3: ETA / Distance Plausibility ───────────────────
    const minKmPerHr = 40, maxKmPerHr = 120;
    const etaHrsMin  = dist / maxKmPerHr;
    const etaHrsMax  = dist / minKmPerHr;
    // We use cost/budget as proxy since we don't have direct ETA input
    // Flag extremely long routes under HIGH risk
    if (dist > 500 && risk === 'HIGH') {
        hasConflict = true;
        checks.push({
            check: 'Distance vs Risk Index',
            severity: 'error', status: 'CONFLICT',
            detail: `Long-haul route (${dist} km) combined with HIGH weather risk creates an extreme exposure window (~${etaHrsMin.toFixed(1)}–${etaHrsMax.toFixed(1)} hrs on road).`,
            fix: 'Split the journey into segments with overnight stops, or postpone until risk subsides.'
        });
        solutions.push('Split long-haul into 2-day journey if weather risk remains HIGH.');
    } else if (dist > 300 && risk === 'MEDIUM') {
        checks.push({
            check: 'Distance vs Risk Index', severity: 'warn', status: 'ADVISORY',
            detail: `Medium-haul route (${dist} km) with MEDIUM risk. Estimated road time: ${etaHrsMin.toFixed(1)}–${etaHrsMax.toFixed(1)} hrs.`,
            fix: 'Plan rest stops every 2 hours. Start early to avoid night driving under risk conditions.'
        });
        solutions.push('Depart by 6 AM to complete the journey in daylight.');
    } else {
        checks.push({
            check: 'Distance vs Risk Index', severity: 'ok', status: 'CLEAR',
            detail: `Route distance (${dist} km) and risk level (${risk}) are proportionate. No exposure conflict.`,
            fix: 'No adjustment required.'
        });
    }

    // ── CHECK 4: Zero or invalid inputs ────────────────────────
    if (dist <= 0 || budget <= 0) {
        hasConflict = true;
        checks.push({
            check: 'Input Data Integrity',
            severity: 'error', status: 'INVALID',
            detail: 'Distance or budget value is zero / invalid. Agent outputs cannot be validated without valid data.',
            fix: 'Re-run Route Agent and Budget Agent with correct inputs before conflict analysis.'
        });
        solutions.push('Re-enter valid distance and budget values from Route and Budget Agents.');
    } else {
        checks.push({
            check: 'Input Data Integrity', severity: 'ok', status: 'VALID',
            detail: `All inputs appear well-formed: ${src} → ${dest}, ${dist} km, ₹${budget.toLocaleString()}.`,
            fix: 'No action required.'
        });
    }

    // ── Final verdict ───────────────────────────────────────────
    if (!hasConflict && solutions.length === 0) {
        solutions.push('All agent outputs are consistent. No adjustments needed.');
        solutions.push('Proceed with the generated strategic plan as-is.');
    }

    const conflictCount = checks.filter(c => c.severity === 'error').length;
    const warnCount     = checks.filter(c => c.severity === 'warn').length;

    const issue = hasConflict
        ? `${conflictCount} conflict(s) and ${warnCount} advisory(s) detected across agent outputs.`
        : `No critical conflicts found. ${warnCount} advisory note(s) require minor attention.`;

    const solution = solutions.join(' | ');

    return {
        conflict_detected: hasConflict,
        issue,
        solution,
        checks   // detailed breakdown
    };
}

/**
 * Renders the conflict analysis results — verdict bar + individual check cards.
 */
function displayConflictResults(result, src, dest, risk, dist, budget, route) {
    const container = document.getElementById('conflictInlineResults');
    container.style.display = 'block';

    // ── Verdict bar ────────────────────────────────────────────
    const verdictEl = document.getElementById('conflictVerdictBar');
    verdictEl.className = `conflict-verdict ${result.conflict_detected ? 'cv-conflict' : 'cv-none'}`;
    verdictEl.innerHTML = `
        <div class="cv-icon">${result.conflict_detected ? '🔴' : '✅'}</div>
        <div class="cv-body">
            <h4>${result.conflict_detected ? 'Conflicts Detected' : 'No Critical Conflicts'}</h4>
            <p>${result.issue}</p>
        </div>`;

    // ── Check cards ────────────────────────────────────────────
    const grid = document.getElementById('conflictCardsGrid');
    grid.innerHTML = '';

    result.checks.forEach((chk, i) => {
        const card = document.createElement('div');
        card.className = `conflict-card cc-${chk.severity}`;
        card.style.animationDelay = `${i * 0.1}s`;
        card.innerHTML = `
            <span class="cx-severity cx-sev-${chk.severity}">${chk.status}</span>
            <h5>${chk.check}</h5>
            <p>${chk.detail}</p>
            <p style="margin-top:0.5rem;color:#a5b4fc;font-size:0.82rem;">💡 ${chk.fix}</p>`;
        grid.appendChild(card);
    });

    // ── Solution box ───────────────────────────────────────────
    const solBox = document.createElement('div');
    solBox.className = 'cx-solution-box';
    const solutionSteps = result.solution.split(' | ');
    solBox.innerHTML = `<h5>⚡ Recommended Adjustments</h5>` +
        solutionSteps.map((s, i) =>
            `<div class="cx-solution-step"><div class="cxs-num">${i + 1}</div><div>${s}</div></div>`
        ).join('');
    grid.appendChild(solBox);

    // ── JSON export ────────────────────────────────────────────
    const jsonOut = {
        conflict_detected: result.conflict_detected,
        issue:    result.issue,
        solution: result.solution
    };
    document.getElementById('conflictJsonOut').innerText = JSON.stringify(jsonOut, null, 2);

    // Scroll into view
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
