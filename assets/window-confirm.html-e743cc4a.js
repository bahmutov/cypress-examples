import{_ as p,M as o,p as c,q as e,Q as a,R as s,t as n,N as u,a1 as i}from"./framework-e03faf0e.js";const l={},k=s("h1",{id:"window-confirm-popup",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#window-confirm-popup","aria-hidden":"true"},"#"),n(" Window confirm popup")],-1),r=i(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ask<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Ask user<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>output</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>output<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  document
    <span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;ask&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> output <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;output&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> ok <span class="token operator">=</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token string">&#39;Should I proceed?&#39;</span><span class="token punctuation">)</span>
      output<span class="token punctuation">.</span>innerText <span class="token operator">=</span> ok <span class="token operator">?</span> <span class="token string">&#39;Yes&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;No&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Note:</strong> this test only passes when doing full browser reload. On normal file watching or re-run it pops the browser Confirm dialog instead of auto-accepting it. Seems like a bug to me.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Cypress auto-accepts the confirmation</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;Ask user&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;output&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Yes&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  cy<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;window:confirm&#39;</span><span class="token punctuation">,</span> cy<span class="token punctuation">.</span><span class="token function">stub</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;Ask user&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;output&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;No&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Luckily, there is an easy workaround by using <code>cy.stub</code> command to control the <code>window.confirm</code> method instead.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">win</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
  cy<span class="token punctuation">.</span><span class="token function">stub</span><span class="token punctuation">(</span>win<span class="token punctuation">,</span> <span class="token string">&#39;confirm&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;confirm&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;Ask user&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;output&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Yes&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;@confirm&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.been.calledOnce&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;restore&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">win</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
  cy<span class="token punctuation">.</span><span class="token function">stub</span><span class="token punctuation">(</span>win<span class="token punctuation">,</span> <span class="token string">&#39;confirm&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;confirm&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;Ask user&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;output&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;No&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),d={href:"https://youtu.be/4nxrivWXYnM",target:"_blank",rel:"noopener noreferrer"};function v(m,g){const t=o("ExternalLinkIcon");return c(),e("div",null,[k,a(" fiddle Window confirm popup "),r,s("p",null,[n("Watch the video "),s("a",d,[n("Stub The Window Confirm Popups"),u(t)]),n(".")]),a(" fiddle-end ")])}const b=p(l,[["render",v],["__file","window-confirm.html.vue"]]);export{b as default};
