import{_ as o,M as c,p,q as l,R as s,t as n,N as e,Q as t,a1 as r}from"./framework-e03faf0e.js";const i="/cypress-examples/assets/command-start-79cdf31e.png",u={},d=s("h1",{id:"cy-events",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#cy-events","aria-hidden":"true"},"#"),n(" Cy events")],-1),m={href:"https://on.cypress.io/catalog-of-events",target:"_blank",rel:"noopener noreferrer"},k=r(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;command:start&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">cmd</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;started command&#39;</span><span class="token punctuation">,</span> cmd<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+i+'" alt="Cypress command start event"></p>',2),v=s("strong",null,"Tip:",-1),h={href:"https://github.com/bahmutov/cypress-failed-log",target:"_blank",rel:"noopener noreferrer"};function _(f,g){const a=c("ExternalLinkIcon");return p(),l("div",null,[d,s("p",null,[n("Cypress test runner fires events you can subscribe to. For example, we can listen to the command start and finish events. See the full "),s("a",m,[n("Cypress Catalog of Events"),e(a)]),n(" for more.")]),t(" fiddle Command start "),k,t(" fiddle-end "),s("p",null,[v,n(" I used these events to log all commands and their arguments in my "),s("a",h,[n("cypress-failed-log"),e(a)]),n(" plugin.")])])}const b=o(u,[["render",_],["__file","cy-events.html.vue"]]);export{b as default};