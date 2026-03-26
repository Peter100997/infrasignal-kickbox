import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

*{margin:0;padding:0;box-sizing:border-box}
:root{
  --ink:#0f1923;
  --ink2:#2c3e50;
  --ink3:#64748b;
  --ink4:#94a3b8;
  --paper:#faf8f4;
  --paper2:#f1ede4;
  --paper3:#e8e0d0;
  --gold:#b8860b;
  --gold2:#d4a017;
  --gold-light:#fdf3d8;
  --gold-mid:rgba(184,134,11,0.15);
  --red:#c0392b;
  --red-light:#fdf2f0;
  --blue:#1a3a5c;
  --blue-light:#eef4fb;
  --green:#1a5c3a;
  --green-light:#edf7f1;
  --border:#d6cdb8;
  --border2:#e8e0d0;
  --serif:'Playfair Display',Georgia,serif;
  --mono:'DM Mono',monospace;
  --sans:'DM Sans',sans-serif;
  --shadow:0 2px 24px rgba(15,25,35,0.08);
  --shadow2:0 8px 48px rgba(15,25,35,0.12);
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
.stage-nav{display:flex;gap:0;margin-bottom:48px;border:1px solid var(--border);border-radius:4px;overflow:hidden}
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
.section-tag{font-family:var(--mono);font-size:9px;padding:4px 10px;border-radius:2px;text-transform:uppercase;letter-spacing:.1em}
.tag-red{background:var(--red-light);color:var(--red);border:1px solid rgba(192,57,43,.2)}
.tag-blue{background:var(--blue-light);color:var(--blue);border:1px solid rgba(26,58,92,.2)}
.tag-gold{background:var(--gold-light);color:var(--gold);border:1px solid rgba(184,134,11,.2)}
.tag-green{background:var(--green-light);color:var(--green);border:1px solid rgba(26,92,58,.2)}
.tag-ink{background:var(--paper2);color:var(--ink2);border:1px solid var(--border)}

/* Grid layouts */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.g4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:16px}
.gside{display:grid;grid-template-columns:2fr 1fr;gap:24px}
.gside-r{display:grid;grid-template-columns:1fr 2fr;gap:24px}

/* Cards */
.card{background:white;border:1px solid var(--border);border-radius:4px;padding:24px}
.card-sm{background:white;border:1px solid var(--border);border-radius:4px;padding:16px}
.card-gold{background:var(--gold-light);border:1px solid rgba(184,134,11,.3);border-radius:4px;padding:24px}
.card-red{background:var(--red-light);border:1px solid rgba(192,57,43,.2);border-radius:4px;padding:24px}
.card-blue{background:var(--blue-light);border:1px solid rgba(26,58,92,.15);border-radius:4px;padding:24px}
.card-ink{background:var(--ink);border-radius:4px;padding:24px;color:white}
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
.a-status.nice{background:#27ae60}
.a-text{flex:1}
.a-label{font-size:13px;font-weight:500;color:var(--ink);margin-bottom:2px}
.a-desc{font-size:12px;color:var(--ink3)}
.a-badge{font-family:var(--mono);font-size:9px;padding:2px 8px;border-radius:2px}

/* Pricing */
.pricing-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;border:1px solid var(--border);border-radius:4px;overflow:hidden}
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
.btn{padding:10px 20px;border-radius:3px;font-family:var(--mono);font-size:10px;font-weight:500;cursor:pointer;border:none;letter-spacing:.05em;text-transform:uppercase}
.btn-gold{background:var(--gold);color:white}
.btn-gold:hover{background:var(--gold2)}
.btn-outline{background:transparent;border:1px solid var(--border);color:var(--ink)}
.btn-outline:hover{border-color:var(--gold);color:var(--gold)}
.btn-white{background:white;color:var(--ink);border:1px solid var(--paper3)}
.btn-white:hover{border-color:var(--gold);color:var(--gold)}

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
.comp-item{padding:14px 16px;background:white;border:1px solid var(--border);border-radius:4px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}
.comp-name{font-weight:500;font-size:13px;color:var(--ink)}
.comp-desc{font-size:11px;color:var(--ink4);margin-top:2px}
.comp-gap{font-family:var(--mono);font-size:10px;color:var(--gold)}

/* Roadmap */
.roadmap{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:0;position:relative;margin-bottom:32px}
.roadmap::before{content:'';position:absolute;top:18px;left:10%;right:10%;height:2px;background:var(--border2)}
.rm-phase{text-align:center;padding:0 8px;position:relative;z-index:1}
.rm-dot{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:13px;font-weight:600}
.rm-dot.done{background:var(--green)ØÛÛÜÚ]_BKYÝÝÞØXÚÙÜÝ[\KYÛÛ
NØÛÛÜÚ]NØÞ\ÚYÝÎ
\KYÛÛ[ZY
_BKYÝÛÛÛØXÚÙÜÝ[Ú]NØÜ\ÛÛY\KYÛÛ
NØÛÛÜ\KYÛÛ
_BKYÝ]\ØXÚÙÜÝ[Ú]NØÜ\ÛÛY\KXÜ\NØÛÛÜ\KZ[Í
_BK[X[ÙÛY[Z[N\K\Ù\YNÙÛ\Ú^NMÙÛ]ÙZYÚÛX\Ú[XÝÛNBK\ÝXÙÛ\Ú^NL\ØÛÛÜ\KZ[Í
NÛ[KZZYÚKÝÚ]K\ÜXÙNK[[_BKXYÙ^ÙÛY[Z[N\K[[ÛÊNÙÛ\Ú^N\ÛX\Ú[]ÜÙ\Ü^N[[KXØÚÎÜY[ÎØÜ\\Y]\ÎBÊ\Ý\Ú\ÈØ\È
Â\ÜY[ÎNØÜ\[YÜÛÛY[Ü\[ØXÚÙÜÝ[Ú]NØÜ\\ÛÛY\KXÜ\NØÜ\\Y]\ÎÛX\Ú[XÝÛNB\Ü]XØ[ØÜ\[YXÛÛÜ\K\Y
_B\[\Ü[ØÜ\[YXÛÛÜ\KYÛÛ
_B\XÙ^ØÜ\[YXÛÛÜÌØYMB\[X[ÙÛY[Z[N\K[[ÛÊNÙÛ\Ú^N\Û]\\ÜXÚ[ÎY[NÝ^][ÙÜN\\Ø\ÙNÛX\Ú[XÝÛNB\Ü]XØ[\[X[ØÛÛÜ\K\Y
_B\[\Ü[\[X[ØÛÛÜ\KYÛÛ
_B\XÙH\[X[ØÛÛÜÌØYMB\]^ÙÛ\Ú^NLÜØÛÛÜ\KZ[ÊNÙÛ]ÙZYÚLÛX\Ú[XÝÛNB\]\ÝÙÛ\Ú^NLØÛÛÜ\KZ[ÌÊ_BÊZ\ØÈ
Â]Y\ØÜ\ÛNØÜ\]Ü\ÛÛY\KXÜ\NÛX\Ú[ÌB][Ý^ÙÛY[Z[N\K\Ù\YNÙÛ\Ú^NNÙÛ\Ý[N][XÎØÛÛÜ\KZ[ÌNÛ[KZZYÚKÜY[ÎØÜ\[YÜÛÛY\KYÛÛ
NØXÚÙÜÝ[\K\\\NØÜ\\Y]\Î

BÛÝÝ^ÙÛY[Z[N\K[[ÛÊNÙÛ\Ú^NLØÛÛÜ\KZ[Í
NÛX\Ú[]ÜB[ÛX[Û\Ý\Ý[NÛ_B[ÛX[^ÜY[ÎÙÛ\Ú^NLÜØÛÛÜ\KZ[ÌÊNÙ\Ü^N^ÙØ\B[ÛX[NYÜ^ØÛÛ[ø $ÉÎØÛÛÜ\KYÛÛ
NÙ^\Ú[ÎB[Ù\Ü^N[[KXØÚÎÙÛY[Z[N\K[[ÛÊNÙÛ\Ú^N\ÜY[ÎÜ\ØÜ\\Y]\ÎÛ]\\ÜXÚ[Î
Y[_B[YÛÛØXÚÙÜÝ[\KYÛÛ[YÚ
NØÛÛÜ\KYÛÛ
NØÜ\\ÛÛYØJN
LÍLK_B[XY^ØXÚÙÜÝ[\KXYK[YÚ
NØÛÛÜ\KXYJNØÜ\\ÛÛYØJ
NLMJ_B[\YØXÚÙÜÝ[\K\Y[YÚ
NØÛÛÜ\K\Y
_B[YÜY[ØXÚÙÜÝ[\KYÜY[[YÚ
NØÛÛÜ\KYÜY[_BÝÛÞÙÛ]ÙZYÚØÛÛÜ\KZ[Ê_B[ÛË\Û^ÙÛY[Z[N\K[[ÛÊNÙÛ\Ú^NL\ØÛÛÜ\KZ[Í
_B^YÛÛØÛÛÜ\KYÛÛ
_B^\YØÛÛÜ\K\Y
_BYKZ[Ø[[X][ÛYR[ÈX\ÙHÝBÙ^Y[Y\ÈYR[ÙÛ^ÛÜXÚ]NÝ[ÙÜN[Û]VJL
_]ÞÛÜXÚ]NNÝ[ÙÜN[Û]VJ
__BYYXJX^]ÚYM
^ËÌËÍXÚ[ËYÜYØYX\ÙÜY][\]KXÛÛ[[ÎYY_BYYXJX^]ÚY
^ËÌÌËÍÜÚYKÜÚYK\XÚ[ËYÜYØYX\ÙÜY][\]KXÛÛ[[ÎY_BÂÛÛÝÕQÑTÈHÂÈYY[NH[YNYÞÝX^ÜHÛÎYKÈYYH[N[YNYHÞÝX[Y]HÛÎYHKÈYÛÛ[NÈ[YNÛÛÞÝXØØ[HÛÎÛÛKÈYXÚÈ[N
[YNØØ[HÝX][ÚÛÎXÚÈKNÂËÈ8¥ 8¥ QÖ8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ [Ý[ÛYÞ

HÂ]\
]Û\ÜÓ[YOHYKZ[ËÊØ[HÝ][Y[
ßB]Û\ÜÓ[YOHÙXÝ[Û]Û\ÜÓ[YOHÙXÝ[ÛZXY\]Û\ÜÓ[YOHÙXÝ[Û]]H\ÈØ[OÙ]Ü[Û\ÜÓ[YOHÙXÝ[Û]YÈYË\YØ[HÈÛÛ][Û]ÜÜ[Ù]]Û\ÜÓ[YOHÜÚYH]]Û\ÜÓ[YOH][ÝH[\ÝXÝ\HÔÈ[ZHÈYÚY\[Z]\XXÚ[[ÜX][ÛØ\Þ[[Y]Y[[][HX\Ý][H[Z\Ú[ÜËTP[ÚX\ÜÈ[Ù]]Ù\\Ú[YÛY[Y\0ï\ZHÛÜÝ[XÚYÙH]ÜY[\Z[Ù]]Û\ÜÓ[YOHÌÝ[O^ÞÛX\Ú[Ü_OÖÂÛø $ÍHX[Y[\XÚ\ÚX]YØ[ÈÔU\]HKÛÒÊÈZ\ÚÛÜÝ[°ï\Z[
È[[ÙÚXÈ
ÈRHKÛHX[YÙ\[H[][[[KQÔU[]\ÙHKÛ°æLÈÛË\ÈZ[ÛÝ0éYÙ\ÛÛ\]]Ü[]\ÙHÝZKKX\
ÈO
]Ù^O^ÜËHÛ\ÜÓ[YOHØ\\ÛHØ\XXØÙ[]Û\ÜÓ[YOHØ\[[HÝ[O^ÞÙÛÚ^N_OÜËOÙ]]Û\ÜÓ[YOHØ\[[K[X[ÜËOÙ]Ù]
J_BÙ]Ù]]]Û\ÜÓ[YOHØ\Ý[O^ÞÚZYÚL	H_O]Û\ÜÓ[YOHØ\[X[Z[Ù]\]HX]^Ù]ÖÂÝÚÎÔ\ÙX\ÚX[\ÈZ[ÙZ[XÚZ]P[ÚX\Ú[ÈÙYÙ[Y\QÔÈ\N0éÛXÚÙ]LYZ]\\ÝZHX[Y[\XÚ\ÚHÛÜÝ]Ù]]Ù\ÝÜZ[HKÝÚÎ[ÚØ]Ü[Z[ÙZ[HÝZÝ\Y\[ÔU\ÛZXÚHZH[ØØ][Û]Y]ÜÈ\N[Û]XÚÙ]Z[H\ÛZXÚØ\Ú\È°ïHÝXÜ[X[[[ØÚZY[Ù[KÝÚÎXÙ[Y[YÙ[ÈZ[X[Y[H[Z\Ú[ËSX\Ýpç\ÚXÚ\NðíÚ[XÚÙ]Ì[ÛÝ0éYÙHX\Ý0ï\ÚXÚØÚðéÚ]ÚTÜÚ][ÛKÝÚÎ[[ÙQ[ÈZ[YÛY[Y\HX[QÝËQ][\N]X\[ÝÙZ\ÙHÙ]ÍKZ[H][\[\ØZÝ]\ÈÜÛ[ËSX[YÙ[Y[KÝÚÎY\ÛÜÈÈ]È\\ÈZ[ÙZ[HÔS]Ù\ËP[[\ÙH
ÛËR[\ÝY[
H\NÚZÝÙZ\ÙHÙ]X[Y[H]Ù\Ø[[\ÙH\ÝZ]]YðéYÈ[Z\[°éYÈKKX\
O
]Ù^O^ÜÚßHÝ[O^ÞÛX\Ú[ÝÛNL_O]Ý[O^ÞÙ\Ü^N^\ÝYPÛÛ[ÜXÙKX]ÙY[X\Ú[ÝÛNß_OÜ[Ý[O^ÞÙÛÚ^NLÛÙZYÚLÛÛÜ\KZ[ÊH_OÜÚßOÜÜ[Ü[Û\ÜÓ[YOH[ÛË\ÛHÜ\_H0­ÈÜÙ]IOÜÜ[Ù]]Û\ÜÓ[YOHÝXØÙ\ÜËX\]Û\ÜÓ[YOHÝXØÙ\ÜËY[Ý[O^ÞÝÚYÙ]ÈH_KÏÙ]]Ý[O^ÞÙÛÚ^NLKÛÛÜ\KZ[Í
HX\Ú[Üß_OÜOÙ]Ù]
J_BÙ]Ù]Ù]Ù]ËÊÝ\ÝÛY\ÙYÛY[È
ßB]Û\ÜÓ[YOHÙXÝ[Û]Û\ÜÓ[YOHÙXÝ[ÛZXY\]Û\ÜÓ[YOHÙXÝ[Û]]HÝ[[ÙYÛY[OÙ]Ü[Û\ÜÓ[YOHÙXÝ[Û]YÈYËXYHPÔY[][ÛÜÜ[Ù]]Û\ÜÓ[YOHÌÈÖÂÂY\[X\HPÔÛÎYËYÛÛ]NZYSX\Ù][\ÝXÝ\HÔÈ\ØÎUT¸ $ÌMH\]SKX[ÙZ[Y^Y\\ÈÛÛ\]]]H[[YÙ[ÙHX[K°ï[[ÚX\ÜÈX[Y[Ù\Ø\XÚ\ÚÝÒKL8 $ÍÈ[Û]Ú^NNÔÈÙ[ÙZ]^[\\Î]X[QY\YX[KÝXK[XØ\][\Ù[ÞNØÚ8 $ÈZÝ][H[Z\Ú[ÈKÂY\ÙXÛÛ\HPÔÛÎYËXYH]N[\ÝXÝ\H[ØØ]ÜÈ\ØÎ[Ú[ÛÚØ\ÜÙ[\ÚXÚ\[Ù[ÑËÝXÚ[ÝZÝ\Y\HÔP[ÚX\Ú[ËT\ÜÈ°ï[\H[\ÝY[ÛÛ[Z]Y\ËÝÒ8 $ÌÈ[Û]Ú^N[][HÈ
ÒÑKÐUÓ
H^[\\ÎÝÚ\ÜÈÜËPÑÓKÜXHSH\Ù[ÞNZ][8 $È°éXÚH[ØØ][Û]Y]ÜÈKÂY\\X\HPÔÛÎYËZ[È]NXÙ[Y[YÙ[È	Y\ÛÜÈ\ØÎ]XÚ[[Z\Ú[ËSX\Ý0ï\XÚÈ°ïX[]KT]Ú\Ë][][ÚZÝ\ÚY\ÝÒ
L8 $ÌKÈ[Û]Ú^NZÝ]HXÙ[Y[YÙ[È^[\\ÎXYX\ËU\Ú[ÛØ[\[]Y[È\Ù[ÞNYYYø $ÓZ][KKX\
ÈO
]Ù^O^ÜËY\HÛ\ÜÓ[YOHØ\Ü[Û\ÜÓ[YO^ØÙXÝ[Û]YÈ	ÜËÛßXHÝ[O^ÞÛX\Ú[ÝÛNL\Ü^N[[KXØÚÈ_OÜËY\OÜÜ[]Û\ÜÓ[YOHØ\]]HÜË]_OÙ]]Û\ÜÓ[YOHØ\XÙHÜË\ØßOÙ]Ý[O^ÞØÜ\ÛHÜ\Ü\ÛÛY\KXÜ\HX\Ú[M_KÏ]Ý[O^ÞÙÛÚ^NLKÛÛÜ\KZ[ÌÊH_O]Ý[O^ÞÛX\Ú[ÝÛN_OÝÛÏÕÜÝÛÏÜËÝOÙ]]Ý[O^ÞÛX\Ú[ÝÛN_OÝÛÏX\ÝÜ°íÜÙNÜÝÛÏÜËÚ^_OÙ]]Ý[O^ÞÛX\Ú[ÝÛN_OÝÛÏZ\ÜY[NÜÝÛÏÜË^[\\ßOÙ]]ÝÛÏØ]Y[ÛXÚÙZ]ÜÝÛÏÜ[Ý[O^ÞØÛÛÜ\KZ[ÊH_OÜË\Ù[Þ_OÜÜ[Ù]Ù]Ù]
J_BÙ]Ù]ËÊ[YHÜÜÚ][Û
ßB]Û\ÜÓ[YOHÙXÝ[Û]Û\ÜÓ[YOHÙXÝ[ÛZXY\]Û\ÜÓ[YOHÙXÝ[Û]]H[YHÜÜÚ][ÛÙ]Ü[Û\ÜÓ[YOHÙXÝ[Û]YÈYËYÛÛÙ\\ÜXÚ[ÜÜ[Ù]]Û\ÜÓ[YOHÜÚYK\]Û\ÜÓ[YOHØ\Ø\Z[È]Û\ÜÓ[YOHØ\[X[Ý[O^ÞØÛÛÜ\KYÛÛH_OÙZÝ0­È[TÚYÛ[Ù]]Ý[O^ÞÙÛ[Z[N\K\Ù\YHÛÚ^NÛÙZYÚÌÛÛÜÚ]H[RZYÚKX\Ú[ÝÛNM_O\ÛÛX\È°ïÏ[HÝ[O^ÞØÛÛÜ\KYÛÛH_O[\ÝXÝ\H]]HX\Ù]ÏÙ[OÙ][Û\ÜÓ[YOHÛX[Ý[O^ÞÛX\Ú[ÝÛN_OÖÂ]KP[ÚX\Ú[ÈÙYÙ[HY\QÔÈÝ0ïXÚZÝX[\ÚY\\[[YÙ[ÙHYYTQ\Ü\Ú[ÛP[[\ÙH
\Ù]ËXÚY]Y
HPZÝ]]0éËUXÚÙ\
ÛÛ[Z]Y[ËKU\ÊHX[QÝËS[Û]Ü[ÈXÚÙZÝÜ	YÚ[Û^Ü\XYH^Ù[È°ïØ\È	ÈKX\
OOHÙ^O^Ú_HÝ[O^ÞØÛÛÜØJMKMKMK
H_OÚ_OÛO_BÝ[]Ý[O^ÞÙÛ[Z[N\K[[ÛÊHÛÚ^NLÛÛÜ\KYÛÛH_OÑPUUUQ[ÜXÈÛ]YH0­ÈZ[Ø^HÜÝÜTÔS0­È\Z[È[[ÙÚXÈÈRBÙ]Ù]]]Û\ÜÓ[YOHØ\Ý[O^ÞÛX\Ú[ÝÛNM_O]Û\ÜÓ[YOHØ\[X[[\]YHÙ[[ÈÚ[ÏÙ]ÖÂÚXÛÛ¸¥á]NRKY\Ý\ØÎ0éÛXÚHÙXR[[YÙ[ÙHÚHX[Y[[\ÙX\ÚP]YØ[KÚXÛÛ¸¥âH]N]]HX\Ù]È]]H\ØÎXÚ\Z[YÚ8 $ÈXÚHÔPÛÛ\]]]KR[[YÙ[ÙHKÚXÛÛ¸¢¦H]NÜÜÜËTÛÝ\ÙHXÛÛÚ[X][Û\ØÎ\Z[
È[[ÙÚXÈ
ÈRH[Z[\ÝZÝ\Y\[KÚXÛÛ¸¥ã]NÝÚ\ÜÈÈ]\ÜX[ØÝ\È\ØÎPÒSË[YÙ\YÛ[Y[ZÛÛÜY\È\Ü[ÈKKX\
OO]Ù^O^ÝK]_HÝ[O^ÞÙ\Ü^N^Ø\LY[ÎLÜ\ÝÛN\ÛÛY\KXÜ\H_OÜ[Ý[O^ÞÙÛÚ^NNÛÛÜ\KYÛÛ
H^Ú[ÎX\Ú[Ü_OÝKXÛÛOÜÜ[]]Ý[O^ÞÙÛÚ^NLËÛÙZYÚLÛÛÜ\KZ[ÊH_OÝK]_OÙ]]Ý[O^ÞÙÛÚ^NLÛÛÜ\KZ[ÌÊH_OÝK\ØßOÙ]Ù]Ù]
J_BÙ]]Û\ÜÓ[YOHØ\YÛÛ]Û\ÜÓ[YOHØ\[X[Ý[O^ÞØÛÛÜ\KYÛÛ
H_O[Ø]Ù]]Û\ÜÓ[YOHØ\XÙH\Ù]]Ù\ÝÜZ[[ÝZ\ÚÝÛÏ][]Ù\ÙYZÝÜÝÛÏY\]YHÝ[B\\ÜÙ\YHÝZÝ\Y\HXÚL[Û][\ÝZ[ÝZÝ\Y\\\Z[YÝ\][Ø]Ü[[[ÙZ[Z[[Ý[H\^Y\[Ø[Ù]Ù]Ù]Ù]Ù]Ù]
NÂBËÈ8¥ 8¥ QHÖ8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ [Ý[ÛYPÞ

HÂ]\
]Û\ÜÓ[YOHYKZ[ËÊÙ^H\ÜÝ[\[ÛÈ
ßB]Û\ÜÓ[YOHÙXÝ[Û]Û\ÜÓ[YOHÙXÝ[ÛZXY\]Û\ÜÓ[YOHÙXÝ[Û]]HÜ]\ØÚH[ZY[Ù]Ü[Û\ÜÓ[YOHÙXÝ[Û]YÈYË\Y\ÚÚY\Ý\ÜÝ[\[ÛÈ\ÝÜÜ[Ù]]Û\ÜÓ[YOHÌ]]Ý[O^ÞÙÛ[Z[N\K[[ÛÊHÛÚ^NK]\ÜXÚ[ÎL[H^[ÙÜN\\Ø\ÙHÛÛÜ\KZ[Í
HX\Ú[ÝÛNL_OÜ[Ý[O^ÞØÛÛÜ\K\Y
H_O¸¥ãÈÜ]\ØÚÜÜ[ÈOÜ[Ý[O^ÞØÛÛÜ\KYÛÛ
H_O¸¥ãÈÚXÚYÏÜÜ[ÈOÜ[Ý[O^ÞØÛÛÜÌØYM_O¸¥ãÈXÙK]ËZ]OÜÜ[Ù]ÖÂÝ\NÜ]XØ[X[ÕP[ZYH^ÔÈZ[ÒKL
ËÓ[Û]°ïÝZÝ\Y\H[[YÙ[ÙH\Ý¸¡¤\ÝÈÛLÔÈÚYÛ[\ÚY\[Z[ÜØ\Z]ØÚYXÚ[[ÈKÝ\NÜ]XØ[X[ØÚY\U[YY\[È^\ÙX\ÚUX[\È\Ù[[ÚÕÛØÚH°ïX[Y[HXÚ\ÚH\Ý¸¡¤\Ý	H\YYÝ[ÔÈ\Ý0éYÙ[ÚÕÛØÚHKÝ\N[\Ü[X[][]X[]0é^RKYÙ[\Y\H[[YÙ[ÙH\Ý°é\ÙHÙ[YÈ°ïÙ\ÜÚ[Û[H[ØÚZY[Ù[\Ý¸¡¤\ÝÈXÚÌUYÙKT[ÝKÝ\N[\Ü[X[TÙYÛY[^ÈZ[°ïÔP[ÚX\Ú[ËT\ÜÈ\Ý¸¡¤\ÝÛ
HÈÛÛ[Z]Y\[H[ÝKÝ\NXÙHX[XÙ[Y[YÙ[]^XÙ[Y[YÙ[È][[TÚYÛ[°ï[Z\Ú[ËT]Ú\È\Ý¸¡¤\ÝHÛÈH]ÛÛZÝ]XÚ
YÙ[KKX\
OO]Ù^O^ØKX[HÛ\ÜÓ[YO^Ø\	ØK\_XO]Û\ÜÓ[YOH\[X[ØKX[OÙ]]Û\ÜÓ[YOH\]^ØK^OÙ]]Û\ÜÓ[YOH\]\ÝØK\ÝOÙ]Ù]
J_BÙ]ËÊUXH
ßB]]Û\ÜÓ[YOHØ\]Û\ÜÓ[YOHØ\[X[Z[[][HXXH\ÝÈ
U
OÙ]]Û\ÜÓ[YOH]\ÝÈXY\]\ÝÙ]]]YØ[Ù]]Z]][OÙ]]\ÛÜËRÜ]\][OÙ]Ù]ÖÂÝ\ÝÝ[\SYØ[\ÈØ[È
LLÔÊHY[YNÕÈM8 $ÌMHÜ]¸¢iLÈÔÎÕKÝ\Ý[[ÈYÙH
ÈØZ]\ÝY[YNÕÈLÈÜ]¸¢iLÌÚYÛ]\ÈKÝ\ÝZY[ÝHÔÌYÙHÜ]\ÈY[YNÕÈM¸ $ÌNHÜ]È8¢iMKÝ\Ý[[ËQXÚÈ[
HÈY[YNÕÈMx $ÌMÜ]¸¢iLÛÝË]\ÈKÝ\Ý[ÙY[Ý]XXÚÔXYÈYÚ[YNÕÈLø $ÌMÜ]¸¢iMH[ÛÜ[KÝ\ÝZ\Ý\Ý[Û[HÝ\^H
ML
HY[YNÕÈMÜ]YYX[Õ8¢iPÒKKX\
OO]Ù^O^ÛK\ÝHÛ\ÜÓ[YOH]\ÝÈ]Û\ÜÓ[YOH]XÙ[XZ[ÛK\ÝOÙ]]Û\ÜÓ[YOH]XÙ[Ü[Û\ÜÓ[YOH[[YÛÛÛKYOÜÜ[Ù]]Û\ÜÓ[YOH]XÙ[[ÛË\ÛHÛK[Y_OÙ]]Û\ÜÓ[YOH]XÙ[Ý[O^ÞÙÛÚ^NLKÛÛÜ\KZ[ÌÊH_OÛKÜ]OÙ]Ù]
J_BÙ]]Û\ÜÓ[YOHØ\XYHÝ[O^ÞÛX\Ú[ÜM_O]Û\ÜÓ[YOHØ\[X[Ý[O^ÞØÛÛÜ\KXYJH_OÚ[Ü]\XOÙ]]Û\ÜÓ[YOHØ\XÙHÝ[O^ÞØÛÛÜ\KXYJH_OÚZÝÚ\Ù\ÝÜÙ[	ÌÈÛLÔÈÚYÛ[\ÚY\[Z[ÜØ\Z]ØÚYZHÒ
ËÓ[Û][OÙ\Ù[OÙZ[Z[YÙ\[ÝXÚ
YÙ[
[]Ý]YÚ]KSX[°ïZ[[H]ÜJKÙ]Ù]Ù]Ù]Ù]ËÊÝ\ÝÛY\\ØÛÝ\H
ßB]Û\ÜÓ[YOHÙXÝ[Û]Û\ÜÓ[YOHÙXÝ[ÛZXY\]Û\ÜÓ[YOHÙXÝ[Û]]HÝ\ÝÛY\\ØÛÝ\HØÜ\Ù]Ü[Û\ÜÓ[YOHÙXÝ[Û]YÈYËXYH[\Y]ÈÝZYOÜÜ[Ù]]Û\ÜÓ[YOHÌÖÂÂ\ÙNZ[ÝYYÈ

HZ[H\ÎÈÚYHY[Z]\[ÝZX[HÈÛØÚHZ]ÛÛ\]]]H[[YÙ[ÙHH[\[[KQÔÏÈØ\È\ÝZHZÝY[HÛË]ËT]Y[H°ïÔP[ÚX\Ú[ÏÈKKÂ\ÙNØ[KUYYH
MHZ[H\ÎÈZYÈZ\ÚYHH]]HZ[[]Y[Ù]]Ù\\QÔXÚ\ÚY\Ý8 $ÈØ[ÈYHÝYÚHØÙ\ÜËØ\ÈZ\ZH\Z[È[[ÙÚXÈ[HYZ\Ý[ÈKKÂ\ÙNÛÛ][ÛQ]
LZ[H\ÎÈÙ[\ÈZ[ÛÛðéH\ÈY\ÙH][]]ÛX]\ØÚYÙÜYÚY\8 $ÈÚYHY[ðéH\\ÈÙ\ÈÙ\[Z[\ÜØ[\Ø][ÛðïH\È0éÛXÚ][ÈKKÂ\ÙNÛÛ[Z]Y[U\Ý

HZ[H\ÎÈ\XÚ\[ÛØÚ[Z[ÛÛÜ]\È[[ÈZYÙ[ÈÙ\]\ÜÙ\\pïÜÝHYHØ]Y[ØÚZY[ÈY[ÈKKKX\
O]Ù^O^Ü\Ù_HÛ\ÜÓ[YOHØ\\ÛH]Û\ÜÓ[YOHØ\[X[Ü\Ù_OÙ][Û\ÜÓ[YOHÛX[Ü\ËX\
OOHÙ^O^Ü_OÜ_OÛO_BÝ[Ù]
J_BÙ]Ù]Ù]
NÂBËÈ8¥ 8¥ ÓÓÖ8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ [Ý[ÛÛÛÞ

HÂ]\
]Û\ÜÓ[YOHYKZ[ËÊXÚ[È
ßB]Û\ÜÓ[YOHÙXÝ[Û]Û\ÜÓ[YOHÙXÝ[ÛZXY\]Û\ÜÓ[YOHÙXÝ[Û]]HZ\Û[Ù[Ù]Ü[Û\ÜÓ[YOHÙXÝ[Û]YÈYËYÛÛ][YH\Ú]XÝ\OÜÜ[Ù]]Û\ÜÓ[YOHXÚ[ËYÜYÖÂÂY\Ý\\YÙNÈY\ÛÜX]\Y[ÙKXÙNL\Ó[Û]
ÒH\ØÎ°ïP[ØØ]ÜÈ[Y\ÛÜUX[\ÈZ]YÜ[[H[KU[]\ÙKX]\\ÎÂ[[YÙ[ÙHYY
HÔÈXÚØZ
HðíÚ[XÚ\YY[ËT\Ü[Z\Ú[È	ÛÜÚ[È[\ÈÔÙ[Q][
\Z[S][
HH\Ù\KSXZ[Ý\ÜK[Ý][HKÂ            tier:"Professional", badge:"â Empfohlen", featured:true,
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
                "CRM-Integration (Salesforce / HubSpot)",
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
                "Dashboard intern genutzt bei Reichmuth",
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
              {ch:"Founder-Led Outreach",conv:"15%",desc:"Peter nutzt Reichmuth-Netzwerk und persÃ¶nliche GP-Kontakte fÃ¼r direkte Demos"},
              {ch:"LinkedIn Content",conv:"5%",desc:"WÃ¶chentliche Posts zu Infra-GP-Benchmarks und IRR-Trends â Thought Leadership"},
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
            {phase:"PMF (180d)",metrics:[{k:"Paying Customers",v:"â¥8"},{k:"Churn",v:"v10%"},{k:"MRR",v:"CHF 12k"},{k:"NPS",v:"â¥50"}]},
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
          <div className="eyebrow">Kickbox Innovation Canvas Â· Reichmuth &amp; Co</div>
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
