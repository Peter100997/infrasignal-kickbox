import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

*{margin:0;padding:0;box-sizing:border-box}
:root{
  --ink:#0d1b2e;
  --ink2:#1e3a5f;
  --ink3:#4a6080;
  --ink4:#8faabf;
  --paper:#ffffff;
  --paper2:#f0f5fb;
  --paper3:#dbeafe;
  --gold:#1d4ed8;
  --gold2:#3b82f6;
  --gold-light:#eff6ff;
  --gold-mid:rgba(29,78,216,0.12);
  --red:#dc2626;
  --red-light:#fef2f2;
  --blue:#1e3a8a;
  --blue-light:#dbeafe;
  --green:#065f46;
  --green-light:#d1fae5;
  --border:#cbd5e1;
  --border2:#e2e8f0;
  --serif:'Playfair Display',Georgia,serif;
  --mono:'DM Mono',monospace;
  --sans:'DM Sans',sans-serif;
  --shadow:0 2px 24px rgba(13,27,46,0.07);
  --shadow2:0 8px 48px rgba(13,27,46,0.10);
}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.6}

/* Layout */
.wrap{max-width:1320px;margin:0 auto;padding:0 32px 80px}
.header{border-bottom:1px solid var(--border);padding:28px 0 24px;margin-bottom:48px;position:relative}
.header::before{content:'';position:absolute;bottom:-1px;left:0;width:120px;height:2px;background:var(--gold)}
.eyebrow{font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--ink4);margin-bottom:8px}
.h1{font-family:var(--serif);font-size:clamp(32px,4vw,52px);font-weight:700;color:var(--ink);line-height:1.1;margin-bottom:12px}
.h1 em{font-style:italic;color:var(--gold)}
.subtitle{font-size:16px;color:var(--ink3);max-width:560px;line-height:1.6;margin-bottom:20px}
.header-meta{display:flex;gap:24px;margin-top:20px;flex-wrap:wrap}
.meta-item{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:10px;color:var(--ink3)}
.meta-dot{width:6px;height:6px;border-radius:50%;background:var(--gold)}

/* Kickbox Stage Nav */
.stage-nav{display:flex;gap:0;margin-bottom:48px;border:1px solid var(--border);border-radius:6px;overflow:hidden}
.stage-btn{flex:1;padding:16px 12px;text-align:center;cursor:pointer;transition:all .2s;border:none;background:white;border-right:1px solid var(--border)}
.stage-btn:last-child{border-right:none}
.stage-btn:hover{background:var(--paper2)}
.stage-btn.active{color:white}
.stage-btn.active.red{background:var(--red)}
.stage-btn.active.blue{background:var(--blue)}
.stage-btn.active.gold{background:var(--gold)}
.stage-btn.active.black{background:var(--ink)}
.stage-num{font-family:var(--mono);font-size:9px;letter-spacing:.15em;margin-bottom:4px}
.stage-name{font-family:var(--serif);font-size:14px;font-weight:600}
.stage-sub{font-size:10px;color:inherit;opacity:.7;margin-top:2px}

/* Section */
.section{margin-bottom:48px}
.section-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px}
.section-title{font-family:var(--serif);font-size:22px;font-weight:600;color:var(--ink)}
.section-tag{font-family:var(--mono);font-size:9px;padding:4px 10px;border-radius:3px;text-transform:uppercase;letter-spacing:.1em}
.tag-red{background:var(--red-light);color:var(--red);border:1px solid rgba(220,38,38,.2)}
.tag-blue{background:var(--blue-light);color:var(--blue);border:1px solid rgba(30,58,138,.2)}
.tag-gold{background:var(--gold-light);color:var(--gold);border:1px solid rgba(29,78,216,.2)}
.tag-green{background:var(--green-light);color:var(--green);border:1px solid rgba(6,95,70,.2)}
.tag-ink{background:var(--paper2);color:var(--ink2);border:1px solid var(--border)}
.tag-tg{background:var(--gold-light);color:var(--gold);border:1px solid rgba(29,78,216,.2)}
.tag-ta{background:var(--blue-light);color:var(--blue);border:1px solid rgba(30,58,138,.2)}
.tag-tc{background:var(--green-light);color:var(--green);border:1px solid rgba(6,95,70,.2)}

/* Grid layouts */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.g4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:16px}
.gside{display:grid;grid-template-columns:2fr 1fr;gap:24px}
.gside-r{display:grid;grid-template-columns:1fr 2fr;gap:24px}

/* Cards */
.card{background:white;border:1px solid var(--border);border-radius:6px;padding:24px}
.card-sm{background:white;border:1px solid var(--border);border-radius:6px;padding:16px}
.card-gold{background:var(--gold-light);border:1px solid rgba(29,78,216,.2);border-radius:6px;padding:24px}
.card-red{background:var(--red-light);border:1px solid rgba(220,38,38,.2);border-radius:6px;padding:24px}
.card-blue{background:var(--blue-light);border:1px solid rgba(30,58,138,.15);border-radius:6px;padding:24px}
.card-ink{background:var(--ink);border-radius:6px;padding:24px;color:white}
.card-accent{border-left:3px solid var(--gold)}

.card-label{font-family:var(--mono);font-size:9px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:var(--ink4);margin-bottom:8px}
.card-title{font-family:var(--serif);font-size:18px;font-weight:600;color:var(--ink);margin-bottom:8px}
.card-body{font-size:13px;color:var(--ink3);line-height:1.7}
.card-num{font-family:var(--serif);font-size:36px;font-weight:700;color:var(--gold)}
.card-num-label{font-family:var(--mono);font-size:10px;color:var(--ink4);margin-top:2px}

/* Assumption rows */
.assumption{display:flex;gap:16px;padding:14px 0;border-bottom:1px solid var(--border2)}
.assumption:last-child{border-bottom:none}
.a-status{width:8px;height:8px;border-radius:50%;margin-top:6px;flex-shrink:0}
.a-status.critical{background:var(--red)}
.a-status.important{background:var(--gold)}
.a-status.nice{background:#10b981}
.a-text{flex:1}
.a-label{font-size:13px;font-weight:500;color:var(--ink);margin-bottom:2px}
.a-desc{font-size:12px;color:var(--ink3)}
.a-badge{font-family:var(--mono);font-size:9px;padding:2px 8px;border-radius:2px}

/* Pricing */
.pricing-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;border:1px solid var(--border);border-radius:6px;overflow:hidden}
.price-tier{padding:28px 24px;border-right:1px solid var(--border);background:white}
.price-tier:last-child{border-right:none}
.price-tier.featured{background:var(--ink);color:white}
.price-tier.featured .tier-name{color:var(--gold2)}
.price-tier.featured .price-num{color:white}
.price-tier.featured .price-period{color:rgba(255,255,255,.5)}
.price-tier.featured .feature-item{color:rgba(255,255,255,.8)}
.price-tier.featured .card-body{color:rgba(255,255,255,.65)}
.tier-badge{font-family:var(--mono);font-size:9px;letter-spacing:.15em;text-transform:uppercase;margin-bottom:8px;display:inline-block}
.tier-badge.feat{color:var(--gold2)}
.tier-name{font-family:var(--serif);font-size:22px;font-weight:600;margin-bottom:8px}
.price-num{font-family:var(--serif);font-size:38px;font-weight:700;color:var(--ink)}
.price-currency{font-size:18px;vertical-align:top;margin-top:8px;display:inline-block}
.price-period{font-family:var(--mono);font-size:10px;color:var(--ink4);margin-bottom:16px}
.feature-list{list-style:none;margin-bottom:20px}
.feature-item{font-size:12px;color:var(--ink2);padding:5px 0;border-bottom:1px solid rgba(0,0,0,.05);display:flex;gap:8px}
.feature-item:last-child{border-bottom:none}
.fi-icon{color:var(--gold);font-size:11px;margin-top:2px;flex-shrink:0}
.btn{padding:10px 20px;border-radius:4px;font-family:var(--mono);font-size:10px;font-weight:500;cursor:pointer;border:none;letter-spacing:.05em;text-transform:uppercase}
.btn-gold{background:var(--gold);color:white}
.btn-gold:hover{background:var(--gold2)}
.btn-outline{background:transparent;border:1px solid var(--border);color:var(--ink)}
.btn-outline:hover{border-color:var(--gold);color:var(--gold)}
.btn-white{background:white;color:var(--ink);border:1px solid var(--border)}
.btn-white:hover{border-color:var(--gold2);color:var(--gold2)}

/* MVT table */
.mvt-row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:0;border-bottom:1px solid var(--border2)}
.mvt-row.header{font-family:var(--mono);font-size:9px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--ink4)}
.mvt-cell{font-size:12px;color:var(--ink3);padding:8px 16px 8px 0}
.mvt-cell.main{font-size:13px;color:var(--ink);font-weight:500}

.success-bar{height:4px;border-radius:2px;background:var(--border2);margin-top:6px}
.success-fill{height:100%;border-radius:2px;background:var(--gold)}

/* Revenue model */
.rev-row{display:grid;grid-template-columns:160px 80px 80px 80px 1fr;gap:0;padding:8px 0;border-bottom:1px solid var(--border2)}
.rev-row.hd{font-family:var(--mono);font-size:9px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--ink4)}
.rev-cell{font-size:12px;color:var(--ink3);font-family:var(--mono);padding-right:8px}
.rev-cell.name{font-family:var(--sans);color:var(--ink);font-weight:500;font-size:12px}
.rev-cell.total{color:var(--green);font-weight:600}

/* Competitor map */
.comp-item{padding:14px 16px;background:white;border:1px solid var(--border);border-radius:6px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}
.comp-name{font-weight:500;font-size:13px;color:var(--ink)}
.comp-desc{font-size:11px;color:var(--ink4);margin-top:2px}
.comp-gap{font-family:var(--mono);font-size:10px;color:var(--gold)}

/* Roadmap */
.roadmap{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:0;position:relative;margin-bottom:32px}
.roadmap::before{content:'';position:absolute;top:18px;left:10%;right:10%;height:2px;background:var(--border2)}
.rm-phase{text-align:center;padding:0 8px;position:relative;z-index:1}
.rm-dot{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:13px;font-weight:600}
.rm-dot.done{background:var(--green);color:white}
.rm-dot.now{background:var(--gold);color:white;box-shadow:0 0 0 4px var(--gold-mid)}
.rm-dot.soon{background:white;border:2px solid var(--gold);color:var(--gold)}
.rm-dot.later{background:white;border:2px solid var(--border);color:var(--ink4)}
.rm-label{font-family:var(--serif);font-size:14px;font-weight:600;margin-bottom:4px}
.rm-sub{font-size:11px;color:var(--ink4);line-height:1.4;white-space:pre-line}
.rm-badge{font-family:var(--mono);font-size:9px;margin-top:6px;display:inline-block;padding:2px 8px;border-radius:2px}

/* Hypothesis cards */
.hyp{padding:18px;border-left:3px solid transparent;background:white;border:1px solid var(--border);border-radius:6px;margin-bottom:8px}
.hyp.critical{border-left-color:var(--red)}
.hyp.important{border-left-color:var(--gold)}
.hyp.nice{border-left-color:#10b981}
.hyp-label{font-family:var(--mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
.hyp.critical .hyp-label{color:var(--red)}
.hyp.important .hyp-label{color:var(--gold)}
.hyp.nice .hyp-label{color:#10b981}
.hyp-text{font-size:13px;color:var(--ink);font-weight:500;margin-bottom:4px}
.hyp-test{font-size:12px;color:var(--ink3)}

/* Misc */
.divider{border:none;border-top:1px solid var(--border2);margin:32px 0}
.quote{font-family:var(--serif);font-size:18px;font-style:italic;color:var(--ink2);line-height:1.6;padding:20px 24px;border-left:3px solid var(--gold);background:var(--paper2);border-radius:0 6px 6px 0}
.footnote{font-family:var(--mono);font-size:10px;color:var(--ink4);margin-top:8px}
ul.clean{list-style:none}
ul.clean li{padding:4px 0;font-size:13px;color:var(--ink3);display:flex;gap:8px}
ul.clean li::before{content:'â';color:var(--gold);flex-shrink:0}
.pill{display:inline-block;font-family:var(--mono);font-size:9px;padding:3px 9px;border-radius:3px;letter-spacing:.05em}
.pill-gold{background:var(--gold-light);color:var(--gold);border:1px solid rgba(29,78,216,.2)}
.pill-blue{background:var(--blue-light);color:var(--blue);border:1px solid rgba(30,58,138,.15)}
.pill-red{background:var(--red-light);color:var(--red)}
.pill-green{background:var(--green-light);color:var(--green)}
strong{font-weight:600;color:var(--ink)}
.mono-sm{font-family:var(--mono);font-size:11px;color:var(--ink4)}
.text-gold{color:var(--gold)}
.text-red{color:var(--red)}
.fade-in{animation:fadeIn .4s ease both}
@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:960px){.g3,.g4,.pricing-grid,.roadmap{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.g2,.g3,.g4,.gside,.gside-r,.pricing-grid,.roadmap{grid-template-columns:1fr}}
`;

const STAGES = [
  { id: "red",   num: "01", name: "Red Box",  sub: "Explore",  cls: "red" },
  { id: "blue",  num: "02", name: "Blue Box", sub: "Validate", cls: "blue" },
  { id: "gold",  num: "03", name: "Gold Box", sub: "Scale",    cls: "gold" },
  { id: "black", num: "04", name: "Scale",    sub: "Launch",   cls: "black" },
];

// ââ RED BOX ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function RedBox() {
  return (
    <div className="fade-in">

      {/* Problem Statement */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Das Problem</div>
          <span className="section-tag tag-red">Problem / Solution Fit</span>
        </div>
        <div className="gside">
          <div>
            <div className="quote">
              "Infrastructure GPs und ihre LPs agieren mit erheblichen Informationsasymmetrien:
              relevante Marktdaten zu Fundraisings, IRR-Benchmarks und Wettbewerbern
              sind fragmentiert Ã¼ber drei kostenpflichtige Plattformen verteilt."
            </div>
            <div className="g2" style={{marginTop:20}}>
              {[
                {n:"3â5 h",l:"manueller Rechercheaufwand pro GP-Update"},
                {n:"CHF 80k+",l:"Jahreskosten fÃ¼r Preqin + Infralogic + II"},
                {n:"~65",l:"Manager im relevanten Infra-GP-Universe"},
                {n:"Ã 13 Wo.",l:"bis ein vollstÃ¤ndiger Competitor Universe steht"},
              ].map(s => (
                <div key={s.n} className="card-sm card-accent">
                  <div className="card-num" style={{fontSize:28}}>{s.n}</div>
                  <div className="card-num-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="card" style={{height:"100%"}}>
              <div className="card-label">Pain Severity Matrix</div>
              {[
                {who:"GP Research Teams",pain:"Kein Echtzeit-Benchmarking gegen Peer-GPs",freq:"tÃ¤glich",sev:90,p:"Zeitverlust bei manueller Recherche kostet Wettbewerbsvorteile"},
                {who:"LP Allokatoren",pain:"Keine strukturierten GP-Vergleiche bei Allocation Reviews",freq:"monatlich",sev:80,p:"Fehlende Vergleichsbasis fÃ¸hrt zu suboptimalen Entscheidungen"},
                {who:"Placement Agents",pain:"Manuelle Fundraising-Markt-Ãbersicht",freq:"wÃ¶chentlich",sev:70,p:"UnvollstÃ¤ndige MarktÃ¼bersicht schwÃ¤cht Pitch-Position"},
                {who:"Fund-of-Funds",pain:"Fragmentierte Deal-Flow-Daten",freq:"quartalsweise",sev:75,p:"Fehlende Daten verhindern proaktives Portfolio-Management"},
                {who:"Advisors / Law Firms",pain:"Keine GP-Netzwerk-Analyse (Co-Investment)",freq:"projektweise",sev:60,p:"Manuelle Netzwerkanalyse ist zeitaufwÃ¤ndig und fehleranfÃ¤llig"},
              ].map(r => (
                <div key={r.who} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:500,color:"var(--ink)"}}>{r.who}</span>
                    <span className="mono-sm">{r.freq} Â· {r.sev}%</span>
                  </div>
                  <div className="success-bar"><div className="success-fill" style={{width:r.sev+"%"}}/></div>
                  <div style={{fontSize:11,color:"var(--ink4)",marginTop:3}}>{r.p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Kundensegmente</div>
          <span className="section-tag tag-blue">ICP Definition</span>
        </div>
        <div className="g3">
          {[
            {
              tier:"Primary ICP",cls:"tag-gold",
              title:"Mid-Market Infrastructure GPs",
              desc:"EUR 2â15 Mrd. AuM. Haben kein dediziertes Competitive Intelligence Team. FÃ¼hren Benchmarks manuell oder gar nicht durch.",
              wtp:"CHF 1.500â4.000 / Monat",
              size:"~180 GPs weltweit",
              examples:"Vauban, DIF, Meridiam, Cube, Infracapital",
              urgency:"Hoch â aktiv im Fundraising",
            },
            {
              tier:"Secondary ICP",cls:"tag-blue",
              title:"Infrastructure LP Allocators",
              desc:"Pensionskassen, Versicherungen, FoFs. Suchen strukturierte GP-Benchmarking-Reports fÃ¼r interne Investment Committees.",
              wtp:"CHF 800â2.000 / Monat",
              size:"~400 relevante LPs (CH/DE/AT/NL)",
              examples:"Swiss PKs, ABP, PGGM, Nordea AM",
              urgency:"Mittel â jÃ¤hrliche Allocation Reviews",
            },
            {
              tier:"Tertiary ICP",cls:"tag-ink",
              title:"Placement Agents & Advisors",
              desc:"Brauchen Fundraising-MarktÃ¼berblick fÃ¼r Mandate-Pitches. Nutzen Daten projektbasiert.",
              wtp:"CHF 500â1.200 / Monat",
              size:"~60 aktive Placement Agents",
              examples:"Threadmark, MVision, Campbell Lutyens",
              urgency:"NiedrigâMittel",
            },
          ].map(s => (
            <div key={s.tier} className="card">
              <span className={`section-tag ${s.cls}`} style={{marginBottom:12,display:"inline-block"}}>{s.tier}</span>
              <div className="card-title">{s.title}</div>
              <div className="card-body">{s.desc}</div>
              <hr style={{border:"none",borderTop:"1px solid var(--border2)",margin:"16px 0"}}/>
              <div style={{fontSize:11,color:"var(--ink3)"}}>
                <div style={{marginBottom:4}}><strong>WTP:</strong> {s.wtp}</div>
                <div style={{marginBottom:4}}><strong>MarktgrÃ¶sse:</strong> {s.size}</div>
                <div style={{marginBottom:4}}><strong>Beispiele:</strong> {s.examples}</div>
                <div><strong>Kaufdringlichkeit:</strong> <span style={{color:"var(--ink)"}}>{s.urgency}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Value Proposition */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Value Proposition</div>
          <span className="section-tag tag-gold">Kernversprechen</span>
        </div>
        <div className="gside-r">
          <div className="card card-ink">
            <div className="card-label" style={{color:"var(--gold2)"}}>Produkt Â· InfraSignal</div>
            <div style={{fontFamily:"var(--serif)",fontSize:26,fontWeight:700,color:"white",lineHeight:1.2,marginBottom:16}}>
              Der Bloomberg fÃ¼r<br/><em style={{color:"var(--gold2)"}}>Infrastructure Private Markets</em>
            </div>
            <ul className="clean" style={{marginBottom:20}}>
              {[
                "Live-Benchmarking gegen ~65 Peer-GPs",
                "StÃ¼ndlich aktualisierter Intelligence Feed",
                "IRR-Dispersion-Analyse (Target vs. Achieved)",
                "LP-AktivitÃ¤ts-Tracker (Commitments, Re-Ups)",
                "Deal-Flow-Monitoring nach Sektor & Region",
                "Export-ready Excel / PDF fÃ¼r Boards & LPs",
              ].map(i=><li key={i} style={{color:"rgba(255,255,255,.8)"}}>{i}</li>)}
            </ul>
            <div style={{fontFamily:"var(--mono)",fontSize:10,color:"var(--gold2)"}}>
              GEBAUT AUF: Anthropic Claude Â· Railway PostgreSQL Â· Preqin / Infralogic / II
            </div>
          </div>
          <div>
            <div className="card" style={{marginBottom:16}}>
              <div className="card-label">Unique Selling Points</div>
              {[
                {icon:"â",title:"AI-first",desc:"TÃ¤gliche Web-Intelligence ohne manuellen Research-Aufwand"},
                {icon:"â",title:"Private Markets Native",desc:"Nicht Preqin light â echte GP-Competitive-Intelligence"},
                {icon:"â",title:"Cross-Source Reconciliation",desc:"Preqin + Infralogic + II in einer strukturierten DB"},
                {icon:"â",title:"Swiss / European Focus",desc:"DACH-LPs, Anlagereglement-konformes Reporting"},
              ].map(u=>(
                <div key={u.title} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid var(--border2)"}}>
                  <span style={{fontSize:18,color:"var(--gold)",flexShrink:0,marginTop:2}}>{u.icon}</span>
                  <div><div style={{fontSize:13,fontWeight:500,color:"var(--ink)"}}>{u.title}</div><div style={{fontSize:12,color:"var(--ink3)"}}>{u.desc}</div></div>
                </div>
              ))}
            </div>
            <div className="card-gold">
              <div className="card-label" style={{color:"var(--gold)"}}>Moat</div>
              <div className="card-body">
                Der Wettbewerbsvorteil entsteht durch <strong>Datennetzwerkeffekt</strong>: Jeder neue Kunde
                verbessert die strukturierte DB. Nach 12 Monaten ist ein strukturierter,
                bereinigter Datensatz vorhanden, den kein Einzelkunde replizieren kann.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ââ BLUE BOX ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function BlueBox() {
  return (
    <div className="fade-in">

      {/* Key Assumptions */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Kritische Annahmen</div>
          <span className="section-tag tag-red">Riskiest Assumptions First</span>
        </div>
        <div className="g2">
          <div>
            <div style={{fontFamily:"var(--mono)",fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:"var(--ink4)",marginBottom:12}}>
              <span style={{color:"var(--red)"}}>â Kritisch</span>
              {"  "}<span style={{color:"var(--gold)"}}>â Wichtig</span>
              {"  "}<span style={{color:"#27ae60"}}>â Nice-to-have</span>
            </div>
            {[
              {type:"critical",label:"WTP-Annahme",text:"GPs zahlen CHF 1.500+/Monat fÃ¼r strukturierte Intelligence",test:"â Test: 3 von 10 GPs signalisieren Zahlungsbereitschaft nach Demo"},
              {type:"critical",label:"Schmerz-Validierung",text:"Research-Teams verwenden >3h/Woche fÃ¼r manuelle Recherche",test:"â Test: 80% der befragten GPs bestÃ¤tigen >3h/Woche"},
              {type:"important",label:"DatenqualitÃ¤t",text:"AI-generierte Intelligence ist prÃ¤zise genug fÃ¼r professionelle Entscheidungen",test:"â Test: NPS >40 nach 30-Tage-Pilot"},
              {type:"important",label:"LP-Segment",text:"LPs zahlen fÃ¼r GP-Benchmarking-Reports",test:"â Test: 2 von 5 LPs committieren zu Pilot"},
              {type:"nice",label:"Placement Agent Fit",text:"Placement Agents nutzen InfraSignal fÃ¼r Fundraising-Pitches",test:"â Test: 1 von 3 PA nutzt Tool aktiv nach 60 Tagen"},
            ].map(a=>(
              <div key={a.label} className={`hyp ${a.type}`}>
                <div className="hyp-label">{a.label}</div>
                <div className="hyp-text">{a.text}</div>
                <div className="hyp-test">{a.test}</div>
              </div>
            ))}
          </div>

          {/* MVT Table */}
          <div>
            <div className="card">
              <div className="card-label">Minimum Viable Tests (MVT)</div>
              <div className="mvt-row header">
                <div>Test</div><div>Aufwand</div><div>Zeitraum</div><div>Erfolgs-Kriterium</div>
              </div>
              {[
                {test:"Founder-Led Sales Calls (n=10 GPs)",eff:"8h",time:"KW 14â15",crit:"â¥3 GPs: WTP"},
                {test:"Landing Page + Waitlist",eff:"4h",time:"KW 13",crit:"â¥30 Sign-ups"},
                {test:"Paid Pilot: 1 GP, 30 Tage gratis",eff:"20h",time:"KW 16â19",crit:"NPS â¥40"},
                {test:"Demo-Deck an 5 LPs",eff:"6h",time:"KW 15â16",crit:"â¥2 Follow-ups"},
                {test:"LinkedIn Outreach: 20 GP Leads",eff:"3h",time:"KW 13â14",crit:"â¥5 Antworten"},
                {test:"Preistest: Anonym Survey (n=50)",eff:"2h",time:"KW 14",crit:"Median WTP â¥CHF 800"},
              ].map(m=>(
                <div key={m.test} className="mvt-row">
                  <div className="mvt-cell main">{m.test}</div>
                  <div className="mvt-cell"><span className="pill pill-gold">{m.eff}</span></div>
                  <div className="mvt-cell mono-sm">{m.time}</div>
                  <div className="mvt-cell" style={{fontSize:11,color:"var(--ink3)"}}>{m.crit}</div>
                </div>
              ))}
            </div>

            <div className="card-blue" style={{marginTop:16}}>
              <div className="card-label" style={{color:"var(--blue)"}}>Kill Criteria</div>
              <div className="card-body" style={{color:"var(--blue)"}}>
                Projekt wird gestoppt wenn: &lt;3 von 10 GPs signalisieren Zahlungsbereitschaft
                bei CHF 800+/Monat <em>oder</em> kein einziger Pilot nach 60 Tagen
                (dann: Pivot auf White-Label B2B fÃ¼r einzelne Plattform).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Discovery */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Customer Discovery Script</div>
          <span className="section-tag tag-blue">Interview Guide</span>
        </div>
        <div className="g2">
          {[
            {
              phase:"Einstieg (5 min)",
              qs:["Wie viel Zeit verbringt Ihr Team pro Woche mit Competitive Intelligence zu anderen Infra-GPs?","Was ist Ihre aktuelle Go-to-Quelle fÃ¼r GP-Benchmarking?"],
            },
            {
              phase:"Problem-Tiefe (15 min)",
              qs:["Zeig mir wie du heute einen neuen Wettbewerber-GP recherchierst â walk me through the process.","Was fehlt dir bei Preqin / Infralogic am meisten?"],
            },
            {
              phase:"Solution-Fit (10 min)",
              qs:["Wenn es ein Tool gÃ¤be das diese Daten automatisch aggregiert â wie viel wÃ¤re dir das wert?","Wber in deiner Organisation wÃ¼rde das tÃ¤glich nutzen?"],
            },
            {
              phase:"Commitment-Test (5 min)",
              qs:["Darf ich dir in 2 Wochen ein konkretes Demo zeigen?","Wer ausser dir mÃ¼sste die Kaufentscheidung treffen?"],
            },
          ].map(p=>(
            <div key={p.phase} className="card-sm">
              <div className="card-label">{p.phase}</div>
              <ul className="clean">
                {p.qs.map(q=><li key={q}>{q}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ââ GOLD BOX ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function GoldBox() {
  return (
    <div className="fade-in">

      {/* Pricing */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Preismodell</div>
          <span className="section-tag tag-gold">Revenue Architecture</span>
        </div>
        <div className="pricing-grid">
          {[
            {
              tier:"Starter", badge:"LP / Advisor", featured:false,
              price:"490", per:"/Monat (CHF)",
              desc:"FÃ¼r LP-Allocators und Advisor-Teams mit begrenztem Infra-Universe.",
              features:[
                "Intelligence Feed (25 GPs nach Wahl)",
                "WÃ¶chentlicher Briefing-Report PDF",
                "Fundraising & Closing Alerts",
                "GP Profil-Daten (Preqin-Level)",
                "1 User",
                "E-Mail Support",
              ],
              btn:"btn-outline",
            },
            {
              tier:"Professional", badge:"â Empfohlen", featured:true,
              price:"1.900", per:"/Monat (CHF)",
              desc:"FÃ¼r GP Research-Teams und aktive Infrastruktur-Investoren.",
              features:[
                "VollstÃ¤ndiges GP Universe (65 Manager)",
                "IRR-Dispersion-Benchmarking (Infralogic)",
                "LP-AktivitÃ¤ts-Tracker + Commitments",
                "Deal-Flow-Monitoring (Asset-Level)",
                "Excel-Export / API-Zugang",
                "StÃ¼ndlicher AI-Intelligence-Agent",
                "Cross-Source-Abgleich (Preqin + IL + II)",
                "3 User Â· Dedicated Onboarding",
              ],
              btn:"btn-white",
            },
            {
              tier:"Enterprise", badge:"GP / Large LP", featured:false,
              price:"4.900", per:"/Monat (CHF)",
              desc:"FÃ¼r institutionelle GPs mit komplexem Reporting- und White-Label-Bedarf.",
              features:[
                "Alles aus Professional",
                "Custom GP Universe (unbegrenzt)",
                "White-Label Board-Reporting",
                "Dedizierter Research-Analyst (4h/Mo)",
                "Benchmarking-Metodologie nach EDHEC SIPA",
                "CRM-Integration(Salesforce / HubSpot)",
                "SLA 99.9% Â· Priority Support",
                "Unbegrenzte User",
              ],
              btn:"btn-outline",
            },
          ].map(t=>(
            <div key={t.tier} className={`price-tier${t.featured?" featured":""}`}>
              <div className={`tier-badge${t.featured?" feat":""}`}>{t.badge}</div>
              <div className="tier-name">{t.tier}</div>
              <div style={{marginBottom:4}}>
                <span className="price-currency">CHF</span>
                <span className="price-num">{t.price}</span>
              </div>
              <div className="price-period">{t.per}</div>
              <div className="card-body" style={{marginBottom:16,fontSize:12}}>{t.desc}</div>
              <ul className="feature-list">
                {t.features.map(f=>(
                  <li key={f} className="feature-item">
                    <span className="fi-icon">â</span>{f}
                  </li>
                ))}
              </ul>
              <button className={`btn ${t.btn}`} style={{width:"100%"}}>Pilot anfragen</button>
            </div>
          ))}
        </div>
        <div className="footnote" style={{marginTop:12}}>
          * JÃ¤hrliche Zahlung: 2 Monate gratis. Pilot: 30 Tage kostenlos, kein Credit Card erforderlich.
        </div>
      </div>

      {/* Revenue Model */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Revenue Projektion (36 Monate)</div>
          <span className="section-tag tag-green">Unit Economics</span>
        </div>
        <div className="gside">
          <div className="card">
            <div className="card-label">MRR-Aufbau Szenario (Base Case)</div>
            <div className="rev-row hd">
              <div className="rev-cell">Tier</div>
              <div className="rev-cell">Mo. 6</div>
              <div className="rev-cell">Mo. 12</div>
              <div className="rev-cell">Mo. 24</div>
              <div className="rev-cell">Mo. 36</div>
            </div>
            {[
              {n:"Starter (CHF 490)",a:"2",b:"8",c:"25",d:"60"},
              {n:"Professional (CHF 1.900)",a:"1",b:"4",c:"15",d:"40"},
              {n:"Enterprise (CHF 4.900)",a:"0",b:"1",c:"3",d:"8"},
              {n:"Data Services (CHF 150/h)",a:"2k",b:"5k",c:"12k",d:"20k"},
            ].map(r=>(
              <div key={r.n} className="rev-row">
                <div className="rev-cell name">{r.n}</div>
                <div className="rev-cell">{r.a}</div>
                <div className="rev-cell">{r.b}</div>
                <div className="rev-cell">{r.c}</div>
                <div className="rev-cell">{r.d}</div>
              </div>
            ))}
            <div className="rev-row" style={{borderTop:"2px solid var(--border)"}}>
              <div className="rev-cell name" style={{fontWeight:600}}>MRR Total</div>
              <div className="rev-cell total">~3k</div>
              <div className="rev-cell total">~21k</div>
              <div className="rev-cell total">~90k</div>
              <div className="rev-cell total">~230k</div>
            </div>
            <div className="footnote" style={{marginTop:8}}>ARR bei Mo. 36: ~CHF 2.76 Mio.</div>
          </div>

          <div>
            <div className="g2" style={{marginBottom:16}}>
              {[
                {n:"CHF 490",l:"Entry Price / Monat",sub:"LP-Tier"},
                {n:"12Ã",l:"LTV / CAC Ratio (Mo. 24)",sub:"Best Case"},
                {n:"8%",l:"Angenommener Annual Churn",sub:"SaaS B2B"},
                {n:"CHF 2.2k",l:"ACV Blended (Mo. 12)",sub:"Alle Tiers"},
              ].map(s=>(
                <div key={s.n} className="card-sm card-accent">
                  <div className="card-num" style={{fontSize:24}}>{s.n}</div>
                  <div style={{fontSize:11,color:"var(--ink4)",marginTop:2}}>{s.l}</div>
                  <div style={{fontFamily:"var(--mono)",fontSize:9,color:"var(--gold)",marginTop:4}}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="card-gold">
              <div className="card-label" style={{color:"var(--gold)"}}>Exit / Partnering-Optionen</div>
              <ul className="clean">
                <li>Akquisitions-Target fÃ¼r Preqin / MSCI / S&P Global</li>
                <li>White-Label-Lizenz an Placement Agents</li>
                <li>Data-Partnership mit Infrastructure Investor (Incisive Media)</li>
                <li>Spin-off als unabhÃ¤ngige Benchmark-Agentur (wie EDHEC SIPA)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Landscape */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Wettbewerbslandschaft</div>
          <span className="section-tag tag-ink">Positioning</span>
        </div>
        <div className="g2">
          <div>
            {[
              {name:"Preqin",desc:"Breite Datenbank, aber keine AI-Intelligence, kein Live-Feed",gap:"Kein Echtzeit-Benchmarking"},
              {name:"Infralogic",desc:"Tiefste IRR-Daten, aber reines Datenbank-Tool ohne Intelligence-Layer",gap:"Kein AI-Agent"},
              {name:"Infrastructure Investor",desc:"Journalismus + Rankings, kein strukturierter Daten-Export",gap:"Kein GP-Vergleich"},
              {name:"EDHEC SIPA",desc:"PME-Methodologie, akademisch, kein Live-Intelligence",gap:"Quartalsweise, kein Live"},
              {name:"Bloomberg BVPM",desc:"Breiter Coverage, sehr teuer (USD 25k+), nicht Infra-spezifisch",gap:"USD 25k+ p.a."},
            ].map(c=>(
              <div key={c.name} className="comp-item">
                <div>
                  <div className="comp-name">{c.name}</div>
                  <div className="comp-desc">{c.desc}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                  <div className="comp-gap" style={{fontSize:10,maxWidth:160}}>{c.gap}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card card-ink">
            <div className="card-label" style={{color:"var(--gold2)"}}>InfraSignal Positioning</div>
            <div style={{fontFamily:"var(--serif)",fontSize:20,fontWeight:600,color:"white",marginBottom:12,lineHeight:1.3}}>
              "The only platform that combines live AI intelligence with structured private markets data."
            </div>
            <div style={{marginBottom:16}}>
              {[
                ["â","AI-powered Live Feed"],
                ["â","Cross-Source Reconciliation"],
                ["â","IRR Dispersion Benchmarking"],
                ["â","LP Tracker (Commitments)"],
                ["â","DACH / European LP Focus"],
                ["â","CHF 490â4.900 / Monat (10Ã gÃ¼nstiger als Bloomberg)"],
              ].map(([icon,text])=>(
                <div key={text} style={{display:"flex",gap:10,padding:"5px 0",fontSize:13,color:"rgba(255,255,255,.85)"}}>
                  <span style={{color:"var(--gold2)"}}>{icon}</span>{text}
                </div>
              ))}
            </div>
            <div style={{fontFamily:"var(--mono)",fontSize:10,color:"rgba(255,255,255,.4)"}}>
              DOMAIN: infrasignal.com / .ch
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ââ SCALE BOX ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function ScaleBox() {
  return (
    <div className="fade-in">

      {/* Roadmap */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Produkt-Roadmap</div>
          <span className="section-tag tag-ink">12-Monats-Plan</span>
        </div>
        <div className="roadmap" style={{marginBottom:32}}>
          {[
            {num:"Q2 '26",label:"MVP",sub:"Railway DB live\nAI-Agent stÃ¼ndlich\nInfralogic-Integration",status:"now"},
            {num:"Q3 '26",label:"Pilot",sub:"5 bezahlte Pilots\nCustomer Discovery\nLanding Page live",status:"soon"},
            {num:"Q4 '26",label:"Launch",sub:"Product-Market Fit\nPricing confirmed\n10 paying customers",status:"later"},
            {num:"Q1 '27",label:"Scale",sub:"Sales-Motion\n20+ Kunden\nPartnership Placement Agent",status:"later"},
          ].map(p=>(
            <div key={p.num} className="rm-phase">
              <div className={`rm-dot ${p.status}`}>{p.num.split(" ")[0]}</div>
              <div className="rm-label">{p.label}</div>
              <div className="rm-sub" style={{whiteSpace:"pre-line"}}>{p.sub}</div>
              <div className={`rm-badge pill ${p.status==="now"?"pill-gold":p.status==="done"?"pill-green":"pill"}`}>
                {p.status==="done"?"â Done":p.status==="now"?"â Active":p.status==="soon"?"Soon":"Later"}
              </div>
            </div>
          ))}
        </div>

        <div className="g3">
          {[
            {
              phase:"Phase 1 â Build (KW 12â24, jetzt)",
              items:[
                "Railway DB + AI-Agent deployed â",
                "GP Universe ~65 Manager strukturiert",
                "Preqin / Infralogic / II Daten manuell erfasst",
                "Dashboard intern genutzt & validiert",
                "Erste externe Demo-Calls vorbereiten",
              ],col:"tg"
            },
            {
              phase:"Phase 2 â Validate (Q3 2026)",
              items:[
                "10 Discovery-Calls mit GP Research-Leads",
                "Landing Page: infrasignal.ch + Waitlist",
                "3 kostenlose 30-Tage-Pilots launchen",
                "Preistest Survey (n=50 Infra-Professionals)",
                "LinkedIn Outreach Kampagne (Infra GPs)",
              ],col:"ta"
            },
            {
              phase:"Phase 3 â Scale (Q4 2026+)",
              items:[
                "Erstes bezahltes SaaS-Abo abschliessen",
                "Daten-Coverage auf 120+ GPs erweitern",
                "API-Zugang fÃ¼r Enterprise-Tier",
                "Partnership mit Placement Agent",
                "Fundraising oder Bootstrapped entscheiden",
              ],col:"tc"
            },
          ].map(p=>(
            <div key={p.phase} className="card">
              <span className={`section-tag tag-${p.col.slice(1)}`} style={{marginBottom:12,display:"inline-block"}}>{p.phase.split("â")[0].trim()}</span>
              <div style={{fontFamily:"var(--serif)",fontSize:14,fontWeight:600,color:"var(--ink)",marginBottom:12}}>{p.phase}</div>
              <ul className="clean">
                {p.items.map(i=><li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* GTM */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Go-to-Market</div>
          <span className="section-tag tag-gold">Akquisitions-KanÃ¤le</span>
        </div>
        <div className="g2">
          <div>
            {[
              {ch:"Founder-Led Outreach",conv:"15%",desc:"Founder nutzt persÃ¶nliches Netzwerk und direkte GP-Kontakte fÃ¼r Demos und Pilots"},
              {ch:"LinkedIn Content",conv:"5%",desc:"W¶chentliche Posts zu Infra-GP-Benchmarks und IRR-Trends â Thought Leadership"},
              {ch:"Infrastructure Investor Newsletter",conv:"3%",desc:"Gesponserte Case-Studies und Benchmark-Reports in II-Newsletter"},
              {ch:"Partnership: Placement Agents",conv:"8%",desc:"Co-Marketing mit Threadmark, MVision, Campbell Lutyens"},
            ].map(c=>(
              <div key={c.ch} className="card-sm" style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:500,color:"var(--ink)"}}>{c.ch}</div>
                  <div style={{display:"flex",gap:6}}>
                    <span className="pill pill-gold">{c.conv}</span>
                    <span className="mono-sm" style={{alignSelf:"center"}}>Conv.</span>
                  </div>
                </div>
                <div style={{fontSize:12,color:"var(--ink3)"}}>{c.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="card" style={{marginBottom:16}}>
              <div className="card-label">NÃ¤chste 3 Aktionen (sofort)</div>
              {[
                {n:"1",action:"infrasignal.ch Domain kaufen + Railway-Dashboard Ã¶ffentlich schalten",time:"Diese Woche"},
                {n:"2",action:"Liste: 15 GP Research Leads auf LinkedIn identifizieren + Outreach-Template",time:"KW 13"},
                {n:"3",action:"Outreach-Template schreiben: 'Ich arbeite an einem Bloomberg fÃ¼r Infra-GPs'",time:"KW 13"},
              ].map(a=>(
                <div key={a.n} style={{display:"flex",gap:14,padding:"12px 0",borderBottom:"1px solid var(--border2)"}}>
                  <div style={{width:24,height:24,background:"var(--gold)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:11,fontWeight:600,flexShrink:0}}>{a.n}</div>
                  <div>
                    <div style={{fontSize:13,color:"var(--ink)",marginBottom:3}}>{a.action}</div>
                    <div className="mono-sm">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-gold">
              <div className="card-label" style={{color:"var(--gold)"}}>Kickbox-Regel</div>
              <div style={{fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--ink2)",marginBottom:8}}>
                "Spend $10 before you spend $1.000. Talk to 10 customers before you build."
              </div>
              <div style={{fontFamily:"var(--mono)",fontSize:10,color:"var(--gold)"}}>XEROX KICKBOX METHODOLOGY</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Erfolgsmetriken</div>
          <span className="section-tag tag-blue">OKRs Â· KPIs</span>
        </div>
        <div className="g4">
          {[
            {phase:"Validate (60d)",metrics:[{k:"Discovery Calls",v:"â¥10"},{k:"WTP confirmed",v:"â¥3 GPs"},{k:"Survey responses",v:"â¥50"},{k:"Waitlist Sign-ups",v:"â¥30"}]},
            {phase:"Pilot (90d)",metrics:[{k:"Paid Pilots",v:"3"},{k:"NPS Score",v:"â¥40"},{k:"Data accuracy",v:"â¥90%"},{k:"Renewal intent",v:"â¥2"}]},
            {phase:"PMF (180d)",metrics:[{k:"Paying Customers",v:"â¥8"},{k:"Churn",v:"<10%"},{k:"MRR",v:"CHF 12k"},{k:"NPS",v:"â¥50"}]},
            {phase:"Scale (12Mo)",metrics:[{k:"Customers",v:"30+"},{k:"ARR",v:"CHF 230k"},{k:"NPS",v:"â¥55"},{k:"Employees",v:"3"}]},
          ].map(g=>(
            <div key={g.phase} className="card-sm">
              <div className="card-label">{g.phase}</div>
              {g.metrics.map(m=>(
                <div key={m.k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid var(--border2)"}}>
                  <span style={{fontSize:12,color:"var(--ink3)"}}>{m.k}</span>
                  <span style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--gold)",fontWeight:600}}>{m.v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ââ MAIN ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
export default function App() {
  const [stage, setStage] = useState("red");
  return (
    <>
      <style>{CSS}</style>
      <div className="wrap">
        <div className="header">
          <div className="eyebrow">InfraSignal Â· Kickbox Innovation Canvas</div>
          <h1 className="h1">InfraSignal<br/><em>Infrastructure Intelligence as a Service</em></h1>
          <div className="subtitle">
            Transformation der GP-Competitor-Universe-Datenbank in ein monetarisierbares SaaS-Produkt
            fÃ¼r Infrastructure Private Markets â validiert nach der Xerox Kickbox Methodik
          </div>
          <div className="header-meta">
            {[
              ["Produkt","InfraSignal / infrasignal.ch"],
              ["Methode","Xerox Kickbox (4-Box)"],
              ["TAM","~2.400 Infra GPs + LPs weltweit"],
              ["Entry Price","CHF 490 / Monat"],
              ["MVP Status","Railway DB live â"],
            ].map(([k,v])=>(
              <div key={k} className="meta-item"><div className="meta-dot"/><span className="mono-sm">{k}: {v}</span></div>
            ))}
          </div>
        </div>

        <div className="stage-nav">
          {STAGES.map(s=>(
            <div
              key={s.id}
              className={`stage-btn${stage===s.id?" active "+s.cls:""}`}
              onClick={()=>setStage(s.id)}
            >
              <div className="stage-num">{s.num}</div>
              <div className="stage-name">{s.name}</div>
              <div className="stage-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {stage==="red"   && <RedBox/>}
        {stage==="blue"  && <BlueBox/>}
        {stage==="gold"  && <GoldBox/>}
        {stage==="black" && <ScaleBox/>}
      </div>
    </>
  );
}
